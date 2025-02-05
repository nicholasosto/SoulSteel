import Logger from "shared/Utility/Logger";
import { ProjectileFactory, ProjectileType } from "shared/Projectile Factory/ProjectileFactory";
import { StorageManager } from "shared/Storage Manager/StorageManager";
import { RunService } from "@rbxts/services";

const DonePart = game.Workspace.WaitForChild("MainServerDone");

const projectilePart = StorageManager.CloneFromStorage("Projectile_Explosion_01");

Logger.Log(DonePart, "Main Server Done");

// Assume you have a template part in ReplicatedStorage for projectiles
const projectileTemplate = projectilePart?.FindFirstChild("HitPart") as Part;
// When firing:
function fireProjectile(origin: Vector3, direction: Vector3) {
	// Customize speed and damage as needed:
	const speed = 100;
	const damage = 25;

	// Create a standard projectile
	const projectile = ProjectileFactory.createProjectile(
		ProjectileType.Standard,
		projectileTemplate,
		direction,
		speed,
		damage,
	);
	Logger.Log(script, "Projectile Created", projectile as unknown as string);
	// Optionally, add the projectile to a tracking list so you can update it each frame

	RunService.Heartbeat.Connect((deltaTime) => {
		projectile.update(deltaTime);
	});
}

if (projectileTemplate === undefined) {
	Logger.Log(script, "Projectile Template is nil");
} else {
	let index = 0;
	while (index < 10) {
		fireProjectile(new Vector3(-1432, 269.996, -334.5), new Vector3(-1506.219, 273.084, -254.567));
		wait(2);
		Logger.Log(script, "Fired Projectile");
		index++;
	}
}
