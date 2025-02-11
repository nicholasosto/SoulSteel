import { IPlayerData } from "shared/_Functions/DataFunctions";
import { getDefaultPlayerSkillsData } from "shared/_Functions/SkillFunctions";

// Equipment Slot
export type TEquipmentSlot = {
	SlotId: string;
	EquipmentId: string;
};

export const DataTemplate: IPlayerData = {
	/* Datastore Info */
	key: "Datatemplate",
	version: 6,

	/* Character Info */
	CharacterName: "Default Name",

	/* Progression Data */
	ProgressionStats: {
		Level: 1,
		Experience: 0,
		ExperienceToNextLevel: 100,
	},

	// Character Class
	CharacterClass: {
		ClassId: "Vampire",
		ClassLevel: 1,
		ClassPoints: 0,
		ClassExperience: 0,
		ClassExperienceToNextLevel: 100,
	},

	// Character Stats
	CharacterStats: {
		Strength: 14,
		Dexterity: 3,
		Intelligence: 5,
		Constitution: 7,
		Speed: 9,
	},

	// Skills Data
	Skills: getDefaultPlayerSkillsData(),
};
