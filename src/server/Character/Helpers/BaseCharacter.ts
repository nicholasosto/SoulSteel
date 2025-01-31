// GameCharacter.ts: Game Character Classes
// BaseGameCharacter: Base Class for Game Characters
// PlayerGameCharacter: Player Character
import Logger from "shared/Utility/Logger";
import { Character, Skill, GetRegisteredSkillConstructor } from "@rbxts/wcs";
import CharacterAnimator from "server/Character/Helpers/CharacterAnimator";
import { generateCharacterName } from "shared/Factories/NameFactory";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";

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
	protected _skillMap = new Map<SkillId, Skill>();

	constructor(wcsCharacter: Character) {
		this.characterName = generateCharacterName();
		this.wcsCharacter = wcsCharacter;
		this._animator = new CharacterAnimator(this.wcsCharacter.Instance as Model);
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

	// Destroy
	public Destroy() {
		Logger.Log(script, "Destroy");
	}
}

export { CreateBaseCharacter, GetBaseCharacter, DestroyBaseCharacter };
