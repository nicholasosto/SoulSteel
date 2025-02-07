import { Skill, SkillDecorator } from "@rbxts/wcs";
import { SkillDefinitions } from "shared/Skills/Data/SkillDefinitions";;
import { CreateAnimationTrack, EAnimationID } from "shared/Animation/AnimationIndex";
import Logger from "shared/Utility/Logger";

@SkillDecorator
export class Charge extends Skill {
	private _skillDefinition = SkillDefinitions.BasicHold;
	private _damageContainer = this.CreateDamageContainer(this._skillDefinition.baseDamage ?? 10);
	private _animationTrack: AnimationTrack | undefined;

	protected OnConstructServer(): void {
		const characterModel = this.Character.Instance as Model;

		// Create Animation Track

		assert(this._animationTrack, "Animation Track is nil");
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
