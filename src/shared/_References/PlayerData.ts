import { PlayerSkillsData } from "./Skills";
import { CharacterStats } from "./CharacterStats";
import { ProgressionStatsData } from "./ProgressionStats";
import { ResourceStats } from "./Resources";

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
	// Resource Stats
	ResourceStats: ResourceStats;
	// Skills Data
	Skills: PlayerSkillsData;
}
