import Logger from "shared/Utility/Logger";
import { Skill, SkillDecorator } from "@rbxts/wcs";
import { SkillDefinitions } from "shared/_Definitions/SkillDefinitions";

@SkillDecorator
export class Dash extends Skill {
	private _skillDefinition = SkillDefinitions.Dash;
	private _damageContainer = this.CreateDamageContainer(this._skillDefinition.baseDamage ?? 10);
	private _animationTrack: AnimationTrack | undefined;

	protected OnConstruct(): void {
		Logger.Log(script, "Shared Construct", this._skillDefinition as unknown as string);
	}

	protected OnConstructServer(): void {
		Logger.Log(script, "Server Constructor", this._skillDefinition as unknown as string);
		//super.OnConstructServer();
	}

	protected OnStartClient(): void {
		Logger.Log(script, "Client Start", this._skillDefinition as unknown as string);
	}

	protected OnStartServer(): void {
		Logger.Log(script, "Server Started: ");
	}

	protected OnEndServer(): void {
		Logger.Log(script, "Server Ended: ");
	}
}
