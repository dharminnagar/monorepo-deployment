import express from "express";
import { prismaClient } from "@repo/prisma/client";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "Email and password are required" });
        return;
    }

    try {
        const user = await prismaClient.user.create({
            data: { email, password },
        });

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to create user" });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "Email and password are required" });
        return;
    }

    try {
        const user = await prismaClient.user.findUnique({
            where: { email },
        });

        if (!user) {
            res.status(400).json({ error: "User not found" });
            return;
        }

        if (user.password !== password) {
            res.status(400).json({ error: "Invalid password" });
            return;
        }

        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        res.status(500).json({ error: "Failed to login" });
    }
});

app.listen(3002, () => {
    console.log("Server is running on port 3000");
});
