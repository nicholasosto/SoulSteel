import { SkillId } from "shared/_IDs/IDs_Skill";
import { GetRegisteredSkillConstructor, Character, Skill } from "@rbxts/wcs";
import { ISkillDefinition } from "shared/_Interfaces/ISkillDefinition";
import { PlayerSkillsData } from "shared/_Interfaces/IPlayerData";
import { SkillDefinitions } from "../_Definitions/SkillDefinitions";

function getSkillDefinitionMap(): Map<SkillId, ISkillDefinition> {
	const skillDefinitionMap = new Map<SkillId, ISkillDefinition>();
	skillDefinitionMap.set("BasicHold", SkillDefinitions.BasicHold);
	skillDefinitionMap.set("BasicMelee", SkillDefinitions.BasicMelee);
	skillDefinitionMap.set("BasicRanged", SkillDefinitions.BasicRanged);
	// ... add additional skills here

	return skillDefinitionMap;
}

// Get Skill Definition
function getSkillDefinition(skillId: SkillId): ISkillDefinition {
	const skillDefinition = SkillDefinitions[skillId];
	if (skillDefinition === undefined) {
		throw `SkillDefinition not found for skillId: ${skillId}`;
	}
	return skillDefinition;
}

// Get Default Player Skills Data
function getDefaultPlayerSkillsData(): PlayerSkillsData {
	const defaultPlayerSkillsData: PlayerSkillsData = {
		unlockedSkills: ["BasicMelee", "BasicRanged", "BasicHold"],
		assignedSlots: ["BasicMelee", "BasicRanged", undefined, undefined, undefined],
	};
	return defaultPlayerSkillsData;
}

/* Create Skill From Id */
function CreateSkillFromId(skillId: SkillId, wcsCharacter: Character) {
	// Get the Skill Constructor
	const skillConstructor = GetRegisteredSkillConstructor(skillId);
	assert(skillConstructor, "Skill Constructor is nil");

	// Create the Skill
	const newSkill = new skillConstructor(wcsCharacter) as Skill;
	assert(newSkill, "New Skill is nil");

	// Return the Skill
	return newSkill;
}

export { getSkillDefinitionMap, getSkillDefinition, getDefaultPlayerSkillsData, CreateSkillFromId };
