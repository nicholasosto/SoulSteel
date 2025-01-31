/*
 * NPCCharacter.ts
 * Extends BaseCharacter
 *
 */

// Custom Imports
import BaseCharacter from "../Helpers/BaseCharacter";
import Logger from "shared/Utility/Logger";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";

// WCS Imports
import { Skill, Character } from "@rbxts/wcs";

export default class NPCCharacter extends BaseCharacter {
	// Private
	private _wcsCharacter: Character;
	private _level: number = 1;

	// Constructor
	constructor(wcsCharacter: Character, level: number = 1) {
		super(wcsCharacter);
		this._wcsCharacter = wcsCharacter;
		Logger.Log(script, "NPC Character Created");
		this.AddSkill("BasicMelee");
	}

	// Add Skill
	public AddSkill(skillId: SkillId) {
		this._createSkill(skillId);
	}

	// Use Skill
	public UseSkill(skillId: SkillId) {
		this._skillMap.get(skillId)?.Start();
	}
}
