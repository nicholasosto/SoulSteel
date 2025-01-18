// GameCharacter.ts: Game Character Classes
// BaseGameCharacter: Base Class for Game Characters
// PlayerGameCharacter: Player Character
import { Players, RunService } from "@rbxts/services";
import { Character, DamageContainer, GetRegisteredSkillConstructor, UnknownSkill, UnknownStatus } from "@rbxts/wcs";
import { CharacterResource, EResourceBarNames, EResourceTypes, GetResourceBarFrameByName } from "./CharacterResource";

import { CharacterStats, getDefaultCharacterStats } from "shared/_References/CharacterStats";
import { CharacterState } from "shared/_References/CharacterStates";
import { EAnimationID } from "shared/Animation/AnimationIndex";
import CharacterAnimator from "server/Character/CharacterAnimator";
import { generateCharacterName } from "shared/Factories/NameFactory";
import Remotes, { RemoteNames } from "shared/Remotes";

// Data
import { DataCache, DataManager } from "server/PlayerData/DataManager";

// Utility Imports
import { Logger } from "shared/Utility/Logger";
import {
	PlayerSkillsData,
	SkillId,
	SkillResource,
	assignSkillToSlot,
	getDefaultPlayerSkillsData,
	getSkillDefinition,
} from "shared/Skills/SkillIndex";

export default class BaseCharacter {
	protected characterName: string;
	protected wcsCharacter: Character;
	protected _animator: CharacterAnimator;
	protected _assignedSkills: Map<number, SkillId> = new Map();

    // Possible Resource Types for NPC and Player Characters
	protected _characterStats?: CharacterStats;
	protected _HealthResource?: CharacterResource;
	protected _ManaResource?: CharacterResource;
	protected _EnergyResource?: CharacterResource;

	constructor(wcsCharacter: Character) {
		this.characterName = generateCharacterName();
		this.wcsCharacter = wcsCharacter;
		this._animator = new CharacterAnimator(this.wcsCharacter.Instance as Model);
		assert(this._animator, "WCS Character/Animator is nil");
		Logger.Log(script, "Character Created: ", this.characterName);
	}

	// Skill Assignment
	protected _addSkillToSlot(slot: number, skillId: SkillId) {
		Logger.Log(script, "Adding Skill to Slot: ", slot, skillId);
		this._assignedSkills.set(slot, skillId);
	}

	protected _removeSkillFromSlot(slot: number) {
		this._assignedSkills.delete(slot);
	}

    protected _createCharacterResource(resourceType: EResourceTypes) {
        return new CharacterResource(EResourceTypes.Health);
    }

	// Destroy
	public Destroy() {
		Logger.Log(script, "Destroying Character: ", this.characterName);
	}
}
