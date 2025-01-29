import { Skill, SkillDecorator } from "@rbxts/wcs";
import { CreateAnimationTrack, EAnimationID } from "shared/Animation/AnimationIndex";
import { Logger } from "shared/Utility/Logger";
import { SkillDefinitions } from "shared/Skills/Data/SkillDefinitions";;

@SkillDecorator
export class SpiritOrb extends Skill {
	private _skillDefinition = SkillDefinitions.SpiritOrb;
	private _damageContainer = this.CreateDamageContainer(this._skillDefinition.baseDamage ?? 10);
	private _animationTrack: AnimationTrack | undefined;

	protected OnConstructServer(): void {
		const characterModel = this.Character.Instance as Model;

		// Create Animation Track
		const animationId = EAnimationID.SKILL_Fart;
		this._animationTrack = CreateAnimationTrack(characterModel, animationId as EAnimationID);

		assert(this._animationTrack, "Animation Track is nil");
	}

	protected OnStartServer(): void {
		//this._animationTrack?.Play();
	}

	protected OnEndServer(): void {}
}
