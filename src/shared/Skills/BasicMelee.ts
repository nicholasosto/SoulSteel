import { Skill, SkillDecorator } from "@rbxts/wcs";
import { Logger } from "shared/Utility/Logger";
import { SkillDefinitions } from "shared/_References/Skills";
import { CreateAnimationTrack, AnimationIds } from "shared/_References/Animations";

@SkillDecorator
export class BasicMelee extends Skill {
	private _skillDefinition = SkillDefinitions.BasicMelee;
	private _damageContainer = this.CreateDamageContainer(this._skillDefinition.baseDamage ?? 10);
	private _animationTrack: AnimationTrack | undefined;

	protected OnConstructServer(): void {
		// Create Animation Track
		this._animationTrack = CreateAnimationTrack(
			this.Character.Instance as Model,
			AnimationIds.SKILL_BasicMelee,
		) as AnimationTrack;

		assert(this._animationTrack, "Animation Track is nil");
	}

	protected OnStartClient(): void {
		Logger.Log(script, "Client Started: ", this._skillDefinition.displayName);
	}

	protected OnStartServer(): void {
		Logger.Log(script, "Server Started: ", this._skillDefinition.displayName);
		this._animationTrack?.Play();
	}

	protected OnEndServer(): void {}
}
