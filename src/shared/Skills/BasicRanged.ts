import { Skill, SkillDecorator } from "@rbxts/wcs";
import { Logger } from "shared/Utility/Logger";
import { SkillDefinitions } from "shared/_References/Skills";
import { CreateAnimationTrack, AnimationIds } from "shared/_References/Animations";

@SkillDecorator
export class BasicRanged extends Skill {
	private _skillDefinition = SkillDefinitions.BasicRanged;
	private _damageContainer = this.CreateDamageContainer(this._skillDefinition.baseDamage ?? 10);
	private _animationTrack: AnimationTrack | undefined;

	protected OnConstructServer(): void {
		const characterModel = this.Character.Instance as Model;

		// Create Animation Track
		const animationId =  AnimationIds.SKILL_BasicRanged;
		this._animationTrack = CreateAnimationTrack(characterModel, animationId as AnimationIds);

		assert(this._animationTrack, "Animation Track is nil");
	}

	protected OnStartClient(): void {
		Logger.Log(script, "Client Started: ", this._skillDefinition.displayName);
	}

	protected OnStartServer(): void {
		Logger.Log(script, "Server Started: ", this._skillDefinition as unknown as string);

		this._animationTrack?.Play();
	}

	protected OnEndServer(): void {}
}
