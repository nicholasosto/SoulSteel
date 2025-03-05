// BaseProjectile.ts
import { IProjectile } from "../IProjectile";

export default class BaseProjectile implements IProjectile {
	public speed: number;
	public damage: number;
	public direction: Vector3;
	public position: Vector3;
	// The Part representing the projectile in the 3D world
	private projectilePart: Part;

	constructor(projectilePart: Part, direction: Vector3, speed: number, damage: number) {
		this.projectilePart = projectilePart;
		this.direction = direction;
		this.speed = speed;
		this.damage = damage;
		this.position = projectilePart.Position;
	}

	public update(deltaTime: number): void {
		// Move the projectile in its current direction.
		const displacement = this.direction.mul(this.speed * deltaTime);
		this.position = this.position.add(displacement);
		this.projectilePart.Position = this.position;
	}

	public onCollision(hit: BasePart): void {
		// Here you might deal damage to the hit object, spawn effects, etc.
		print(`Standard projectile hit: ${hit.Name}`);
		this.destroy();
	}

	public destroy(): void {
		// For now, simply destroy the part.
		this.projectilePart.Destroy();
	}
}
