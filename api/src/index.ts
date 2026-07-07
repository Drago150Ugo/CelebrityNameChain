import "dotenv/config";
import express from "express";
import CORS from "cors";
import { prisma } from "./db.js";

const app = express();
app.use(CORS({ origin: "*" }));
app.use(express.json());

const PORT = process.env.PORT ?? 4000;

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

// TODO: implement the game routes (see the project spec):
//   POST /games          { roomCode, celebrity }          -> start a game COMPLETED
//   GET  /games/:roomCode                                 -> most recent celebrity name
//   POST /answers        { roomCode, username, answer }   -> submit an answer
//
// To talk to the database, run `yarn prisma:migrate` first (generates the
// client into src/generated/prisma), then wire it up with the pg adapter.
// See this API's README ("Using Prisma in code") for the exact db.ts snippet.

// list all games with their most recent celebrity name
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
            return res.status(400).json({ error: "Missing roomCode" });
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
            return res.status(404).json({ error: "Game not found" });
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
        const roomCode = req.body.roomCode?.trim().toUpperCase();
        const celebrity = req.body.celebrity?.trim();

        if (!roomCode) {
            return res.status(400).json({ error: "Missing roomCode" });
        }
        if (!celebrity) {
            return res.status(400).json({ error: "Missing celebrity" });
        }

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
        if (err && typeof err === "object" && "code" in err && err.code === "P2002") {
            return res.status(409).json({ error: "Room code already in use" });
        }
        next(err);
    }
});

app.post("/answers", async (req, res, next) => {
    try {
        const { roomCode, username, answer } = req.body;

        if (typeof roomCode !== "string" || roomCode.trim() === "") {
            return res.status(400).json({ error: "Missing roomCode" });
        }
        if (typeof username !== "string" || username.trim() === "") {
            return res.status(400).json({ error: "Missing username" });
        }
        if (typeof answer !== "string" || answer.trim() === "") {
            return res.status(400).json({ error: "Missing answer" });
        }

        const normalizedRoomCode = roomCode.trim().toUpperCase();
        const normalizedUsername = username.trim();
        const parsedAnswer = parseNameParts(answer);

        if (!parsedAnswer) {
            return res.status(400).json({ error: "Answer must include a first and last name" });
        }

        const game = await prisma.game.findUnique({
            where: { roomCode: normalizedRoomCode },
            include: {
                answers: {
                    orderBy: { createdAt: "desc" },
                    take: 1,
                },
            },
        });

        if (!game) {
            return res.status(404).json({ error: "Game not found" });
        }

        const previousAnswer = game.answers[0];

        if (!previousAnswer) {
            return res.status(400).json({ error: "Game has no previous answer" });
        }

        if (previousAnswer.username && previousAnswer.username === normalizedUsername) {
            return res.status(409).json({ error: "You answered most recently; wait for someone else" });
        }

        const previousParts = parseNameParts(previousAnswer.text);

        if (!previousParts) {
            return res.status(400).json({ error: "Previous answer is invalid" });
        }

        const expectedInitial = previousParts.lastName[0]?.toLowerCase();
        const submittedInitial = parsedAnswer.firstName[0]?.toLowerCase();

        if (submittedInitial !== expectedInitial) {
            return res.status(400).json({ error: `Name must start with ${expectedInitial?.toUpperCase()}` });
        }

        const createdAnswer = await prisma.answer.create({
            data: {
                text: parsedAnswer.normalized,
                username: normalizedUsername,
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


app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
});
