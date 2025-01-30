import Net, { Definitions } from "@rbxts/net";
import { InventoryItem, InventoryType, ItemId } from "../_References/Inventory";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";
import { PlayerSkillsData, SkillData } from "shared/Skills/Interfaces/SkillInterfaces";
import { Character, Skill } from "@rbxts/wcs";

export enum RemoteNames {
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
	LoadPlayerSkills = "SkillAssignment",
	RequestPlayerSkills = "RequestPlayerSkills",
	UnlockSkill = "UnlockSkill",
	AssignSkillSlot = "AssignSkillSlot",
	UnAssignSkillSlot = "UnAssignSkillSlot",
	AssignSkillResponse = "AssignSkillResponse",

	// User Interface
	UIUpdateCharacterFrame = "UIUpdateCharacterFrame",
	UIUpdateSkillBar = "UIUpdateSkillBar",
	UIUpdateInventory = "UIUpdateInventory",
	UINotifyPlayer = "UINotifyPlayer",
}

const Remotes = Net.Definitions.Create({
	// Player
	Player: Definitions.Namespace({
		// Level Up
		[RemoteNames.PlayerLevelUp]: Net.Definitions.ServerToClientEvent<[level: number]>(),
		// Experience Update
		[RemoteNames.PlayerInfoUpdate]:
			Net.Definitions.ServerToClientEvent<[name: string, level: number, profilePicId: string]>(),
		// Resource Update
		[RemoteNames.PlayerResourceUpdate]:
			Net.Definitions.ServerToClientEvent<[resourceId: string, current: number, max: number]>(),
		// Stat Update
		[RemoteNames.PlayerStatUpdate]: Net.Definitions.ServerToClientEvent<[statId: string, value: number]>(),
	}),

	// Player Character
	PlayerCharacter: Definitions.Namespace({
		// Created
		[RemoteNames.PlayerCharacterCreated]: Net.Definitions.ServerToClientEvent(),
		// Destroyed
		[RemoteNames.PlayerCharacterDestroyed]: Net.Definitions.ServerToClientEvent(),
	}),

	// Inventory
	Inventory: Definitions.Namespace({
		[RemoteNames.GetInventory]:
			Net.Definitions.ServerToClientEvent<[inventory: Map<InventoryType, InventoryItem>]>(),
		[RemoteNames.RequestInventory]: Net.Definitions.ClientToServerEvent(),
	}),

	// Equipment
	Equipment: Definitions.Namespace({
		[RemoteNames.EquipItemRequest]: Net.Definitions.ClientToServerEvent<[itemId: ItemId]>(),
	}),

	// Skills
	Skills: Definitions.Namespace({
		[RemoteNames.LoadPlayerSkills]: Net.Definitions.ServerToClientEvent<[skillData: PlayerSkillsData]>(),
		[RemoteNames.RequestPlayerSkills]: Net.Definitions.ClientToServerEvent(),
		[RemoteNames.UnlockSkill]: Net.Definitions.ClientToServerEvent<[skillId: string]>(),
		[RemoteNames.AssignSkillSlot]: Net.Definitions.ClientToServerEvent<[slotIndex: number, skillId: SkillId]>(),
		[RemoteNames.UnAssignSkillSlot]: Net.Definitions.ClientToServerEvent<[slotIndex: number]>(),
		[RemoteNames.AssignSkillResponse]: Net.Definitions.ServerToClientEvent<[slot: number, skill: Skill]>(),
	}),

	// User Interface
	UserInterface: Definitions.Namespace({
		[RemoteNames.UIUpdateSkillBar]: Net.Definitions.ServerToClientEvent(),
		[RemoteNames.UIUpdateInventory]: Net.Definitions.ServerToClientEvent(),
		[RemoteNames.UINotifyPlayer]: Net.Definitions.ServerToClientEvent(),
	}),
});

export default Remotes;
