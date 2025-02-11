import { Skill, SkillDecorator } from "@rbxts/wcs";
import { CreateAnimationTrack, EAnimationID } from "shared/Animation/AnimationIndex";
import Logger from "shared/Utility/Logger";
import { SkillDefinitions } from "shared/_Definitions/SkillDefinitions";

@SkillDecorator
export class SpiritOrb extends Skill {
	private _skillDefinition = SkillDefinitions.SpiritOrb;
	private _damageContainer = this.CreateDamageContainer(this._skillDefinition.baseDamage ?? 10);
	private _animationTrack: AnimationTrack | undefined;

	protected OnConstructServer(): void {
		Logger.Log(script, "Constructing Skill ");
	}

	protected OnStartServer(): void {
		//this._animationTrack?.Play();
	}

	protected OnEndServer(): void {}
}
