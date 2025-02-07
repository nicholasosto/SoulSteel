import Logger from "shared/Utility/Logger";
import { Skill, SkillDecorator } from "@rbxts/wcs";
import { SkillDefinitions } from "shared/Skills/Data/SkillDefinitions";

@SkillDecorator
export class Meditate extends Skill {
	private _skillDefinition = SkillDefinitions.Meditate;
	private _damageContainer = this.CreateDamageContainer(this._skillDefinition.baseDamage ?? 10);
	private _animationTrack: AnimationTrack | undefined;

	protected OnConstructServer(): void {
		Logger.Log(script, "Constructing Skill ");
	}

	// 01. CONSTRUCT CLIENT
	public OnConstructClient(): void {
		Logger.Log(script, "- Client");
	}

	// MOVE START
	public OnStartServer() {
		//this._animationTrack?.Play();
	}

	// END SERVER
	public OnEndServer() {
		Logger.Log(script, "End Server");
	}
}
