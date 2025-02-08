// IProjectile.ts
export interface IProjectile {
	/** The speed at which the projectile moves (studs/second) */
	speed: number;
	/** The damage value that the projectile deals */
	damage: number;
	/** The current direction the projectile is traveling */
	direction: Vector3;
	/** The current position of the projectile */
	position: Vector3;
	/** Called each frame to update the projectile's position */
	update(deltaTime: number): void;
	/** Called when the projectile collides with something */
	onCollision(hit: BasePart): void;
	/** Cleans up the projectile (or returns it to a pool) */
	destroy(): void;
}
