import Logger from "shared/Utility/Logger";
import { Debris, RunService } from "@rbxts/services";
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

function StartingCFrame(startModel: Model, distance: number): CFrame {
	const startPosition = startModel.GetPivot().Position.sub(new Vector3(0, 0, distance));
	const orientation = startModel.GetPivot().LookVector;
	const startCFrame = new CFrame(startPosition, orientation);
	return startCFrame;
}

@SkillDecorator
export class HallowHold extends Skill {
	protected OnConstructServer(): void {
		Logger.Log(script, "Server Constructor");
	}

	protected OnStartClient(): void {}

	protected OnStartServer(): void {
		const HRP = this.Character?.Instance.FindFirstChild("HumanoidRootPart") as BasePart;

		if (HRP === undefined) {
			Logger.Log(script, "HRP is nil");
			return;
		}

		const abilityModel = StorageManager.CloneFromStorage("Hallow Hold Ability") as HallowHoldModel;
		const HRPPosition = HRP.Position.sub(new Vector3(0, 0, 5));

		abilityModel.Name = "HallowHold_02";
		abilityModel.Parent = game.Workspace;
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
			abilityModel.PurpleSphere.Transparency = 0.5;
		});
		task.delay(3.0, () => {
			abilityModel.RedSphere.Transparency = 1;
			abilityModel.BlueSphere.Transparency = 1;
			(abilityModel.BlueSphere.FindFirstChild("Fire", true) as ParticleEmitter).Enabled = false;
			(abilityModel.RedSphere.FindFirstChild("Fire", true) as ParticleEmitter).Enabled = false;
		});

		const startFrame = new CFrame(HRPPosition).mul(CFrame.Angles(0, math.rad(90), 0));
		abilityModel.PivotTo(startFrame);

		TweenScale(abilityModel.PurpleSphere as BasePart, 2.5);
		Debris.AddItem(abilityModel, 11);
		/* Dummy Testing Code: End */
	}

	protected OnEndServer(): void {
		Logger.Log(script, "Server Ended: ", this.Character?.Instance.Name);
	}
}
