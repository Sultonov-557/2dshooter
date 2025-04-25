import { Engine, Scene, vec, Color, Font, TextAlign, Vector } from "excalibur";
import { Box } from "../objects/box";
import { Platform } from "../objects/platform";
import { Circle } from "../objects/circle";
import { Decoration } from "../objects/decoration";

export class EvenFuckingBigerMapZone extends Scene {
	onInitialize(engine: Engine): void {
		// Main arena boundaries - expanded to 5000x5000
		const boundaries = [
			// Outer walls
			new Box(vec(0, -2500), vec(5000, 80)), // Top
			new Box(vec(0, 2500), vec(5000, 80)), // Bottom
			new Box(vec(-2500, 0), vec(80, 5000)), // Left
			new Box(vec(2500, 0), vec(80, 5000)), // Right
		];

		// Create quadrant zones - different gameplay areas
		const quadrants = [
			// Top-left quadrant - maze-like structure
			...this.createMazeQuadrant(vec(-1250, -1250), 1000),

			// Top-right quadrant - circular arena
			...this.createCircularArena(vec(1250, -1250), 1000),

			// Bottom-left quadrant - fortress structure
			...this.createFortressQuadrant(vec(-1250, 1250), 1000),

			// Bottom-right quadrant - open battle area with scattered cover
			...this.createBattleArena(vec(1250, 1250), 1000),
		];

		// Central hub structure that connects all quadrants
		const centralHub = [
			// Center platform
			new Platform(vec(0, 0), vec(300, 300)),

			// Four corridors connecting to quadrants
			new Platform(vec(-650, 0), vec(1000, 120)),
			new Platform(vec(650, 0), vec(1000, 120)),
			new Platform(vec(0, -650), vec(120, 1000)),
			new Platform(vec(0, 650), vec(120, 1000)),

			// Center circle - capture point
			new Circle(vec(0, 0), 120, true, Color.fromHex("#FF4400")),
		];

		// Special features throughout the map
		const specialFeatures = [
			// Power-up locations (decorative for now)
			...this.createPowerupLocations(),

			// Spawn points with special visuals
			...this.createSpawnPoints(),

			// Danger zones (red decorations)
			...this.createDangerZones(),

			// Map border markers
			...this.createBorderMarkers(),
		];

		// Elite enemy spawn positions (larger decorations)
		const eliteSpawns = [
			// Elite spawns in each corner of the map
			new Decoration(vec(-2300, -2300), vec(150, 150), Color.fromHex("#FF00FF")),
			new Decoration(vec(2300, -2300), vec(150, 150), Color.fromHex("#FF00FF")),
			new Decoration(vec(-2300, 2300), vec(150, 150), Color.fromHex("#FF00FF")),
			new Decoration(vec(2300, 2300), vec(150, 150), Color.fromHex("#FF00FF")),

			// Boss spawn in center
			new Decoration(vec(0, 0), vec(80, 80), Color.fromHex("#FF0000")),
		];

		// Add all objects to the scene
		for (let obj of [...boundaries, ...quadrants, ...centralHub, ...specialFeatures, ...eliteSpawns]) {
			engine.add(obj);
		}
	}

	// Creates a maze-like quadrant with narrow corridors
	createMazeQuadrant(center: Vector, size: number) {
		const objects = [];
		const halfSize = size / 2;
		const cellSize = 100;
		const wallThickness = 20;

		// Create a grid of walls
		for (let x = 0; x < 10; x++) {
			for (let y = 0; y < 10; y++) {
				// Skip some walls to create paths
				if ((x + y) % 3 !== 0 && Math.random() > 0.4) {
					// Horizontal or vertical wall
					if (Math.random() > 0.5) {
						objects.push(
							new Box(
								vec(center.x - halfSize + x * cellSize, center.y - halfSize + y * cellSize),
								vec(cellSize, wallThickness)
							)
						);
					} else {
						objects.push(
							new Box(
								vec(center.x - halfSize + x * cellSize, center.y - halfSize + y * cellSize),
								vec(wallThickness, cellSize)
							)
						);
					}
				}

				// Add some decorations
				if ((x + y) % 5 === 0) {
					objects.push(
						new Decoration(
							vec(center.x - halfSize + x * cellSize, center.y - halfSize + y * cellSize),
							vec(15, 15),
							Color.fromHex("#00FFAA")
						)
					);
				}
			}
		}

		// Add circular obstacles
		for (let i = 0; i < 8; i++) {
			objects.push(
				new Circle(
					vec(center.x - halfSize + Math.random() * size, center.y - halfSize + Math.random() * size),
					15 + Math.random() * 20
				)
			);
		}

		return objects;
	}

	// Creates a circular arena with concentric rings
	createCircularArena(center: Vector, size: number) {
		const objects = [];
		const radiusSizes = [300, 500, 700];

		// Create concentric circles
		for (const radius of radiusSizes) {
			// Create 8 circle segments with gaps between
			for (let i = 0; i < 8; i++) {
				const angle = (i * Math.PI) / 4 + Math.PI / 16;
				const arcLength = Math.PI / 8;

				// Calculate points along the arc
				for (let j = 0; j < 10; j++) {
					const currAngle = angle + (j * arcLength) / 10;
					const x = center.x + radius * Math.cos(currAngle);
					const y = center.y + radius * Math.sin(currAngle);

					objects.push(new Platform(vec(x, y), vec(30, 30)));
				}
			}
		}

		// Add center platform
		objects.push(new Circle(center, 100, true, Color.fromHex("#44AAFF")));

		// Add decorative elements
		for (let i = 0; i < 20; i++) {
			const angle = Math.random() * Math.PI * 2;
			const distance = Math.random() * 400 + 100;

			objects.push(
				new Decoration(
					vec(center.x + Math.cos(angle) * distance, center.y + Math.sin(angle) * distance),
					vec(10, 10),
					Color.fromHex("#AAFFEE")
				)
			);
		}

		return objects;
	}

	// Creates a fortress with walls and defensive structures
	createFortressQuadrant(center: Vector, size: number) {
		const objects = [];
		const halfSize = size / 2;

		// Main fortress walls
		objects.push(new Box(vec(center.x, center.y - halfSize + 50), vec(800, 50))); // Top
		objects.push(new Box(vec(center.x, center.y + halfSize - 50), vec(800, 50))); // Bottom
		objects.push(new Box(vec(center.x - halfSize + 50, center.y), vec(50, 800))); // Left
		objects.push(new Box(vec(center.x + halfSize - 50, center.y), vec(50, 800))); // Right

		// Corner towers
		for (const xOffset of [-300, 300]) {
			for (const yOffset of [-300, 300]) {
				objects.push(
					new Circle(vec(center.x + xOffset, center.y + yOffset), 80, true, Color.fromHex("#887766"))
				);
			}
		}

		// Inner structures
		objects.push(new Box(vec(center.x, center.y), vec(200, 50)));
		objects.push(new Box(vec(center.x, center.y), vec(50, 200)));

		// Add platforms as elevated positions
		for (const offset of [-200, 0, 200]) {
			objects.push(new Platform(vec(center.x + offset, center.y - 150), vec(100, 30)));

			objects.push(new Platform(vec(center.x + offset, center.y + 150), vec(100, 30)));
		}

		// Decorative elements
		for (let i = 0; i < 30; i++) {
			objects.push(
				new Decoration(
					vec(
						center.x - halfSize + 100 + Math.random() * (size - 200),
						center.y - halfSize + 100 + Math.random() * (size - 200)
					),
					vec(15, 15),
					Color.fromHex("#CCBBAA")
				)
			);
		}

		return objects;
	}

	// Creates an open battle area with scattered cover
	createBattleArena(center: Vector, size: number) {
		const objects = [];
		const halfSize = size / 2;

		// Scattered box cover
		for (let i = 0; i < 12; i++) {
			const coverSize = 30 + Math.random() * 80;
			objects.push(
				new Box(
					vec(
						center.x - halfSize + 100 + Math.random() * (size - 200),
						center.y - halfSize + 100 + Math.random() * (size - 200)
					),
					vec(coverSize, coverSize)
				)
			);
		}

		// Scattered platforms
		for (let i = 0; i < 8; i++) {
			const platformWidth = 80 + Math.random() * 120;
			objects.push(
				new Platform(
					vec(
						center.x - halfSize + 100 + Math.random() * (size - 200),
						center.y - halfSize + 100 + Math.random() * (size - 200)
					),
					vec(platformWidth, 30)
				)
			);
		}

		// Circular obstacles
		for (let i = 0; i < 6; i++) {
			const radius = 30 + Math.random() * 40;
			objects.push(
				new Circle(
					vec(
						center.x - halfSize + 100 + Math.random() * (size - 200),
						center.y - halfSize + 100 + Math.random() * (size - 200)
					),
					radius,
					true,
					Color.fromHex("#5577AA")
				)
			);
		}

		return objects;
	}

	// Creates power-up locations marked with decorations
	createPowerupLocations() {
		const locations = [];
		const positions = [
			vec(0, -1500),
			vec(0, 1500),
			vec(-1500, 0),
			vec(1500, 0), // Mid-points of each side
			vec(-1000, -1000),
			vec(1000, -1000),
			vec(-1000, 1000),
			vec(1000, 1000), // Inward from corners
			vec(0, 0), // Center
		];

		for (const pos of positions) {
			// Outer highlight
			locations.push(new Decoration(pos, vec(60, 60), Color.fromHex("#FFFF00")));

			// Inner highlight
			locations.push(new Decoration(pos, vec(30, 30), Color.fromHex("#FFAA00")));
		}

		return locations;
	}

	// Creates spawn points with special decorations
	createSpawnPoints() {
		const spawns = [];
		const positions = [
			vec(-2300, -2300),
			vec(2300, -2300),
			vec(-2300, 2300),
			vec(2300, 2300), // Far corners
			vec(0, -2300),
			vec(0, 2300),
			vec(-2300, 0),
			vec(2300, 0), // Mid-wall spawns
		];

		const colors = ["#FF5555", "#55FF55", "#5555FF", "#FFFF55", "#FF55FF", "#55FFFF", "#BB7722", "#2277BB"];

		for (let i = 0; i < positions.length; i++) {
			// Main spawn marker
			spawns.push(new Decoration(positions[i], vec(100, 100), Color.fromHex(colors[i])));

			// Inner marker
			spawns.push(new Decoration(positions[i], vec(50, 50), Color.fromHex("#FFFFFF")));

			// Directional arrows - point toward center
			const angle = Math.atan2(-positions[i].y, -positions[i].x);
			for (let j = 1; j <= 3; j++) {
				spawns.push(
					new Decoration(
						vec(positions[i].x + Math.cos(angle) * j * 40, positions[i].y + Math.sin(angle) * j * 40),
						vec(20, 20),
						Color.fromHex(colors[i])
					)
				);
			}
		}

		return spawns;
	}

	// Creates danger zones with red decorations
	createDangerZones() {
		const dangers = [];
		const dangerPositions = [
			vec(-1800, -500),
			vec(1800, 500),
			vec(-500, 1800),
			vec(500, -1800),
			vec(-1200, -1200),
			vec(1200, 1200),
		];

		for (const pos of dangerPositions) {
			// Create a grid of red decorations
			for (let x = -2; x <= 2; x++) {
				for (let y = -2; y <= 2; y++) {
					dangers.push(
						new Decoration(vec(pos.x + x * 30, pos.y + y * 30), vec(15, 15), Color.fromHex("#DD0000"))
					);
				}
			}

			// Add center danger indicator
			dangers.push(
				new Circle(
					pos,
					40,
					false, // Non-collidable
					Color.fromHex("#FF0000")
				)
			);
		}

		return dangers;
	}

	// Creates markers along the map border
	createBorderMarkers() {
		const markers = [];
		const borderSize = 2450;

		// Create markers along each edge
		for (let i = -20; i <= 20; i++) {
			// Skip corners
			if (i === -20 || i === 20) continue;

			// Position markers offset from walls
			const offset = i * 120;

			// Top edge
			markers.push(new Decoration(vec(offset, -borderSize + 30), vec(20, 10), Color.fromHex("#DDDDDD")));

			// Bottom edge
			markers.push(new Decoration(vec(offset, borderSize - 30), vec(20, 10), Color.fromHex("#DDDDDD")));

			// Left edge
			markers.push(new Decoration(vec(-borderSize + 30, offset), vec(10, 20), Color.fromHex("#DDDDDD")));

			// Right edge
			markers.push(new Decoration(vec(borderSize - 30, offset), vec(10, 20), Color.fromHex("#DDDDDD")));
		}

		return markers;
	}
}
