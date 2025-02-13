import { GameCharacterModel } from "shared/_Types/GameCharacterModel";
import { CreateAnimationMap } from "shared/_Functions/AnimationFunctions";
import Logger from "shared/Utility/Logger";
import { UnknownSkill } from "@rbxts/wcs";
import { SkillId } from "shared/_Types/SkillTypes";

export default class AnimationManager {
	private _gameCharacter: GameCharacterModel;
	private _animationMap: Map<SkillId, AnimationTrack>;

	/*Constructor*/
	constructor(gameCharacter: GameCharacterModel, skillList: SkillId[]) {
		/* Get the game character */
		this._gameCharacter = gameCharacter;

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

	/* Stop All Animations */
	private _StopAllAnimations() {
		this._animationMap.forEach((animationTrack) => {
			animationTrack.Stop();
		});
	}
}
