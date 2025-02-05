import BaseProjectile from "./BaseProjectile";
import { IProjectile } from "../IProjectile";
import { Workspace } from "@rbxts/services";

export default class ExplosiveProjectile extends BaseProjectile implements IProjectile {
	public explosionRadius: number;

	constructor(projectilePart: Part, direction: Vector3, speed: number, damage: number, explosionRadius = 10) {
		super(projectilePart, direction, speed, damage);
		this.explosionRadius = explosionRadius;
	}

	public onCollision(hit: BasePart): void {
		// Create an explosion effect at the projectile's position.
		const explosion = new Instance("Explosion");
		explosion.Position = this.position;
		explosion.BlastRadius = this.explosionRadius;
		explosion.BlastPressure = 500;
		explosion.Parent = Workspace;
		print("Explosive projectile triggered an explosion!");
		this.destroy();
	}
}
