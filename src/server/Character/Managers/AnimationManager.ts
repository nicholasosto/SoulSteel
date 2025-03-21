
import Logger from "shared/Utility/Logger";
/* Types */
import { TGameCharacter } from "shared/_Types/TGameCharacter";

/* Interfaces */
import IAnimationManager from "shared/_Interfaces/Character Managers/IAnimationManager";
import IPlayerCharacter from "shared/_Interfaces/IPlayerCharacter";
import IPlayerData from "shared/_Interfaces/Player Data/IPlayerData";

import { CreateAnimationMap } from "shared/_Functions/AnimationFunctions";

import { UnknownSkill } from "@rbxts/wcs";
import { SkillId } from "shared/_IDs/SkillIndex";



/* Animation Manager */
export default class AnimationManager implements IAnimationManager {
	private _playerCharacter: IPlayerCharacter;
	private _gameCharacter: TGameCharacter;
	private _animationMap: Map<SkillId, AnimationTrack>;

	/*Constructor*/
	constructor(playerCharacter: IPlayerCharacter, playerData: IPlayerData) {
		/* Get the game character */
		this._playerCharacter = playerCharacter;
		this._gameCharacter = playerCharacter.gameCharacterModel;
		const skillList = playerCharacter.dataManager.GetData().Skills.unlockedSkills;

		/* Create the animation map */
		this._animationMap = CreateAnimationMap(this._gameCharacter, skillList) as Map<SkillId, AnimationTrack>;
	}

	/* On Skill Started */
	public OnSkillStarted(skill: UnknownSkill): void {
		Logger.Log("Animation Map", this._animationMap as unknown as string);
		/* Stop Other Animations */
		this._StopAllAnimations();

		/* Get Skill Id */
		const skillId = skill.GetName() as SkillId;

		/* Get Base Walk Speed  to reset after setting to 0*/
		//const baseWalkSpeed = this._playerCharacter.humanoid.WalkSpeed;

		/* Get Animation Track */
		const animationTrack = this._animationMap.get(skillId);
		animationTrack?.Ended.Connect(() => {
			//this._playerCharacter.humanoid.WalkSpeed = baseWalkSpeed;
		});

		/* Play Animation */
		if (animationTrack) {
			//this._playerCharacter.humanoid.WalkSpeed = 0;
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
