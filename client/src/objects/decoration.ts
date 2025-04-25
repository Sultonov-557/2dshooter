import { Actor, CollisionType, Color, Engine, Vector } from "excalibur";

export class Decoration extends Actor {
	constructor(pos: Vector, public size: Vector, public color: Color = Color.Gray) {
		super({
			pos,
			height: size.y,
			width: size.x,
			color,
		});
	}

	onInitialize(engine: Engine): void {
		this.collider.useBoxCollider(this.size.x, this.size.y);
		this.body.collisionType = CollisionType.PreventCollision;
	}
}
