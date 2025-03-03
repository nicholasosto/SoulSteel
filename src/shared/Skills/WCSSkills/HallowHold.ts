/* Folder: src/shared/Skills/WCSSkills */
/* Purpose: Create a new skill called HallowHold */
/* Main Points:
	- Create a new skill called HallowHold
	- Use Tween functions to animate the skill
	- Use Entity Registration to get the player character
	- Use Effect Functions to add effects to the character
*/

/* Imports */

/* Roblox Services */
import { Debris } from "@rbxts/services";

/* Types */
import { TGameCharacter } from "shared/_Types/TGameCharacter";
import { THallowHold } from "shared/_Types/Ability Models/THallowHold";

/* Utility Modules */
import Logger from "shared/Utility/Logger";
import StorageManager from "shared/Storage/StorageManager";
import AudioPlayer, { AudioFiles, AudioFile } from "shared/Utility/AudioPlayer";

/* Imported Functions */
import { TweenCollide, TweenShoot, TweenPulseTransparency } from "shared/_Functions/TweenFunctions";
import { AddTemporaryEffect, EnableParticleEffects } from "shared/_Functions/EffectFunctions";
import { GetPlayerCharacter } from "shared/_Registry/EntityRegistration";

/* WCS Package */
import { Skill, SkillDecorator } from "@rbxts/wcs";

/* Test function for onHit */
function initializeTouchedEvent(model: Model) {
	/* Get the parts */
	const redSphere = model.FindFirstChild("RedSphere") as BasePart;
	const blueSphere = model.FindFirstChild("BlueSphere") as BasePart;
	const purpleSphere = model.FindFirstChild("PurpleSphere") as BasePart;

	/* Create the Touched Events */
	redSphere.Touched.Connect((hit: BasePart) => {
		Logger.Log(script, "Touched Red", hit.Parent?.Name);
	});

	blueSphere.Touched.Connect((hit: BasePart) => {
		Logger.Log(script, "Touched Blue", hit.Parent?.Name);
	});

	purpleSphere.Touched.Connect((hit: BasePart) => {
		Logger.Log(script, "Touched Purple", hit.Parent?.Name);
	});
}

/* Hallow Hold Skill */
@SkillDecorator
export class HallowHold extends Skill {
	/* Not sure if this is needed for something later*/
	protected OnStartClient(): void {}

	protected OnStartServer(): void {
		const HRP = this.Character?.Instance.FindFirstChild("HumanoidRootPart") as BasePart;
		const GameCharacter = GetPlayerCharacter(this.Player!);
		if (HRP === undefined) return;
		if (GameCharacter === undefined) return;
		const target = GameCharacter.targetManager.GetTarget();

		Logger.Log(script, GameCharacter?.player.Name, "Hallow Hold");

		/* Create and Position Ability Model */
		const abilityModel = StorageManager.CloneFromStorage("Hallow Hold Ability") as THallowHold;
		abilityModel.Parent = game.Workspace;
		abilityModel.PivotTo(HRP.CFrame.mul(new CFrame(0, 0, -9)).mul(CFrame.Angles(0, math.rad(90), 0)));
		abilityModel.Name = "HallowHold_02";
		Debris.AddItem(abilityModel, 11);

		/* Initialize Touched Event */
		initializeTouchedEvent(abilityModel);

		/* Add Casting Aura Effect */
		AddTemporaryEffect(this.Character?.Instance as TGameCharacter, 5);

		/* Spawn Blue Sphere */
		task.delay(0.5, () => {
			AudioPlayer.PlayAudio(AudioFiles.get("lightning") as AudioFile);
			abilityModel.BlueSphere.Transparency = 0;
			EnableParticleEffects(abilityModel.BlueSphere, true);
		});

		/* Spawn Red Sphere */
		task.delay(1.5, () => {
			abilityModel.RedSphere.Transparency = 0;
			EnableParticleEffects(abilityModel.RedSphere, true);
		});

		/* Collide Spheres */
		task.delay(2.4, () => {
			TweenCollide(abilityModel.RedSphere, abilityModel.BlueSphere, 0.2);
			AudioPlayer.PlayAudio(AudioFiles.get("fingerSnap") as AudioFile);
			EnableParticleEffects(abilityModel.PurpleSphere, true);
		});

		/* Shoot Purple Sphere */
		task.delay(3.0, () => {
			/* Hide Red and Blue Spheres */
			abilityModel.RedSphere.Transparency = 1;
			abilityModel.BlueSphere.Transparency = 1;
			/* Disable Particle Effects */
			EnableParticleEffects(abilityModel.RedSphere, false);
			EnableParticleEffects(abilityModel.BlueSphere, false);

			/* Show and Shoot Purple Sphere */
			const targetCFrame = target?.characterModel?.GetPivot() ?? HRP.CFrame.mul(new CFrame(0, 0, -40));
			abilityModel.PurpleSphere.Transparency = 0;
			TweenShoot(abilityModel.PurpleSphere, targetCFrame, 1.5);
			TweenPulseTransparency(abilityModel.PurpleSphere, 1.5);
			AudioPlayer.PlayAudio(AudioFiles.get("instaKill") as AudioFile);
		});
	}
}
