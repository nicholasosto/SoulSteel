import { ICharacterStats } from "shared/_Types/GameCharacterShared";
import { SkillId } from "shared/_Types/SkillTypes";

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
	Skills: PlayerSkillsData;
}
// Player Skills Data
interface PlayerSkillsData {
	/**
	 * All the skill IDs that this player has unlocked.
	 * Could be an array or a Set-like structure.
	 */
	unlockedSkills: SkillId[];

	/**
	 * Which skill is assigned to each of the 5 slots in the action bar.
	 * If a slot isn’t assigned, store `undefined`.
	 */
	assignedSlots: Array<SkillId | undefined>;
}

export { PlayerSkillsData, IPlayerData };
