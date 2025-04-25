import { Actor, CollisionType, Color, Engine, Vector } from "excalibur";

export class Platform extends Actor {
	constructor(pos: Vector, public size: Vector) {
		super({
			pos,
			height: size.y,
			width: size.x,
			color: Color.Green,
		});
	}

	onInitialize(engine: Engine): void {
		this.collider.useBoxCollider(this.size.x, this.size.y);
		this.body.collisionType = CollisionType.Fixed;
	}
}
