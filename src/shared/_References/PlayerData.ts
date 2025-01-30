import { PlayerSkillsData } from "shared/Skills/Interfaces/SkillInterfaces";
import { CharacterStats } from "shared/Character Resources/CharacterResourceTypes";
import { ProgressionStatsData } from "./ProgressionStats";

// Player Data Interface
export interface IPlayerData {
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
