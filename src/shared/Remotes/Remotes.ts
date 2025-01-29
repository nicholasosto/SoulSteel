import Net, { Definitions } from "@rbxts/net";
import { InventoryItem, InventoryType, ItemId } from "../_References/Inventory";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";
import { PlayerSkillsData, SkillData } from "shared/Skills/Interfaces/SkillInterfaces";
import { Character, Skill } from "@rbxts/wcs";

export enum RemoteNames {
	// Inventory
	GetInventory = "GetInventory",
	RequestInventory = "RequestInventory",

	// Equipment
	EquipItemRequest = "EquipItemRequest",

	// Game Character
	PlayerCharacterCreated = "PlayerCharacterCreated",
	PlayerCharacterDestroyed = "PlayerCharacterDestroyed",

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
	UICharacterResourceUpdate = "UICharacterResourceUpdate",
	UIUpdateInventory = "UIUpdateInventory",
	UINotifyPlayer = "UINotifyPlayer",
}

export type CharacterFrameData = {
	CharacterName: string;
	Level: number;
	Experience: {
		Current: number;
		Max: number;
	};
	Health: {
		Current: number;
		Max: number;
	};
	Mana: {
		Current: number;
		Max: number;
	};
	Stamina: {
		Current: number;
		Max: number;
	};
};
const Remotes = Net.Definitions.Create({
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

	// Game Character
	PlayerCharacter: Definitions.Namespace({
		// Created/Destroyed
		[RemoteNames.PlayerCharacterCreated]: Net.Definitions.ServerToClientEvent(),
		[RemoteNames.PlayerCharacterDestroyed]: Net.Definitions.ServerToClientEvent(),
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
		[RemoteNames.UIUpdateCharacterFrame]: Net.Definitions.ServerToClientEvent<[CharacterFrameData]>(),
		[RemoteNames.UIUpdateSkillBar]: Net.Definitions.ServerToClientEvent(),
		[RemoteNames.UIUpdateInventory]: Net.Definitions.ServerToClientEvent(),
		[RemoteNames.UINotifyPlayer]: Net.Definitions.ServerToClientEvent(),
		[RemoteNames.UICharacterResourceUpdate]: Net.Definitions.ServerAsyncFunction<(resourceId: string) => unknown>(),
	}),
});

export default Remotes;
