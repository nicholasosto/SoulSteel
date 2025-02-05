// GameCharacter.ts: Game Character Classes
// BaseGameCharacter: Base Class for Game Characters
// PlayerGameCharacter: Player Character
import Logger from "shared/Utility/Logger";
import { Character, Skill, GetRegisteredSkillConstructor } from "@rbxts/wcs";
import CharacterAnimator from "server/Helpers/CharacterAnimator";
import { generateCharacterName } from "shared/Factories/NameFactory";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";
import { TGameCharacter } from "shared/Game Character/TGameCharacter";

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
	if (character === undefined) {
		return;
	}
	character.Destroy();
	EntityMap.delete(wcsCharacter);
}

export default class BaseCharacter {
	protected characterName: string;
	protected characterModel?: TGameCharacter;
	protected wcsCharacter: Character;
	protected _animator: CharacterAnimator;
	protected _skillMap = new Map<SkillId, Skill>();

	constructor(wcsCharacter: Character) {
		this.characterName = generateCharacterName();
		this.wcsCharacter = wcsCharacter;
		this.characterModel = this.wcsCharacter.Instance as TGameCharacter;
		this._animator = new CharacterAnimator(this.characterModel);
		assert(this._animator, "WCS Character/Animator is nil");
		Logger.Log(script, "Character Created: ", this.characterName);
	}

	protected _createSkill(skillId: SkillId): Skill | undefined {
		// Check if the skill is already created
		if (this._skillMap.has(skillId)) {
			return;
		}

		// Get the Skill Constructor
		const skillConstructor = GetRegisteredSkillConstructor(skillId);
		assert(skillConstructor, "Skill Constructor is nil");

		// Create the Skill for the character
		const newSkill = new skillConstructor(this.wcsCharacter) as Skill;
		assert(newSkill, "New Skill is nil");

		// Add the skill to the skill map
		this._skillMap.set(skillId, newSkill);
		Logger.Log(script, "Skill Created: ", skillId);
		return newSkill;
	}
	public GetCharacterId() {
		return this.characterName;
	}

	// Destroy
	public Destroy() {
		Logger.Log(script, "Destroy");
	}
}

export { CreateBaseCharacter, GetBaseCharacter, DestroyBaseCharacter };
