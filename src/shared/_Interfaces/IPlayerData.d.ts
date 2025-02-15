import ICharacterStats from "shared/_Interfaces/ICharacterStats";
import IPlayerSkillsData from "./IPlayerSkillsData";
import IProgressionStats from "./IProgressionStats";

export default interface IPlayerData {
	[str: string]: unknown;

	// Datastore Info
	key: string;
	version: number;

	// Character Info
	CharacterName: string;

	// Progression Stats
	ProgressionStats: IProgressionStats;
	// Character Stats
	CharacterStats: ICharacterStats;

	// Skills Data
	Skills: IPlayerSkillsData;
}
