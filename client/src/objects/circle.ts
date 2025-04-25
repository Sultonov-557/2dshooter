import { Actor, CollisionType, Color, Engine, Vector } from "excalibur";

export class Circle extends Actor {
	constructor(
		pos: Vector,
		public radius: number,
		public isObstacle: boolean = true,
		public color: Color = Color.Purple
	) {
		super({
			pos,
			radius,
			color,
		});
	}

	onInitialize(engine: Engine): void {
		this.collider.useCircleCollider(this.radius);
		this.body.collisionType = this.isObstacle ? CollisionType.Fixed : CollisionType.PreventCollision;
	}
}
