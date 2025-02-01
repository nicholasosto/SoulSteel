import { SkillId } from "shared/Skills/Interfaces/SkillTypes";
import { Skill, GetRegisteredSkillConstructor, Character } from "@rbxts/wcs";

// Create Skill from SkillId
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

export { CreateSkillFromId };
