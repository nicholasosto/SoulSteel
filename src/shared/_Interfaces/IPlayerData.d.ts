import { ICharacterStats } from "shared/_Interfaces/ICharacterStats";
import { IPlayerSkillsData } from "./IPlayerSkillsData";
import { SkillId } from "shared/_IDs/IDs_Skill";

interface IPlayerData {
	[str: string]: unknown;

	// Datastore Info
	key: string;
	version: number;

	// Character Info
	CharacterName: string;

	// Progression Stats
	ProgressionStats: {
		Level: number;
		Experience: number;
		ExperienceToNextLevel: number;
	};

	// Character Stats
	CharacterStats: ICharacterStats;

	// Skills Data
	Skills: IPlayerSkillsData;
}


export { IPlayerSkillsData, IPlayerData };
