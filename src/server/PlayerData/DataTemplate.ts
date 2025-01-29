import { IPlayerData } from "shared/_References/PlayerData";
import { getDefaultPlayerSkillsData } from "shared/Skills/Data/SkillDefinitions";
import { getDefaultCharacterStats } from "shared/_References/CharacterStats";
import { getDefaultProgressionStatsData } from "shared/_References/ProgressionStats";
import { getDefaultResourceStats } from "shared/_References/Resources";

// Equipment Slot
export type TEquipmentSlot = {
	SlotId: string;
	EquipmentId: string;
};

export const DataTemplate: IPlayerData = {
	key: "Datatemplate",
	version: 5,

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
	CharacterStats: getDefaultCharacterStats(),
	// Progression Stats
	ProgressionStats: getDefaultProgressionStatsData(),
	// Resource Stats
	ResourceStats: getDefaultResourceStats(),
	// Skills Data
	Skills: getDefaultPlayerSkillsData(),
};
