import { WebSocketServer } from "ws";
import { prismaClient } from "@repo/prisma/client";

const server = new WebSocketServer({ port: 8080 });

server.on("connection", function connection(socket) {
    socket.send("Hi there your are connected to the server");

    prismaClient.user.create({
        data: {
            email: "ws-server-test@test.com",
            password: "ws-server-test",
        },
    });

    socket.on("error", console.error);

    socket.on("message", function message(data) {
        console.log("received: %s", data);
    });
});
