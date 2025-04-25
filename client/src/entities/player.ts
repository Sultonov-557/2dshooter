import {
	Actor,
	vec,
	Color,
	Engine,
	Keys,
	PointerEvent,
	CollisionType,
	Collider,
	CollisionContact,
	Side,
} from "excalibur";
import { Bullet } from "./bullet";
import { Socket } from "socket.io-client";

export class Player extends Actor {
	public acceleration: number = 150;
	public maxSpeed: number = 500;
	public friction: number = 0.7;
	public dashForce: number = 1000;
	public dashing = false;
	public bulletSpeed: number = 600;
	public bulletCooldown: number = 250;
	private lastShotTime: number = 0;

	constructor(public socketID: string, public currectPlayer = false, public socket?: Socket) {
		const size = 20;
		super({
			pos: vec(100, 100),
			width: size,
			height: size,
			color: Color.Yellow,
		});

		this.body.collisionType = CollisionType.Active;

		if (currectPlayer) {
			this.on("initialize", (evt) => {
				setInterval(
					() => socket?.emit("move", { pos: { x: this.pos.x, y: this.pos.y }, rot: this.rotation }),
					50
				);

				socket?.on("move", (data) => {
					this.pos.setTo(data.pos.x, data.pos.y);
					this.rotation = data.rot;
				});

				const engine = evt.engine;

				// Track mouse position and rotate player to face it
				engine.input.pointers.primary.on("move", (pointerEvent: PointerEvent) => {
					const direction = pointerEvent.worldPos.sub(this.pos);
					this.rotation = Math.atan2(direction.y, direction.x);
				});

				engine.input.pointers.primary.on("down", (pointerEvent: PointerEvent) => {
					this.shoot(engine, pointerEvent);
				});
			});
		}
	}

	private shoot(engine: Engine, pointerEvent: PointerEvent): void {
		const currentTime = Date.now();
		if (currentTime - this.lastShotTime < this.bulletCooldown) return;
		this.lastShotTime = currentTime;
		const direction = pointerEvent.worldPos.sub(this.pos).normalize();
		const vel = direction.scale(this.bulletSpeed);

		if (this.socket) {
			this.socket.emit("shoot", {
				pos: { x: this.pos.x, y: this.pos.y },
				dir: { x: vel.x, y: vel.y },
				rot: this.rotation,
			});
		}
	}

	onCollisionStart(_self: Collider, other: Collider): void {
		if (other.owner.hasTag("deadly")) {
			this.pos.setTo(100, 100);
		}
	}

	onPostUpdate(engine: Engine, delta: number): void {
		if (!this.currectPlayer) return;

		let dir = vec(0, 0);
		const keys = engine.input.keyboard.getKeys();

		if (keys.includes(Keys.KeyS)) {
			dir.y += 1;
		}
		if (keys.includes(Keys.KeyW)) {
			dir.y -= 1;
		}
		if (keys.includes(Keys.KeyD)) {
			dir.x += 1;
		}
		if (keys.includes(Keys.KeyA)) {
			dir.x -= 1;
		}

		// Apply forces based on input
		if (dir.magnitude > 0) {
			dir = dir.normalize();
			this.vel = this.vel.add(dir.scale(this.acceleration * (delta * 0.01)));
		}

		// Apply dash force if dashing

		// Apply friction
		const currentSpeed = this.vel.magnitude;
		if (currentSpeed > 0) {
			const frictionForce = this.vel.normalize().scale(this.friction * currentSpeed * (delta * 0.01));
			this.vel = this.vel.sub(frictionForce);
		}

		// Initiate dash
		if (keys.includes(Keys.Space) && dir.magnitude > 0 && !this.dashing) {
			this.vel = dir.scale(this.dashForce);
			this.dashing = true;
		}

		if (this.dashing && currentSpeed < 300) {
			this.dashing = false;
		}
	}
}
