import { BasicHold, BasicMelee, BasicRanged } from "shared/Skills/WCSSkills/SkillIndex";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";
import { Character } from "@rbxts/wcs";

function CreateBasicRangedSkill(wcsCharacter: Character) {
	return new BasicRanged(wcsCharacter);
}

function CreateBasicMeleeSkill(wcsCharacter: Character) {
	return new BasicMelee(wcsCharacter);
}

function CreateBasicHoldSkill(wcsCharacter: Character) {
	return new BasicHold(wcsCharacter);
}

export function CreateSkillFromId(skillId: SkillId, wcsCharacter: Character) {
	switch (skillId) {
		case "BasicHold":
			return CreateBasicHoldSkill(wcsCharacter);
			break;
		case "BasicRanged":
			return CreateBasicRangedSkill(wcsCharacter);
			break;
		case "BasicMelee":
			return CreateBasicMeleeSkill(wcsCharacter);
			break;
		default:
			return undefined;
	}
}
