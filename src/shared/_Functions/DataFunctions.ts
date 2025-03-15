import IPlayerData from "shared/_Interfaces/Player Data/IPlayerData";
import { SkillId } from "shared/_IDs/SkillIndex";

// Player Data Interface
function GetSkillSlotMap(playerData: IPlayerData): Map<number, string> {
	const equippedSkills = playerData["Skills"]["assignedSlots"] as SkillId[];
	assert(equippedSkills !== undefined, "Equipped Skills is nil");
	const skillMap = new Map<number, SkillId>();

	let index = 1;
	equippedSkills.forEach((skillId) => {
		skillMap.set(index, skillId);
		index++;
	});

	return skillMap;
}


export { GetSkillSlotMap };
