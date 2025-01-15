import { PlayerSkillsData,  SkillDefinition } from "./SkillInterfaces";
import { SkillId } from "./SkillTypes";
import { SkillDefinitions } from "../Data/SkillDefinitions";
// Default Player Skills Data
function getDefaultPlayerSkillsData(): PlayerSkillsData {
	return {
		unlockedSkills: ["BasicMelee", "BasicRanged", "BasicHold", "Teleport", "Dash", "Charge", "Fly"],
		assignedSlots: ["BasicMelee", "BasicRanged", "BasicHold", "Charge", "Dash"],
	};
}

// Unlock a skill for the player
function unlockSkill(skillData: PlayerSkillsData, skillId: SkillId): void {
	if (!skillData.unlockedSkills.includes(skillId)) {
		skillData.unlockedSkills.push(skillId);
	}
}

// Assign a skill to a slot
function assignSkillToSlot(skillData: PlayerSkillsData, skillId: SkillId, slotIndex: number): void {
	// Validate slot index
	if (slotIndex < 0 || slotIndex > 4) {
		throw `Slot index must be between 0 and 4 (got ${slotIndex}).`;
	}
	// Ensure the skill is unlocked before assigning
	if (!skillData.unlockedSkills.includes(skillId)) {
		throw `Player has not unlocked the skill: ${skillId}.`;
	}
	// Assign
	skillData.assignedSlots[slotIndex] = skillId;
}

// Unassign a skill from a slot
function unassignSlot(skillData: PlayerSkillsData, slotIndex: number): void {
	if (slotIndex < 0 || slotIndex > 4) {
		throw `Slot index must be between 0 and 4 (got ${slotIndex}).`;
	}
	skillData.assignedSlots[slotIndex] = undefined;
}

// Get the name of the skill in a slot
function getSkillNameFromSlotNumber(skillData: PlayerSkillsData, slotIndex: number): string {
	if (slotIndex < 0 || slotIndex > 4) {
		throw `Slot index must be between 0 and 4 (got ${slotIndex}).`;
	}
	const skillId = skillData.assignedSlots[slotIndex];
	if (!skillId) {
		return "Empty";
	}
	const skillDef = SkillDefinitions[skillId];
	return skillDef.wcsSkillId;
}

// Get the skill definitions for all assigned skills
function getAssignedSkillDefinitions(skillData: PlayerSkillsData): Array<SkillDefinition> {
	const returnArray: Array<SkillDefinition> = [];

	skillData.unlockedSkills.forEach((skillId, index) => {
		const assignedSkillId = skillData.assignedSlots[index];
		if (assignedSkillId) {
			const skillDef = SkillDefinitions[assignedSkillId];
			returnArray.push(skillDef);
		}
	});

	return returnArray;
}

// Get the skill definition for a specific skill ID
function getSkillDefinition(skillId: SkillId): SkillDefinition {
	const skillDef = SkillDefinitions[skillId];
	if (!skillDef) {
		throw `Skill definition not found for skill ID: ${skillId}`;
	}
	return skillDef;
}

export {
	getDefaultPlayerSkillsData,
	unlockSkill,
	assignSkillToSlot,
	unassignSlot,
	getSkillNameFromSlotNumber,
	getAssignedSkillDefinitions,
	getSkillDefinition,
};
