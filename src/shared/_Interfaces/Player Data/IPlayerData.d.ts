import ICharacterStats from "shared/_Interfaces/Player Data/ICharacterStats";
import IPlayerSkillsData from "./IPlayerSkillsData";
import IProgressionStats from "./IProgressionStats";
import ICharacterIdentity from "./ICharacterIdentity";

/* Quest Data */
interface IQuestData {
	completedQuests: string[];
	activeQuests: string[];
}

export default interface IPlayerData {
	[str: string]: unknown;

	// Datastore Info
	key: string;
	version: number;

	// Character Info
	/* { CharacterId, CharacterName } */
	CharacterIdentity: ICharacterIdentity;

	/* Progression Data */
	/* { Level, Experience, ExperienceToNextLevel } */
	ProgressionStats: IProgressionStats;

	/* Stats Data */
	/* { Strength, Speed, Dexterity, Intelligence, Constitution } */
	CharacterStats: ICharacterStats;

	/* Quest Data */
	/* { compltedQuests, activeQuests } */
	QuestData: IQuestData;

	/* Skills Data */
	/* { unlockedSkills, assignedSlots } */
	Skills: IPlayerSkillsData;
}
