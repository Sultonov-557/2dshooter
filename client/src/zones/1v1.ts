import { Engine, Scene, vec } from "excalibur";
import { Box } from "../objects/box";

export class OneVOneZone extends Scene {
	onInitialize(engine: Engine): void {
		const boxes = [new Box(vec(150, 150), vec(300, 30))];
		for (let box of boxes) {
			engine.add(box);
		}
	}
}
