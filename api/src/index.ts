import "dotenv/config";
import express, { type NextFunction, type Request, type Response } from "express";
import CORS from "cors";
import { prisma } from "./db.js";

const app = express();
app.use(CORS({ origin: "*" }));
app.use(express.json());

const PORT = process.env.PORT ?? 3000;

type HttpError = Error & { status: number };
type RequestBody = Record<string, unknown>;

const createHttpError = (status: number, message: string): HttpError => {
    const error = new Error(message) as HttpError;
    error.status = status;
    return error;
};

const validateGameInput = (body: unknown, requiredFields: Array<"roomCode" | "username" | "answer" | "celebrity">) => {
    if (!body || typeof body !== "object" || Array.isArray(body)) {
        throw createHttpError(400, "Invalid request body");
    }

    const payload = body as RequestBody;
    const validated: Record<string, string> = {};

    for (const field of requiredFields) {
        const value = payload[field];

        if (typeof value !== "string") {
            throw createHttpError(400, `Missing ${field}`);
        }

        const trimmed = value.trim();
        if (!trimmed) {
            throw createHttpError(400, `Missing ${field}`);
        }

        validated[field] = field === "roomCode" ? trimmed.toUpperCase() : trimmed;
    }

    return validated;
};

const parseNameParts = (fullName: string) => {
    const normalized = fullName.trim().replace(/\s+/g, " ");
    const parts = normalized.split(" ").filter(Boolean);

    if (parts.length < 2) {
        return null;
    }

    return {
        firstName: parts[0],
        lastName: parts[parts.length - 1],
        normalized,
    };
};

// Health check — confirms the server is running.
app.get("/health", (_req, res) => {
    res.json({ ok: true });
});

// list all games with their most recent celebrity name
// Note: does not return player count or presence
// tan polling TODO
app.get("/games", async (_req, res, next) => {
    try {
        const games = await prisma.game.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                answers: {
                    orderBy: { createdAt: "desc" },
                    take: 1,
                },
            },
        });

        const payload = games.map((game) => ({
            roomCode: game.roomCode,
            mostRecent: game.answers[0]?.text ?? null,
        }));

        return res.status(200).json(payload);
    } catch (err) {
        next(err);
    }
});

// get the most recent name for one game
app.get("/games/:roomCode", async (req, res, next) => {
    try {
        const roomCode = req.params.roomCode?.trim().toUpperCase();

        if (!roomCode) {
            throw createHttpError(400, "Missing roomCode");
        }

        const game = await prisma.game.findUnique({
            where: { roomCode },
            include: {
                answers: {
                    orderBy: { createdAt: "desc" },
                    take: 1,
                },
            },
        });

        if (!game) {
            throw createHttpError(404, "Game not found");
        }

        return res.status(200).json({
            roomCode: game.roomCode,
            mostRecent: game.answers[0]?.text ?? null,
        });
    } catch (err) {
        next(err);
    }
});

// start a new game
app.post("/games", async (req, res, next) => {
    try {
        const { roomCode, celebrity } = validateGameInput(req.body, ["roomCode", "celebrity"]);

        const game = await prisma.game.create({
            data: {
                roomCode,
                answers: {
                    create: [{ text: celebrity, username: null }],
                },
            },
            include: { answers: true },
        });

        return res.status(201).json({
            roomCode: game.roomCode,
            mostRecent: game.answers[0]?.text ?? null,
        });
    } catch (err) {
        next(err);
    }
});

app.post("/answers", async (req, res, next) => {
    try {
        const { roomCode, username, answer } = validateGameInput(req.body, ["roomCode", "username", "answer"]);
        const parsedAnswer = parseNameParts(answer);

        if (!parsedAnswer) {
            throw createHttpError(400, "Answer must include a first and last name");
        }

        const game = await prisma.game.findUnique({
            where: { roomCode },
            include: {
                answers: {
                    orderBy: { createdAt: "desc" },
                    take: 1,
                },
            },
        });

        if (!game) {
            throw createHttpError(404, "Game not found");
        }

        const previousAnswer = game.answers[0];

        if (!previousAnswer) {
            throw createHttpError(400, "Game has no previous answer");
        }

        if (previousAnswer.username && previousAnswer.username === username) {
            throw createHttpError(409, "You answered most recently; wait for someone else");
        }

        const previousParts = parseNameParts(previousAnswer.text);

        if (!previousParts) {
            throw createHttpError(400, "Previous answer is invalid");
        }

        const expectedInitial = previousParts.lastName[0]?.toLowerCase();
        const submittedInitial = parsedAnswer.firstName[0]?.toLowerCase();

        if (submittedInitial !== expectedInitial) {
            throw createHttpError(400, `Name must start with ${expectedInitial?.toUpperCase()}`);
        }

        const createdAnswer = await prisma.answer.create({
            data: {
                text: parsedAnswer.normalized,
                username,
                gameId: game.id,
            },
        });

        return res.status(201).json({
            accepted: true,
            mostRecent: createdAnswer.text,
        });
    } catch (err) {
        next(err);
    }
});

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (err && typeof err === "object" && "code" in err && (err as { code?: unknown }).code === "P2002") {
        return res.status(409).json({ error: "Room code already in use" });
    }

    if (err instanceof Error && "status" in err && typeof (err as HttpError).status === "number") {
        return res.status((err as HttpError).status).json({ error: err.message });
    }

    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
});
