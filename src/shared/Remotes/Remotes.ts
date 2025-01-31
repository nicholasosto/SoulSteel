import Net, { Definitions } from "@rbxts/net";
import { InventoryItem, InventoryType, ItemId } from "../_References/Inventory";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";
import { PlayerSkillsData } from "shared/Skills/Interfaces/SkillInterfaces";
import { Skill } from "@rbxts/wcs";
import { ResourceId } from "shared/_References/Resources";

interface Payloads {
	PlayerLevelUp: [level: number];
	PlayerInfoUpdate: [name: string, level: number, profilePicId: string];
	PlayerResourceUpdate: [resourceId: ResourceId, current: number, max: number];
}

export enum SignalNames {
	// Player
	PlayerLevelUp = "PlayerLevelUp",
	PlayerResourceUpdate = "PlayerResourceUpdate",
	PlayerStatUpdate = "PlayerStatUpdate",
	PlayerInfoUpdate = "PlayerInfoUpdate",

	// Player Character
	PlayerCharacterCreated = "PlayerCharacterCreated",
	PlayerCharacterDestroyed = "PlayerCharacterDestroyed",

	// Inventory
	GetInventory = "GetInventory",
	RequestInventory = "RequestInventory",

	// Equipment
	EquipItemRequest = "EquipItemRequest",

	// Skills
	crfGetUnlockedSkills = "crfGetUnlockedSkills",
	LoadPlayerSkills = "SkillAssignment",
	RequestPlayerSkills = "RequestPlayerSkills",
	UnlockSkill = "UnlockSkill",
	AssignSkillSlot = "AssignSkillSlot",
	UnAssignSkillSlot = "UnAssignSkillSlot",
	AssignSkillResponse = "AssignSkillResponse",

	// User Interface
	UIUpdateInventory = "UIUpdateInventory",
	UINotifyPlayer = "UINotifyPlayer",
}

enum RemoteNames {
	UpdatePlayerStat,
	GetPlayerInventory,
	
	
}

const Remotes = Net.Definitions.Create({
	// Player
	Player: Definitions.Namespace({
		// Level Up
		[SignalNames.PlayerLevelUp]: Net.Definitions.ServerToClientEvent<Payloads["PlayerLevelUp"]>(),
		// Experience Update
		[SignalNames.PlayerInfoUpdate]: Net.Definitions.ServerToClientEvent<Payloads["PlayerInfoUpdate"]>(),
		// Resource Update
		[SignalNames.PlayerResourceUpdate]: Net.Definitions.ServerToClientEvent<Payloads["PlayerResourceUpdate"]>(),
		// Stat Update
		//[RemoteNames.PlayerStatUpdate]: Net.Definitions.ServerToClientEvent<[statId: string, value: number]>(),
	}),

	// Player Character
	PlayerCharacter: Definitions.Namespace({
		// Created
		[SignalNames.PlayerCharacterCreated]: Net.Definitions.ServerToClientEvent(),
		// Destroyed
		[SignalNames.PlayerCharacterDestroyed]: Net.Definitions.ServerToClientEvent(),
	}),

	// Inventory
	Inventory: Definitions.Namespace({
		[SignalNames.GetInventory]:
			Net.Definitions.ServerToClientEvent<[inventory: Map<InventoryType, InventoryItem>]>(),
		[SignalNames.RequestInventory]: Net.Definitions.ClientToServerEvent(),
	}),

	// Equipment
	Equipment: Definitions.Namespace({
		[SignalNames.EquipItemRequest]: Net.Definitions.ClientToServerEvent<[itemId: ItemId]>(),
	}),

	// Skills
	Skills: Definitions.Namespace({
		[SignalNames.crfGetUnlockedSkills]: Net.Definitions.ServerAsyncFunction<() => [SkillId] | undefined>(),
		[SignalNames.LoadPlayerSkills]: Net.Definitions.ServerToClientEvent<[skillData: PlayerSkillsData]>(),
		[SignalNames.RequestPlayerSkills]: Net.Definitions.ClientToServerEvent(),
		[SignalNames.UnlockSkill]: Net.Definitions.ClientToServerEvent<[skillId: string]>(),
		[SignalNames.AssignSkillSlot]: Net.Definitions.ClientToServerEvent<[slotIndex: number, skillId: SkillId]>(),
		[SignalNames.UnAssignSkillSlot]: Net.Definitions.ClientToServerEvent<[slotIndex: number]>(),
		[SignalNames.AssignSkillResponse]: Net.Definitions.ServerToClientEvent<[slot: number, skill: SkillId]>(),
	}),

	// User Interface
	UserInterface: Definitions.Namespace({
		[SignalNames.UIUpdateInventory]: Net.Definitions.ServerToClientEvent(),
		[SignalNames.UINotifyPlayer]: Net.Definitions.ServerToClientEvent(),
	}),
});

export default Remotes;
