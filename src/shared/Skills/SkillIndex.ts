/* Skill Index: Master Index for all Skill System related exports */
// Types
import { SkillType, SkillId, SkillResource, Skill_Assignment_Button, TSkillGrid } from "./Interfaces/SkillTypes";

// Interfaces
import { SkillDefinition, PlayerSkillsData, SkillData } from "./Interfaces/SkillInterfaces";

// Classes
import { SkillGrid } from "../UI Component Classes/SkillGrid/SkillGrid";

// Data
import { SkillDefinitions } from "./Data/SkillDefinitions";

// Functions
import {
	getSkillDefinition,
	getAssignedSkillDefinitions,
	getDefaultPlayerSkillsData,
	getSkillNameFromSlotNumber,
	assignSkillToSlot,
	unlockSkill,
	unassignSlot,
} from "./Interfaces/SkillUtility";

export {
	// Types
	SkillId,
	SkillType,
	SkillData,
	Skill_Assignment_Button,
	SkillResource,
	SkillDefinition,
	TSkillGrid,
	PlayerSkillsData,

	// Data
	SkillDefinitions,

	// Classes
	SkillGrid,

	// Functions
	getSkillDefinition,
	getAssignedSkillDefinitions,
	getDefaultPlayerSkillsData,
	getSkillNameFromSlotNumber,
	assignSkillToSlot,
	unlockSkill,
	unassignSlot,
};
