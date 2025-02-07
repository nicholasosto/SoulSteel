import { PlayerSkillsData } from "shared/Skills/Interfaces/SkillInterfaces";
import { CharacterStats } from "shared/Game Character/Character Resources/iCharacterResource";
import { ProgressionStatsData } from "./ProgressionStats";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";

// Player Data Interface
interface IPlayerData {
	[str: string]: unknown;

	// Datastore Info
	key: string;
	version: number;

	// Character Info
	CharacterName: string;

	// Progression Stats
	ProgressionStats: ProgressionStatsData;

	// Character Stats
	CharacterStats: CharacterStats;

	// Skills Data
	Skills: PlayerSkillsData;
}

function GetSkillSlotMap(playerData: IPlayerData): Map<number, string> {
	const equippedSkills = playerData.Skills.assignedSlots as SkillId[];
	assert(equippedSkills !== undefined, "Equipped Skills is nil");
	const skillMap = new Map<number, SkillId>();

	let index = 1;
	equippedSkills.forEach((skillId) => {
		skillMap.set(index, skillId);
		index++;
	});

	return skillMap;
}

export { IPlayerData, GetSkillSlotMap };
