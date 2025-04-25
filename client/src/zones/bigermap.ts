import { Engine, Scene, vec } from "excalibur";
import { Box } from "../objects/box";
import { Platform } from "../objects/platform";

export class BigerMapZone extends Scene {
	onInitialize(engine: Engine): void {
		// Main arena boundaries - expanded to 2000x2000
		const boundaries = [
			// Outer walls
			new Box(vec(0, -1000), vec(2000, 50)), // Top
			new Box(vec(0, 1000), vec(2000, 50)), // Bottom
			new Box(vec(-1000, 0), vec(50, 2000)), // Left
			new Box(vec(1000, 0), vec(50, 2000)), // Right
		];

		// Inner obstacles - using Box
		const obstacles = [
			// Center cross
			new Box(vec(0, 0), vec(300, 50)), // Horizontal
			new Box(vec(0, 0), vec(50, 300)), // Vertical

			// Corner structures
			new Box(vec(-600, -600), vec(150, 150)),
			new Box(vec(600, -600), vec(150, 150)),
			new Box(vec(-600, 600), vec(150, 150)),
			new Box(vec(600, 600), vec(150, 150)),

			// Side corridors
			new Box(vec(-500, 0), vec(100, 500)),
			new Box(vec(500, 0), vec(100, 500)),
			new Box(vec(0, -500), vec(500, 100)),
			new Box(vec(0, 500), vec(500, 100)),

			// Additional maze-like obstacles
			new Box(vec(-300, -300), vec(200, 50)),
			new Box(vec(300, -300), vec(200, 50)),
			new Box(vec(-300, 300), vec(200, 50)),
			new Box(vec(300, 300), vec(200, 50)),

			// Barrier structures
			new Box(vec(-750, -250), vec(50, 400)),
			new Box(vec(750, 250), vec(50, 400)),
			new Box(vec(-250, -750), vec(400, 50)),
			new Box(vec(250, 750), vec(400, 50)),
		];

		// Using Platform for some variety
		const platforms = [
			// Corner platforms with different object type
			new Platform(vec(-700, 700), vec(150, 150)),
			new Platform(vec(700, -700), vec(150, 150)),

			// Scattered platforms
			new Platform(vec(0, 400), vec(200, 30)),
			new Platform(vec(0, -400), vec(200, 30)),
			new Platform(vec(400, 200), vec(30, 200)),
			new Platform(vec(-400, -200), vec(30, 200)),

			// Additional platforms for gameplay variety
			new Platform(vec(-300, 300), vec(100, 20)),
			new Platform(vec(300, -300), vec(100, 20)),
			new Platform(vec(-700, -300), vec(150, 25)),
			new Platform(vec(700, 300), vec(150, 25)),

			// Center area platforms
			new Platform(vec(-150, 150), vec(100, 20)),
			new Platform(vec(150, -150), vec(100, 20)),
			new Platform(vec(-150, -150), vec(100, 20)),
			new Platform(vec(150, 150), vec(100, 20)),

			// Outer ring platforms
			new Platform(vec(0, 800), vec(300, 30)),
			new Platform(vec(0, -800), vec(300, 30)),
			new Platform(vec(800, 0), vec(30, 300)),
			new Platform(vec(-800, 0), vec(30, 300)),

			// Diagonal platforms
			new Platform(vec(-500, -500), vec(100, 20)),
			new Platform(vec(500, 500), vec(100, 20)),
			new Platform(vec(-600, 200), vec(150, 25)),
			new Platform(vec(600, -200), vec(150, 25)),
		];

		// Add all objects to the scene
		for (let box of [...boundaries, ...obstacles]) {
			engine.add(box);
		}

		for (let platform of platforms) {
			engine.add(platform);
		}
	}
}
