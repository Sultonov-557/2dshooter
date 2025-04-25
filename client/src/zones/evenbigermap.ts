import { Engine, Scene, vec, Color, Font, TextAlign } from "excalibur";
import { Box } from "../objects/box";
import { Platform } from "../objects/platform";
import { Circle } from "../objects/circle";
import { Decoration } from "../objects/decoration";

export class EvenBigerMapZone extends Scene {
	onInitialize(engine: Engine): void {
		// Main arena boundaries - expanded to 3000x3000
		const boundaries = [
			// Outer walls
			new Box(vec(0, -1500), vec(3000, 50)), // Top
			new Box(vec(0, 1500), vec(3000, 50)), // Bottom
			new Box(vec(-1500, 0), vec(50, 3000)), // Left
			new Box(vec(1500, 0), vec(50, 3000)), // Right
		];

		// Inner obstacles - using Box
		const obstacles = [
			// Center cross
			new Box(vec(0, 0), vec(400, 50)), // Horizontal
			new Box(vec(0, 0), vec(50, 400)), // Vertical

			// Corner structures
			new Box(vec(-900, -900), vec(200, 200)),
			new Box(vec(900, -900), vec(200, 200)),
			new Box(vec(-900, 900), vec(200, 200)),
			new Box(vec(900, 900), vec(200, 200)),

			// Side corridors
			new Box(vec(-750, 0), vec(100, 800)),
			new Box(vec(750, 0), vec(100, 800)),
			new Box(vec(0, -750), vec(800, 100)),
			new Box(vec(0, 750), vec(800, 100)),

			// Additional maze-like obstacles
			new Box(vec(-500, -500), vec(300, 50)),
			new Box(vec(500, -500), vec(300, 50)),
			new Box(vec(-500, 500), vec(300, 50)),
			new Box(vec(500, 500), vec(300, 50)),

			// Barrier structures
			new Box(vec(-1100, -400), vec(50, 600)),
			new Box(vec(1100, 400), vec(50, 600)),
			new Box(vec(-400, -1100), vec(600, 50)),
			new Box(vec(400, 1100), vec(600, 50)),

			// Middle ring
			new Box(vec(-300, 300), vec(50, 400)),
			new Box(vec(300, -300), vec(50, 400)),
			new Box(vec(-300, -300), vec(400, 50)),
			new Box(vec(300, 300), vec(400, 50)),
		];

		// Using Platform for some variety
		const platforms = [
			// Corner platforms with different object type
			new Platform(vec(-1100, 1100), vec(200, 200)),
			new Platform(vec(1100, -1100), vec(200, 200)),

			// Scattered platforms
			new Platform(vec(0, 600), vec(250, 40)),
			new Platform(vec(0, -600), vec(250, 40)),
			new Platform(vec(600, 300), vec(40, 250)),
			new Platform(vec(-600, -300), vec(40, 250)),

			// Additional platforms for gameplay variety
			new Platform(vec(-500, 500), vec(150, 30)),
			new Platform(vec(500, -500), vec(150, 30)),
			new Platform(vec(-1000, -500), vec(200, 35)),
			new Platform(vec(1000, 500), vec(200, 35)),

			// Center area platforms
			new Platform(vec(-200, 200), vec(120, 25)),
			new Platform(vec(200, -200), vec(120, 25)),
			new Platform(vec(-200, -200), vec(120, 25)),
			new Platform(vec(200, 200), vec(120, 25)),

			// Outer ring platforms
			new Platform(vec(0, 1200), vec(400, 40)),
			new Platform(vec(0, -1200), vec(400, 40)),
			new Platform(vec(1200, 0), vec(40, 400)),
			new Platform(vec(-1200, 0), vec(40, 400)),

			// Diagonal platforms
			new Platform(vec(-700, -700), vec(150, 30)),
			new Platform(vec(700, 700), vec(150, 30)),
			new Platform(vec(-800, 300), vec(200, 35)),
			new Platform(vec(800, -300), vec(200, 35)),
		];

		// Circular obstacles and decorations
		const circles = [
			// Obstacle circles (with collision)
			new Circle(vec(-400, 400), 75),
			new Circle(vec(400, -400), 75),
			new Circle(vec(-1300, -1300), 100),
			new Circle(vec(1300, 1300), 100),
			new Circle(vec(-1300, 1300), 100),
			new Circle(vec(1300, -1300), 100),

			// Circular posts in mid-area
			new Circle(vec(-150, 0), 30),
			new Circle(vec(150, 0), 30),
			new Circle(vec(0, -150), 30),
			new Circle(vec(0, 150), 30),

			// Outer circular guardposts
			new Circle(vec(-1300, 0), 60),
			new Circle(vec(1300, 0), 60),
			new Circle(vec(0, -1300), 60),
			new Circle(vec(0, 1300), 60),

			// Decorative circles (no collision)
			new Circle(vec(-600, -600), 40, false, Color.Cyan),
			new Circle(vec(600, 600), 40, false, Color.Cyan),
			new Circle(vec(-600, 600), 40, false, Color.Magenta),
			new Circle(vec(600, -600), 40, false, Color.Magenta),
		];

		// Decorative elements
		const decorations = [
			// Spawn area markers
			new Decoration(vec(100, 100), vec(50, 50), Color.fromHex("#22FFAA")),
			new Decoration(vec(-1400, -1400), vec(80, 80), Color.fromHex("#FF22AA")),
			new Decoration(vec(1400, 1400), vec(80, 80), Color.fromHex("#22AAFF")),
			new Decoration(vec(-1400, 1400), vec(80, 80), Color.fromHex("#AAFF22")),
			new Decoration(vec(1400, -1400), vec(80, 80), Color.fromHex("#FFAA22")),

			// Lane markers
			...Array.from({ length: 10 }, (_, i) => new Decoration(vec(0, -1350 + i * 300), vec(20, 20), Color.Yellow)),
			...Array.from({ length: 10 }, (_, i) => new Decoration(vec(-1350 + i * 300, 0), vec(20, 20), Color.Yellow)),

			// Corner decorations
			...Array.from(
				{ length: 5 },
				(_, i) => new Decoration(vec(-1400 + i * 50, -1400 + i * 50), vec(15, 15), Color.Orange)
			),
			...Array.from(
				{ length: 5 },
				(_, i) => new Decoration(vec(1400 - i * 50, -1400 + i * 50), vec(15, 15), Color.Orange)
			),
			...Array.from(
				{ length: 5 },
				(_, i) => new Decoration(vec(-1400 + i * 50, 1400 - i * 50), vec(15, 15), Color.Orange)
			),
			...Array.from(
				{ length: 5 },
				(_, i) => new Decoration(vec(1400 - i * 50, 1400 - i * 50), vec(15, 15), Color.Orange)
			),

			// Health pack indicators (for future gameplay mechanics)
			new Decoration(vec(0, 0), vec(30, 30), Color.fromHex("#FF0000")),
			new Decoration(vec(-700, 700), vec(30, 30), Color.fromHex("#FF0000")),
			new Decoration(vec(700, -700), vec(30, 30), Color.fromHex("#FF0000")),
			new Decoration(vec(-700, -700), vec(30, 30), Color.fromHex("#FF0000")),
			new Decoration(vec(700, 700), vec(30, 30), Color.fromHex("#FF0000")),
		];

		// Add all objects to the scene
		for (let box of [...boundaries, ...obstacles]) {
			engine.add(box);
		}

		for (let platform of platforms) {
			engine.add(platform);
		}

		for (let circle of circles) {
			engine.add(circle);
		}

		for (let decoration of decorations) {
			engine.add(decoration);
		}
	}
}
