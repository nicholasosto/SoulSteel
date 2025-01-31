import { IPlayerData } from "shared/_References/PlayerData";
import { getDefaultPlayerSkillsData } from "shared/Skills/Data/SkillHelpers";
import { getDefaultProgressionStatsData } from "shared/_References/ProgressionStats";

// Equipment Slot
export type TEquipmentSlot = {
	SlotId: string;
	EquipmentId: string;
};

export const DataTemplate: IPlayerData = {
	key: "Datatemplate",
	version: 6,

	// Character Name
	CharacterName: "Default Name",

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
	// Progression Stats
	ProgressionStats: getDefaultProgressionStatsData(),
	// Skills Data
	Skills: getDefaultPlayerSkillsData(),
};
