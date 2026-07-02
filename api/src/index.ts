import "dotenv/config";
import express from "express";
import { prisma } from "./db.js";
const CORS = require("cors");
const app = express();
app.use(CORS({ origin: "*" }));
app.use(express.json());

const PORT = process.env.PORT ?? 3000;

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

app.post("/games", async (req, res, next) => {
    try {
        const { roomCode, celebrity } = req.body;

        if (typeof roomCode !== "string" || roomCode.trim() === "") {
            return res.status(400).json({ error: "Missing roomCode" });
        }
        if (typeof celebrity !== "string" || celebrity.trim() === "") {
            return res.status(400).json({ error: "Missing celebrity" });
        }

        const game = await prisma.game.create({
            data: {
                roomCode: roomCode.trim().toUpperCase(),
                answers: {
                    create: [{ text: celebrity.trim(), username: null }],
                },
            },
            include: { answers: true },
        });

        return res.status(201).json({
            roomCode: game.roomCode,
            mostRecent: game.answers[0].text,
        });
    } catch (err) {
        if (err && typeof err === "object" && "code" in err && err.code === "P2002") {
            return res.status(409).json({ error: "Room code already in use" });
        }
        next(err);
    }
});

app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
});
