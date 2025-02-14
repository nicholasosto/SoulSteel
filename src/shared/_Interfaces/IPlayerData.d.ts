import { ICharacterStats } from "shared/_Interfaces/ICharacterStats";
import { IPlayerSkillsData } from "./IPlayerSkillsData";

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
