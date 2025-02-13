import { SkillId } from "shared/_Types/SkillTypes";
import { GetRegisteredSkillConstructor, Character, Skill } from "@rbxts/wcs";
import { SkillDefinition, PlayerSkillsData } from "shared/_Interfaces/SkillInterfaces";
import { SkillDefinitions } from "../_Definitions/SkillDefinitions";

function getSkillDefinitionMap(): Map<SkillId, SkillDefinition> {
	const skillDefinitionMap = new Map<SkillId, SkillDefinition>();
	skillDefinitionMap.set("BasicHold", SkillDefinitions.BasicHold);
	skillDefinitionMap.set("BasicMelee", SkillDefinitions.BasicMelee);
	skillDefinitionMap.set("BasicRanged", SkillDefinitions.BasicRanged);
	skillDefinitionMap.set("SpiritOrb", SkillDefinitions.SpiritOrb);
	skillDefinitionMap.set("Teleport", SkillDefinitions.Teleport);
	skillDefinitionMap.set("Dash", SkillDefinitions.Dash);
	skillDefinitionMap.set("MultiJump", SkillDefinitions.MultiJump);
	skillDefinitionMap.set("Fly", SkillDefinitions.Fly);
	skillDefinitionMap.set("Meditate", SkillDefinitions.Meditate);
	skillDefinitionMap.set("Charge", SkillDefinitions.Charge);
	skillDefinitionMap.set("None", SkillDefinitions.None);
	// ... add additional skills here

	return skillDefinitionMap;
}

// Get Skill Definition
function getSkillDefinition(skillId: SkillId): SkillDefinition {
	const skillDefinition = SkillDefinitions[skillId];
	if (!skillDefinition) {
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
