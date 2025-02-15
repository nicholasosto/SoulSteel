import { TGameCharacter } from "shared/_Types/TGameCharacter";
import { CreateAnimationMap } from "shared/_Functions/AnimationFunctions";
import Logger from "shared/Utility/Logger";
import { UnknownSkill } from "@rbxts/wcs";
import { SkillId } from "shared/_IDs/IDs_Skill";
import IAnimationManager from "shared/_Interfaces/IAnimationManager";
import IPlayerCharacter from "shared/_Interfaces/IPlayerCharacter";

export default class AnimationManager implements IAnimationManager {
	private _gameCharacter: TGameCharacter;
	private _animationMap: Map<SkillId, AnimationTrack>;

	/*Constructor*/
	constructor(characterModel: TGameCharacter, skillList: SkillId[]) {
		/* Get the game character */

		this._gameCharacter = characterModel;

		/* Create the animation map */
		this._animationMap = CreateAnimationMap(this._gameCharacter, skillList) as Map<SkillId, AnimationTrack>;
	}

	/* On Skill Started */
	public OnSkillStarted(skill: UnknownSkill): void {
		/* Stop Other Animations */
		this._StopAllAnimations();

		/* Get Skill Id */
		const skillId = skill.GetName() as SkillId;

		/* Get Animation Track */
		const animationTrack = this._animationMap.get(skillId);

		/* Play Animation */
		if (animationTrack) {
			animationTrack.Play();
		} else {
			Logger.Log(script, "Animation Track is nil");
		}
	}

	/* On Skill Ended */
	public OnSkillEnded(skill: UnknownSkill): void {
		/* Get Skill Id */
		Logger.Log(script, "OnSkillEnded");
	}

	/* On Damaged */
	public OnDamageTaken(): void {
		/* Stop Other Animations */
		this._StopAllAnimations();
	}

	/* Stop All Animations */
	private _StopAllAnimations() {
		this._animationMap.forEach((animationTrack) => {
			animationTrack.Stop();
		});
	}

	/* Destroy */
	public Destroy() {
		Logger.Log("[Destroying]", "Animation Manager");
		this._animationMap.forEach((animationTrack) => {
			animationTrack.Destroy();
		});
	}
}
