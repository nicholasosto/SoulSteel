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
	UIUpdateSkillBar = "UIUpdateSkillBar",
	UIUpdateInventory = "UIUpdateInventory",
	UINotifyPlayer = "UINotifyPlayer",
}

const Remotes = Net.Definitions.Create({
	// Player
	Player: Definitions.Namespace({
		// Level Up
		[RemoteNames.PlayerLevelUp]: Net.Definitions.ServerToClientEvent<Payloads["PlayerLevelUp"]>(),
		// Experience Update
		[RemoteNames.PlayerInfoUpdate]: Net.Definitions.ServerToClientEvent<Payloads["PlayerInfoUpdate"]>(),
		// Resource Update
		[RemoteNames.PlayerResourceUpdate]: Net.Definitions.ServerToClientEvent<Payloads["PlayerResourceUpdate"]>(),
		// Stat Update
		//[RemoteNames.PlayerStatUpdate]: Net.Definitions.ServerToClientEvent<[statId: string, value: number]>(),
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
