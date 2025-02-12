import { GameCharacterModel } from "shared/_Types/GameCharacterModel";
import GameCharacter from "../GameCharacter";
import { GetAnimator, CreateAnimation, CreateAnimationTrack } from "shared/_Functions/AnimationFunctions";
import { EAnimationID } from "shared/Animation/AnimationIndex";
import Logger from "shared/Utility/Logger";
import { Skill, UnknownSkill } from "@rbxts/wcs";

export default class AnimationManager {
	private _gameCharacter: GameCharacterModel;
    private _animationMap: Map<string, AnimationTrack> = new Map<string, AnimationTrack>();

	/*Constructor*/
	constructor(gameCharacter: GameCharacterModel) {
		this._gameCharacter = gameCharacter;
		Logger.Log(script, "Constructed");

		/*Test Animation*/
		const newAnimation = CreateAnimation(EAnimationID.SKILL_BasicMelee);
		const animator = GetAnimator(this._gameCharacter);
		const animationTrack = CreateAnimationTrack(this._gameCharacter, EAnimationID.SKILL_BasicMelee);

		if (animationTrack) {
			animationTrack.Play();
		} else {
			Logger.Log(script, "Animation Track is nil");
		}
	}

	public OnSkillStarted(skill: UnknownSkill): void {
		Logger.Log(script, "Skill Started: ", skill.GetName());
	}

}
