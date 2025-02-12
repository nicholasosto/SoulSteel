import { GameCharacterModel } from "shared/_Types/GameCharacterModel";
import GameCharacter from "../GameCharacter";
import {
	GetAnimator,
	CreateAnimation,
	CreateAnimationTrack,
	CreateAnimationMap,
} from "shared/_Functions/AnimationFunctions";
import { EAnimationID } from "shared/Animation/AnimationIndex";
import Logger from "shared/Utility/Logger";
import { UnknownSkill } from "@rbxts/wcs";
import { SkillId } from "shared/_Types/SkillTypes";

import { TAnimationPackage } from "shared/_Types/TAnimationPackage";

//type AnimationPack 


export default class AnimationManager {
	private _gameCharacter: GameCharacterModel;
	private _animationMap: Map<SkillId, AnimationTrack>;

	/*Constructor*/
	constructor(gameCharacter: GameCharacterModel, skillList: SkillId[]) {
		this._gameCharacter = gameCharacter;
		this._animationMap = CreateAnimationMap(this._gameCharacter, skillList) as Map<SkillId, AnimationTrack>;
		Logger.Log(script, "Constructed", this._animationMap as unknown as string);
	}

	public OnSkillStarted(skill: UnknownSkill): void {
		const skillId = skill.GetName() as SkillId;
		const animationTrack = this._animationMap.get(skillId);
		if (animationTrack === undefined) {
			Logger.Log(script, "Animation Track is nil");
			return;
		}
		animationTrack.Play();
		Logger.Log(script, "Skill Started: ", skill.GetName());
	}

	public OnSkillEnded(skill: UnknownSkill): void {
		const skillId = skill.GetName() as SkillId;
		const animationTrack = this._animationMap.get(skillId);
		if (animationTrack === undefined) {
			Logger.Log(script, "Animation Track is nil");
			return;
		}
		animationTrack.Stop();
		Logger.Log(script, "Skill Ended: ", skill.GetName());
	}
}
