import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
const io = new Server();
const server = createServer(app);
io.listen(server);

const players: Record<string, { pos: { x: number; y: number }; rot: number }> = {};

io.on("connection", (socket) => {
	console.log(socket.id);
	players[socket.id] = { pos: { x: 0, y: 0 }, rot: 0 };

	socket.emit("players", players);

	socket.on("move", (data) => {
		players[socket.id] = data;
	});
	socket.on("disconnect", () => {
		delete players[socket.id];
	});
	socket.on("shoot", (data) => {
		io.emit("shoot", data);
	});
});

setInterval(() => {
	io.emit("players", players);
}, 10);

server.listen(3000, () => console.log("started in 3000"));
