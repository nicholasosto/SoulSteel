// GameCharacter.ts: Game Character Classes
// BaseGameCharacter: Base Class for Game Characters
// PlayerGameCharacter: Player Character
import { Logger } from "shared/Utility/Logger";
import { Character } from "@rbxts/wcs";
import { CharacterResource } from "./CharacterResource";

import { CharacterStats } from "shared/_References/CharacterStats";
import CharacterAnimator from "server/Character/CharacterAnimator";
import { generateCharacterName } from "shared/Factories/NameFactory";
import { ResourceId } from "shared/_References/Resources";

const EntityMap = new Map<Character, BaseCharacter>();

function CreateBaseCharacter(wcsCharacter: Character) {
	EntityMap.set(wcsCharacter, new BaseCharacter(wcsCharacter));
	return new BaseCharacter(wcsCharacter);
}

function GetBaseCharacter(wcsCharacter: Character) {
	const character = EntityMap.get(wcsCharacter);
	assert(character, "Character is nil");
	return character;
}

function DestroyBaseCharacter(wcsCharacter: Character) {
	const character = EntityMap.get(wcsCharacter);
	assert(character, "Character is nil");
	character.Destroy();
	EntityMap.delete(wcsCharacter);
}

export default class BaseCharacter {
	protected characterName: string;
	protected wcsCharacter: Character;
	protected _animator: CharacterAnimator;

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

	protected _createCharacterResource(resourceType: ResourceId) {
		return new CharacterResource(resourceType);
	}

	// Destroy
	public Destroy() {
		Logger.Log(script, "Destroy");
	}
}

export { CreateBaseCharacter, GetBaseCharacter, DestroyBaseCharacter };
