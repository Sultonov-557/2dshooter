import { Color, DisplayMode, Engine, SolverStrategy, vec } from "excalibur";
import { Player } from "./entities/player";
import io from "socket.io-client";
import { Bullet } from "./entities/bullet";
import { OneVOneZone } from "./zones/1v1";
import { BigMapZone } from "./zones/bigmap";

const game = new Engine({
	width: 480,
	height: 270,
	backgroundColor: Color.fromHex("#131313"),
	pixelArt: true,
	pixelRatio: 2,
	displayMode: DisplayMode.FitScreen,
	fixedUpdateFps: 30,
	physics: { enabled: true, solver: SolverStrategy.Arcade },
});

const socket = io(`${new URL(document.URL).hostname}:3000`, { transports: ["websocket"] });

const players: Record<string, Player> = {};
let player: Player;
socket.on("connect", () => {
	if (!socket.id) return;
	player = new Player(socket.id, true, socket);
	game.add(player);
	players[socket.id] = player;
	game.currentScene.camera.strategy.elasticToActor(player, 0.5, 0.5);
});

socket.on("shoot", (data) => {
	console.log(data);

	const bullet = new Bullet(vec(data.pos.x, data.pos.y), vec(data.dir.x, data.dir.y));

	game.add(bullet);
});

socket.on("players", (list) => {
	for (let id in list) {
		if (!players[id]) {
			console.log(id);
			players[id] = new Player(id, false);
			game.add(players[id]);
		}
		if (id != socket.id) {
			players[id].pos.setTo(list[id].pos.x, list[id].pos.y);
			players[id].rotation = list[id].rot;
		}
	}
	for (let id in players) {
		if (!list[id]) {
			game.remove(players[id]);
			delete players[id];
		}
	}
});

game.add("1v1_zone", new OneVOneZone());
game.add("bigmap_zone", new BigMapZone());

game.goToScene("bigmap_zone");
game.start();
