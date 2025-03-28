/**
 * PlayerDataTemplate defines the initial structure and default values for player data.
 *
 * Data Categories:
 * - ProgressionData: Tracks player level and experience.
 * - RaceData: Defines player's selected race/type.
 * - TalentData: Manages available talent points and unlocked talents.
 * - AssignmentData: Stores assignments of skills, armor, summons, and consumables to slots.
 * - Inventory: Keeps track of consumables (with counts), equipment, and familiars owned by the player.
 * - Attributes: Core player stats influencing gameplay mechanics.
 * - Quests: Tracks active quests (with progress) and completed quests.
 * - Currency: Stores different in-game currencies.
 * - Passes: Contains identifiers for owned game passes.
 * - Metadata: Contains metadata such as login/logout timestamps, playtime, location, and template version for migrations.
 *
 * The 'version' field in Metadata helps reconcile data changes and migrations safely.
 */

export const PlayerDataTemplate = {
	CharacterData: [
		{
			displayName: "Player Name",
			characterId: "characterId1",

			ProgressionData: {
				level: 1,
				experience: 0,
				experienceToNextLevel: 100,
			},
			RaceData: {
				type: "Human" as "Synthetic" | "Rizen" | "Harvestor" | "Human",
			},
			TalentData: {
				talentPoints: 0,
				unlockedTalents: [] as string[],
			},
			AssignmentData: {
				skills: {
					skillSlotId1: "skillId1",
					skillSlotId2: "skillId2",
					// Add more skill slots as needed
				} as Record<string, string>, // skillSlotId -> skillId
				armor: {
					armorSlotId1: "armorId1",
					armorSlotId2: "armorId2",
					// Add more armor slots as needed
				} as Record<string, string>, // armorSlotId -> armorId
				summons: [
					"familiarId1",
					"familiarId2",
					// Add more summon IDs as needed
				] as string[],
				consumables: {
					consumableSlotId1: "consumableId1",
					consumableSlotId2: "consumableId2",
					// Add more consumable slots as needed
				} as Record<string, string>, // consumableSlotId -> itemId
			},
			Inventory: {
				consumables: {
					consumableId1: 10,
					consumableId2: 5,
					consumableId3: 20,
				} as Record<string, number>, // itemId -> count
				equipment: [
					"armorId1",
					"armorId2",
					"weaponId1",
					"weaponId2",
					"accessoryId1",
					"accessoryId2",
					// Add more equipment IDs as needed
				] as string[],
				familiars: [
					"familiarId1",
					"familiarId2",
					"familiarId3",
					// Add more familiar IDs as needed
				] as string[],
			},
			Attributes: {
				strength: 10,
				dexterity: 10,
				intelligence: 10,
				vitality: 10,
				agility: 10,
				luck: 10,
			},
			Quests: {
				active: {
					questId1: { progress: 0, goal: 10 },
					questId2: { progress: 5, goal: 20 },
					// Add more active quests as needed
				} as Record<string, { progress: number; goal: number }>,
				completed: [
					"questId1",
					"questId2",
					// Add more completed quest IDs as needed
				] as string[],
			},
			Currency: {
				gold: 0,
				gems: 0,
			},
			Passes: [
				"passId1",
				"passId2",
				// Add more game pass IDs as needed
			] as string[],
			Metadata: {
				lastLogin: os.time(),
				lastLogoutLocation: { x: 0, y: 0, z: 0 },
				totalPlayTime: 0,
				version: 1,
			},
		},
	],
};
