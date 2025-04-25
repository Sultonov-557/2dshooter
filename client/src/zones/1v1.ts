import { Engine, Scene, vec } from "excalibur";
import { Box } from "../objects/box";

export class OneVOneZone extends Scene {
	onInitialize(engine: Engine): void {
		const boxes = [
			new Box(vec(225, 0), vec(50, 500)),
			new Box(vec(-225, 0), vec(50, 500)),
			new Box(vec(0, 225), vec(500, 50)),
			new Box(vec(0, -225), vec(500, 50)),
			new Box(vec(0, 0), vec(50, 250)),
			new Box(vec(0, 100), vec(250, 50)),
			new Box(vec(0, -100), vec(250, 50)),
		];
		for (let box of boxes) {
			engine.add(box);
		}
	}
}
