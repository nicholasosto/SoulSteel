import { IProjectile } from "./IProjectile";
import BaseProjectile from "./Projectiles/BaseProjectile";
import ExplosiveProjectile from "./Projectiles/ExplosiveProjectile";
import { Workspace } from "@rbxts/services";

export enum ProjectileType {
	Standard,
	Explosive,
	// … add more types as needed
}

export class ProjectileFactory {
	/**
	 * Creates a projectile of the specified type.
	 *
	 * @param projectileType The type of projectile to create.
	 * @param template The template Part used as a base for the projectile.
	 * @param direction The direction the projectile will travel.
	 * @param speed The projectile's speed.
	 * @param damage The damage dealt by the projectile.
	 */
	public static createProjectile(
		projectileType: ProjectileType,
		template: Part,
		direction: Vector3,
		speed: number,
		damage: number,
	): IProjectile {
		// Clone the template part so that the original isn’t modified.
		const projectilePart = template.Clone() as Part;
		projectilePart.Parent = Workspace;

		switch (projectileType) {
			case ProjectileType.Standard:
				return new BaseProjectile(projectilePart, direction, speed, damage);
			case ProjectileType.Explosive:
				return new ExplosiveProjectile(projectilePart, direction, speed, damage);
			default:
				error("Unknown projectile type provided to ProjectileFactory");
		}
	}
}
