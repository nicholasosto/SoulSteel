import { Skill, SkillDecorator } from "@rbxts/wcs";
import { CreateAnimationTrack, AnimationIds } from "shared/_References/Animations";
import { Logger } from "shared/Utility/Logger";
import { SkillDefinitions } from "shared/_References/Skills";

@SkillDecorator
export class SpiritOrb extends Skill {
	private _skillDefinition = SkillDefinitions.SpiritOrb;
	private _damageContainer = this.CreateDamageContainer(this._skillDefinition.baseDamage ?? 10);
	private _animationTrack: AnimationTrack | undefined;

	protected OnConstructServer(): void {
		const characterModel = this.Character.Instance as Model;

		// Create Animation Track
		const animationId = AnimationIds.SKILL_Fart;
		this._animationTrack = CreateAnimationTrack(characterModel, animationId as AnimationIds);

		assert(this._animationTrack, "Animation Track is nil");
	}

	protected OnStartServer(): void {
		this._animationTrack?.Play();
	}

	protected OnEndServer(): void {}
}
