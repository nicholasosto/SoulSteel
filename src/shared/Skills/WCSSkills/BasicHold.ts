import Logger from "shared/Utility/Logger";
import { Skill, SkillDecorator } from "@rbxts/wcs";

@SkillDecorator
export class BasicHold extends Skill {
	private _damageContainer = this.CreateDamageContainer(14);
	protected OnConstruct(): void {
		Logger.Log(script, "Shared Construct", this.Character?.Instance.Name);
	}

	protected OnConstructServer(): void {
		Logger.Log(script, "Server Constructor", this.Character?.Instance.Name);
		//super.OnConstructServer();
	}

	protected OnStartClient(): void {
		Logger.Log(script, "Client Start", this.Character?.Instance.Name);
	}

	protected OnStartServer(): void {
		Logger.Log(script, "Server Started: ", this.Character?.Instance.Name);
	}

	protected OnEndServer(): void {
		Logger.Log(script, "Server Ended: ", this.Character?.Instance.Name);
	}
}
