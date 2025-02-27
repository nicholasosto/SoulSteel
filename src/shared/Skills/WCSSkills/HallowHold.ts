import Logger from "shared/Utility/Logger";
import { Debris, RunService } from "@rbxts/services";
import { ScaleAbilityPart } from "shared/_Functions/EffectFunctions";
import StorageManager from "shared/Storage Manager/StorageManager";
import { Skill, SkillDecorator } from "@rbxts/wcs";

type HallowHoldModel = Model & {
	BlueSphere: BasePart;
	RedSphere: BasePart;
	PurpleSphere: BasePart;
	Handle: BasePart;
};

@SkillDecorator
export class HallowHold extends Skill {
	private _damageContainer = this.CreateDamageContainer(14);
	private _abilityModel = StorageManager.CloneFromStorage("Hallow Hold Ability") as HallowHoldModel;
	protected OnConstruct(): void {
		Logger.Log(script, "Shared Construct", this.Character?.Instance.Name);
		Logger.Log(script, "HallowHold", this._abilityModel);
	}

	protected OnConstructServer(): void {
		Logger.Log(script, "Server Constructor", this.Character?.Instance.Name);
		//super.OnConstructServer();
	}

	protected OnStartClient(): void {
		Logger.Log(script, "Client Start", this.Character?.Instance.Name);
	}

	protected OnStartServer(): void {
		let startTime = tick();
		this.Janitor.Add(
			RunService.Heartbeat.Connect(() => {
				if (startTime + 2 < tick()) {
					return;
				}
				startTime = tick();
				print(tick());
			}),
		);
		/* Dummy Testing Code: Start */
		Logger.Log(script, "Hallow - Server Started: ", this.Character?.Instance.Name);
		const characterModel = this.Character?.Instance as Model;
		if (characterModel === undefined) {
			Logger.Log(script, "Character Model is nil");
			return;
		}
		this._abilityModel = this._abilityModel.Clone();
		this._abilityModel.Parent = characterModel;
		this._abilityModel.PivotTo(characterModel.GetPivot());
		ScaleAbilityPart(this._abilityModel.PrimaryPart as BasePart, 11.5);
		Debris.AddItem(this._abilityModel.PurpleSphere, 2);
		/* Dummy Testing Code: End */
	}

	protected OnEndServer(): void {
		Logger.Log(script, "Server Ended: ", this.Character?.Instance.Name);
	}
}
