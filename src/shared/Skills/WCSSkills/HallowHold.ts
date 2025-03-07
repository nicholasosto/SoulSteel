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
import { EnableParticleEffects, TimedEffect } from "shared/_Functions/EffectFunctions";
import { GetPlayerCharacter } from "shared/_Registry/EntityRegistration";

/* WCS Package */
import { Character, Skill, SkillDecorator } from "@rbxts/wcs";
import IPlayerCharacter from "shared/_Interfaces/IPlayerCharacter";

/* Test function for onHit */
function initializeTouchedEvent(model: Model, thisMove: HallowHold) {
	/* Get the parts */
	const purpleSphere = model.FindFirstChild("PurpleSphere") as BasePart;

	purpleSphere.Touched.Connect((hit: BasePart) => {
		Logger.Log(script, "Touched Purple", hit.Parent?.Name);
		const hitModel = hit.Parent as TGameCharacter;
		const wcsCharacter = Character.GetCharacterFromInstance(hitModel);
		if (wcsCharacter !== thisMove.Character) {
			wcsCharacter?.TakeDamage({ Damage: 100, Source: thisMove });
		}
	});
}

/* Hallow Hold Skill */
@SkillDecorator
export class HallowHold extends Skill {
	/* Not sure if this is needed for something later*/
	protected OnStartClient(): void {}

	protected OnStartServer(): void {
		/* Get the Player Character */
		const playerCharacter = GetPlayerCharacter(this.Player!);
		const playerCharacterModel = playerCharacter?.characterModel;
		if (playerCharacterModel === undefined || playerCharacter === undefined) return;

		/* Get the target Character Model*/
		const targetGameCharacter = playerCharacter.targetManager.GetTarget();
		const targetCharacterModel = targetGameCharacter?.characterModel;

		/* Create and Position Ability Model */
		const abilityModel = StorageManager.CloneFromStorage("Hallow Hold Ability") as THallowHold;
		abilityModel.Parent = game.Workspace;
		const modelRotationFrame = playerCharacterModel
			.GetPivot()
			.mul(new CFrame(0, 0, -9))
			.mul(CFrame.Angles(0, math.rad(90), 0));
		abilityModel.PivotTo(modelRotationFrame);

		/* Initialize Touched Event */
		initializeTouchedEvent(abilityModel, this);

		/* Add Casting Aura Effect */
		TimedEffect(this.Character?.Instance as TGameCharacter, 5);

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
			TweenCollide(abilityModel.Handle.GetPivot(), abilityModel.RedSphere, abilityModel.BlueSphere, 50);
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
			const targetCFrame = targetCharacterModel
				? (targetCharacterModel?.GetPivot() as CFrame)
				: playerCharacterModel.GetPivot().mul(new CFrame(0, 0, -40));
			abilityModel.PurpleSphere.Transparency = 0;
			TweenShoot(abilityModel.PurpleSphere, targetCFrame, 44);
			TweenPulseTransparency(abilityModel.PurpleSphere, 1.5);
			AudioPlayer.PlayAudio(AudioFiles.get("instaKill") as AudioFile);
		});
	}
}
