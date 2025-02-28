import Logger from "shared/Utility/Logger";
import { Debris, RunService } from "@rbxts/services";
import AudioPlayer, { AudioFiles, AudioFile } from "shared/Utility/AudioPlayer";
import { TweenRotate, TweenScale, TweenCollide } from "shared/_Functions/EffectFunctions";
import StorageManager from "shared/Storage Manager/StorageManager";
import { Skill, SkillDecorator } from "@rbxts/wcs";
import { TGameCharacter } from "shared/_Types/TGameCharacter";

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
		//const HRPPosition = HRP.Position.sub(new Vector3(0, 0, 5));
		//const startFrame = new CFrame(HRPPosition).mul(CFrame.Angles(0, math.rad(90), 0));


		/* Run Model Phases */
		task.delay(0.5, () => {
			abilityModel.BlueSphere.Transparency = 0;
			(abilityModel.BlueSphere.FindFirstChild("Fire", true) as ParticleEmitter).Enabled = true;
		});
		task.delay(1.5, () => {
			abilityModel.RedSphere.Transparency = 0;
			(abilityModel.RedSphere.FindFirstChild("Fire", true) as ParticleEmitter).Enabled = true;
		});
		task.delay(2.5, () => {
			TweenCollide(abilityModel.RedSphere, abilityModel.BlueSphere);
			wait(0.5);
			AudioPlayer.PlayAudio(AudioFiles.get("fingerSnap") as AudioFile);
			abilityModel.PurpleSphere.Transparency = 0.5;
		});
		task.delay(3.0, () => {
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
