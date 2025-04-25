import { Engine, Scene, vec, Color } from "excalibur";
import { Box } from "../objects/box";
import { Platform } from "../objects/platform";

export class BigMapZone extends Scene {
	onInitialize(engine: Engine): void {
		// Main arena boundaries
		const boundaries = [
			// Outer walls
			new Box(vec(0, -500), vec(1000, 50)), // Top
			new Box(vec(0, 500), vec(1000, 50)), // Bottom
			new Box(vec(-500, 0), vec(50, 1000)), // Left
			new Box(vec(500, 0), vec(50, 1000)), // Right
		];

		// Inner obstacles - using Box
		const obstacles = [
			// Center cross
			new Box(vec(0, 0), vec(200, 50)), // Horizontal
			new Box(vec(0, 0), vec(50, 200)), // Vertical

			// Corner structures
			new Box(vec(-300, -300), vec(100, 100)),
			new Box(vec(300, -300), vec(100, 100)),

			// Side corridors
			new Box(vec(-250, 0), vec(100, 300)),
			new Box(vec(250, 0), vec(100, 300)),
		];

		// Using Platform for some variety
		const platforms = [
			// Corner platforms with different object type
			new Platform(vec(-300, 300), vec(100, 100)),
			new Platform(vec(300, 300), vec(100, 100)),

			// Scattered platforms
			new Platform(vec(0, 200), vec(150, 30)),
			new Platform(vec(0, -200), vec(150, 30)),
			new Platform(vec(150, 100), vec(30, 150)),
			new Platform(vec(-150, -100), vec(30, 150)),

			// Additional platforms for gameplay variety
			new Platform(vec(-150, 150), vec(75, 20)),
			new Platform(vec(150, -150), vec(75, 20)),
			new Platform(vec(-350, -150), vec(100, 25)),
			new Platform(vec(350, 150), vec(100, 25)),
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
