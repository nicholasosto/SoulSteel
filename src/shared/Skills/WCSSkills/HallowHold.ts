import Logger from "shared/Utility/Logger";
import { Debris, RunService } from "@rbxts/services";
import AudioPlayer, { AudioFiles, AudioFile } from "shared/Utility/AudioPlayer";
import { TweenRotate, TweenScale, TweenCollide } from "shared/_Functions/TweenFunctions";
import StorageManager from "shared/Storage/StorageManager";
import { Skill, SkillDecorator } from "@rbxts/wcs";
import { TGameCharacter } from "shared/_Types/TGameCharacter";
import { AddTemporaryEffect, EnableParticleEffects } from "shared/_Functions/EffectFunctions";

type HallowHoldModel = Model & {
	BlueSphere: BasePart;
	RedSphere: BasePart;
	PurpleSphere: BasePart;
	Handle: BasePart;
};

@SkillDecorator
export class HallowHold extends Skill {
	protected OnConstructServer(): void {
		Logger.Log(script, "Server Constructor");
	}

	protected OnStartClient(): void {}

	protected OnStartServer(): void {
		const HRP = this.Character?.Instance.FindFirstChild("HumanoidRootPart") as BasePart;

		if (HRP === undefined) return;

		/* Create and Position Ability Model */
		const abilityModel = StorageManager.CloneFromStorage("Hallow Hold Ability") as HallowHoldModel;
		abilityModel.Parent = game.Workspace;
		abilityModel.PivotTo(HRP.CFrame.mul(new CFrame(0, 0, -9)).mul(CFrame.Angles(0, math.rad(90), 0)));
		abilityModel.Name = "HallowHold_02";

		/* Temporarty Effect */
		AddTemporaryEffect(this.Character?.Instance as TGameCharacter, 5);
		/* Run Model Phases */
		task.delay(0.5, () => {
			AudioPlayer.PlayAudio(AudioFiles.get("lightning") as AudioFile);
			abilityModel.BlueSphere.Transparency = 0;
			EnableParticleEffects(abilityModel.BlueSphere, true);
		});
		task.delay(1.5, () => {
			abilityModel.RedSphere.Transparency = 0;
			EnableParticleEffects(abilityModel.RedSphere, true);
		});
		task.delay(2.4, () => {
			TweenCollide(abilityModel.RedSphere, abilityModel.BlueSphere, 0.2);
			AudioPlayer.PlayAudio(AudioFiles.get("fingerSnap") as AudioFile);
			EnableParticleEffects(abilityModel.PurpleSphere, true);
		});
		task.delay(3.0, () => {
			AudioPlayer.PlayAudio(AudioFiles.get("instaKill") as AudioFile);
			abilityModel.RedSphere.Transparency = 1;
			abilityModel.BlueSphere.Transparency = 1;
			(abilityModel.BlueSphere.FindFirstChild("Fire", true) as ParticleEmitter).Enabled = false;
			(abilityModel.RedSphere.FindFirstChild("Fire", true) as ParticleEmitter).Enabled = false;
		});

		TweenScale(abilityModel.PurpleSphere as BasePart, 2.5);
		Debris.AddItem(abilityModel, 11);
		/* Dummy Testing Code: End */
	}

	protected OnEndServer(): void {
		Logger.Log(script, "Server Ended: ", this.Character?.Instance.Name);
	}
}
