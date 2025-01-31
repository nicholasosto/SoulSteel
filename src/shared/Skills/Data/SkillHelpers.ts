import { SkillId } from "shared/Skills/Interfaces/SkillTypes";
import { SkillDefinition, PlayerSkillsData } from "shared/Skills/Interfaces/SkillInterfaces";
import { SkillDefinitions } from "./SkillDefinitions";

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

export { getSkillDefinitionMap, getSkillDefinition, getDefaultPlayerSkillsData };
