import { SkillId } from "shared/_IDs/IDs_Skill";
import { GetRegisteredSkillConstructor, Character, Skill } from "@rbxts/wcs";
import IPlayerSkillsData from "shared/_Interfaces/Player Data/IPlayerSkillsData";

// Get Default Player Skills Data
function getDefaultPlayerSkillsData(): IPlayerSkillsData {
	const defaultPlayerSkillsData: IPlayerSkillsData = {
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

export { getDefaultPlayerSkillsData, CreateSkillFromId };
