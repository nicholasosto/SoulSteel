import Net, { Definitions } from "@rbxts/net";
import { InventoryItem, InventoryType, ItemId } from "./_References/Inventory";
import { PlayerSkillsData } from "shared/Skills/SkillIndex";
import { Character } from "@rbxts/wcs";

export enum RemoteNames {
	// Inventory
	GetInventory = "GetInventory",
	RequestInventory = "RequestInventory",

	// Equipment
	EquipItemRequest = "EquipItemRequest",

	// Game Character
	GameCharacterCreated = "GameCharacterCreated",
	GameCharacterDestroyed = "GameCharacterDestroyed",

	// Skills
	LoadPlayerSkills = "SkillAssignment",
	UnlockSkill = "UnlockSkill",
	AssignSkillSlot = "AssignSkillSlot",

	// User Interface
	UIUpdateCharacterFrame = "UIUpdateCharacterFrame",
	UIUpdateSkillBar = "UIUpdateSkillBar",
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
	GameCharacter: Definitions.Namespace({
		// Created/Destroyed
		[RemoteNames.GameCharacterCreated]: Net.Definitions.ServerToClientEvent(),
		[RemoteNames.GameCharacterDestroyed]: Net.Definitions.ServerToClientEvent(),
	}),

	// Skills
	Skills: Definitions.Namespace({
		[RemoteNames.LoadPlayerSkills]: Net.Definitions.ServerToClientEvent<[skillData: PlayerSkillsData]>(),
		[RemoteNames.UnlockSkill]: Net.Definitions.ClientToServerEvent<[skillId: string]>(),
		[RemoteNames.AssignSkillSlot]: Net.Definitions.ClientToServerEvent<[slotIndex: number, skillId: string]>(),
	}),

	// User Interface
	UserInterface: Definitions.Namespace({
		[RemoteNames.UIUpdateCharacterFrame]: Net.Definitions.ServerToClientEvent<[CharacterFrameData]>(),
		[RemoteNames.UIUpdateSkillBar]: Net.Definitions.ServerToClientEvent(),
		[RemoteNames.UIUpdateInventory]: Net.Definitions.ServerToClientEvent(),
		[RemoteNames.UINotifyPlayer]: Net.Definitions.ServerToClientEvent(),
	}),
});

export default Remotes;
