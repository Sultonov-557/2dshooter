import { Actor, Color, Vector, Engine, CollisionType } from "excalibur";

export class Bullet extends Actor {
	private lifetime: number = 1000; // 1 second lifetime
	private createTime: number;

	constructor(pos: Vector, vel: Vector) {
		const size = 5;
		super({ pos, vel, color: Color.Red, height: size, width: size });
		this.createTime = Date.now();
		this.body.collisionType = CollisionType.Active;
		this.addTag("deadly");
	}

	onPostUpdate(engine: Engine, delta: number): void {
		// Check if bullet should be destroyed
		if (Date.now() - this.createTime > this.lifetime) {
			this.kill();
		}
	}
}
