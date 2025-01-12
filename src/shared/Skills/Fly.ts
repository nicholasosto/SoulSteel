import { Skill, SkillDecorator } from "@rbxts/wcs";
import { SkillDefinitions } from "shared/_References/Skills";
import { CreateAnimationTrack, AnimationIds } from "shared/_References/Animations";
import { Logger } from "shared/Utility/Logger";

@SkillDecorator
export class Fly extends Skill {
	private _skillDefinition = SkillDefinitions.BasicHold;
	private _damageContainer = this.CreateDamageContainer(this._skillDefinition.baseDamage ?? 10);
	private _animationTrack: AnimationTrack | undefined;

	protected OnConstructServer(): void {
		const characterModel = this.Character.Instance as Model;

		// Create Animation Track
		const animationId = AnimationIds.SKILL_BasicHold;
		this._animationTrack = CreateAnimationTrack(characterModel, animationId as AnimationIds);

		assert(this._animationTrack, "Animation Track is nil");
	}

	// 01. CONSTRUCT CLIENT
	public OnConstructClient(): void {
		Logger.Log(script, "- Client");
	}

	// MOVE START
	public OnStartServer() {
		this._animationTrack?.Play();
	}

	// END SERVER
	public OnEndServer() {
		Logger.Log(script, "End Server");
	}
}
