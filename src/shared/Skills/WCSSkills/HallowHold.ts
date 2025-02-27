import Logger from "shared/Utility/Logger";
import { Debris, RunService } from "@rbxts/services";
import { TweenRotate, TweenScale } from "shared/_Functions/EffectFunctions";
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
	let startCFrame = startModel.GetPivot();
	startCFrame = startCFrame.mul(new CFrame(0, 0, -distance));
	return startCFrame;
}

@SkillDecorator
export class HallowHold extends Skill {
	protected OnConstructServer(): void {
		Logger.Log(script, "Server Constructor");
	}

	protected OnStartClient(): void {}

	protected OnStartServer(): void {
		const abilityModel = StorageManager.CloneFromStorage("Hallow Hold Ability") as HallowHoldModel;
		abilityModel.Parent = game.Workspace;
		const startFrame = StartingCFrame(this.Character?.Instance as TGameCharacter, 5);
		abilityModel.PivotTo(startFrame);
		TweenRotate(abilityModel, new Vector3(0, 0, math.deg(360)));
		TweenScale(abilityModel.PurpleSphere as BasePart, 2.5);
		Debris.AddItem(abilityModel, 11);
		/* Dummy Testing Code: End */
	}

	protected OnEndServer(): void {
		Logger.Log(script, "Server Ended: ", this.Character?.Instance.Name);
	}
}
