import Net, { Definitions } from "@rbxts/net";
import { InventoryItem, InventoryType, ItemId } from "../_References/Inventory";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";
import { PlayerSkillsData } from "shared/Skills/Interfaces/SkillInterfaces";
import { ResourceId } from "shared/_References/Resources";

interface Payloads {
	PlayerLevelUp: [level: number];
	PlayerInfoUpdate: [name: string, level: number, profilePicId: string];
	PlayerResourceUpdate: [resourceId: ResourceId, current: number, max: number];
}

enum SignalNames {
	// Player
	PlayerLevelUp = "PlayerLevelUp",
	PlayerResourceUpdate = "PlayerResourceUpdate",
	PlayerInfoUpdate = "PlayerInfoUpdate",

	// Player Character
	PlayerCharacterCreated = "PlayerCharacterCreated",
	PlayerCharacterDestroyed = "PlayerCharacterDestroyed",
	PlayerCharacterTargetSelected = "TargetSelected",

	// Inventory
	GetInventory = "GetInventory",
	RequestInventory = "RequestInventory",

	// Equipment
	EquipItemRequest = "EquipItemRequest",

	// Skills
	//crfGetUnlockedSkills = "crfGetUnlockedSkills",

	SkillBarCreated = "SkillBarCreated", // Notifies the server that the skill bar has been created
	SendSkillAssignment = "SendSkillAssignment", // Sends skill assignment data to the client

	//LoadPlayerSkills = "SkillAssignment",
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
	UpdatePlayerStat = "UpdatePlayerStat",
	GetPlayerInventory = "GetPlayerInventory",
	GetUnlockedSkills = "GetUnlockedSkills",
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
		// Target Selected
		[SignalNames.PlayerCharacterTargetSelected]: Net.Definitions.ClientToServerEvent<[targetId: string]>(),
	}),
	// Skills
	Skills: Definitions.Namespace({
		[SignalNames.SendSkillAssignment]: Net.Definitions.ServerToClientEvent<[skillSlotMap: Map<number, SkillId>]>(),
		[SignalNames.SkillBarCreated]: Net.Definitions.ClientToServerEvent<[]>(),

		//[SignalNames.RequestPlayerSkills]: Net.Definitions.ClientToServerEvent(),
		[SignalNames.UnlockSkill]: Net.Definitions.ClientToServerEvent<[skillId: string]>(),

		// Assign and Unassign Skill Slot
		[SignalNames.AssignSkillSlot]: Net.Definitions.ClientToServerEvent<[slotIndex: number, skillId: SkillId]>(),
		[SignalNames.UnAssignSkillSlot]: Net.Definitions.ClientToServerEvent<[slotIndex: number]>(),
		[SignalNames.AssignSkillResponse]: Net.Definitions.ServerToClientEvent<[slot: number, skill: SkillId]>(),
	}),

	SkillRemotes: Definitions.Namespace({
		[RemoteNames.GetUnlockedSkills]: Net.Definitions.ServerAsyncFunction<() => SkillId[] | undefined>(),
	}),

	// User Interface
	UserInterface: Definitions.Namespace({
		[SignalNames.UIUpdateInventory]: Net.Definitions.ServerToClientEvent(),
		[SignalNames.UINotifyPlayer]: Net.Definitions.ServerToClientEvent(),
	}),
});

export default Remotes;

export { SignalNames, RemoteNames };
