import Net, { Definitions } from "@rbxts/net";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";
import { ResourceId } from "shared/Game Character/Character Resources/Resources";
import SkillBar from "shared/Epic UI/Skill Bar/SkillBar";

/* Payloads */
interface Payloads {
	PlayerLevelUp: [level: number];
	PlayerInfoResponse: [name: string, level: number, profilePicId: string];
	PlayerResourceUpdate: [resourceId: ResourceId, current: number, max: number];
}

/* Signal Names */
enum SignalNames {
	// Game Cycle
	SkillControllerStarted = "SkillControllerStarted",
	CharacterControllerStarted = "CharacterControllerStarted",
	DataManagerStarted = "DataManagerStarted",

	// Developer
	DeveloperRequest = "DeveloperRequest",
	DeveloperResponse = "DeveloperResponse",

	// Teleport
	TeleportRequest = "TeleportRequest",
	TeleportResponse = "TeleportResponse",

	// Player
	PlayerLevelUpResponse = "PlayerLevelUpResponse",
	PlayerResourceResponse = "PlayerResourceResponse",
	PlayerInfoResponse = "PlayerInfoResponse",
	GameCharacterCreatedResponse = "GameCharacterCreatedResponse",
	GameCharacterDestroyedResponse = "PlayerCharacterDestroyed",
	PlayerCharacterTargetSelected = "TargetSelected",
	NotifyPlayerResponse = "UINotifyPlayer",

	/* Skills */
	SkillMapRequest = "SkillMapRequest", // Notifies the server that the skill bar has been created
	SkillMapResponse = "SkillMapResponse", // Sends skill assignment data to the client

	UnlockSkillRequest = "UnlockSkillRequest",
	UnlockSkillResponse = "UnlockSkillResponse",

	SkillSlotAssignmentRequest = "SkillSlotAssignmentRequest",
	SkillSlotAssignmentResponse = "SkillSlotAssignmentResponse",
	UnAssignSkillSlotRequest = "UnAssignSkillSlotRequest",
}

const GameCycleRemotes = Net.Definitions.Create({
	[SignalNames.SkillControllerStarted]: Net.Definitions.BidirectionalEvent(),
	[SignalNames.CharacterControllerStarted]: Net.Definitions.BidirectionalEvent(),
	[SignalNames.DataManagerStarted]: Net.Definitions.BidirectionalEvent(),
});

const BiDirectionalEvents = Net.Definitions.Create({
	SkillBarCreated: Net.Definitions.BidirectionalEvent<[skillBar: SkillBar]>(),
	SkillSlotAssignment: Net.Definitions.BidirectionalEvent<[slot: number, skillId: SkillId]>(),
	UnAssignSkillSlot: Net.Definitions.BidirectionalEvent<[slot: number]>(),
	ModuleToModule: Net.Definitions.BidirectionalEvent<[message: string]>(),
});

/* Remotes */
const Remotes = Net.Definitions.Create({
	// For testing features
	DeveloperRequest: Net.Definitions.ClientToServerEvent<[message: string]>(),
	DeveloperResponse: Net.Definitions.ServerToClientEvent<[message: string]>(),
	ModuleToModule: Net.Definitions.BidirectionalEvent<[message: string]>(),

	// Teleport
	TeleportRequest: Net.Definitions.ClientToServerEvent<[destination: Vector3]>(),
	TeleportResponse: Net.Definitions.ServerToClientEvent<[destination: Vector3]>(),

	// Player Character
	PlayerCharacter: Definitions.Namespace({
		// Level Up
		[SignalNames.PlayerLevelUpResponse]: Net.Definitions.ServerToClientEvent<Payloads["PlayerLevelUp"]>(),
		// Experience Update
		[SignalNames.PlayerInfoResponse]: Net.Definitions.ServerToClientEvent<Payloads["PlayerInfoResponse"]>(),
		// Resource Update
		[SignalNames.PlayerResourceResponse]: Net.Definitions.ServerToClientEvent<Payloads["PlayerResourceUpdate"]>(),
		// Created
		[SignalNames.GameCharacterCreatedResponse]: Net.Definitions.ServerToClientEvent(),
		// Destroyed
		[SignalNames.GameCharacterDestroyedResponse]: Net.Definitions.ServerToClientEvent(),
		// Target Selected
		[SignalNames.PlayerCharacterTargetSelected]: Net.Definitions.ClientToServerEvent<[targetId: string]>(),

		[SignalNames.NotifyPlayerResponse]: Net.Definitions.ServerToClientEvent(),
	}),
	// Skills
	Skills: Definitions.Namespace({
		/* Skill Map */
		[SignalNames.SkillMapRequest]: Net.Definitions.ClientToServerEvent<[]>(),
		[SignalNames.SkillMapResponse]: Net.Definitions.ServerToClientEvent<[skillSlotMap: Map<number, SkillId>]>(),

		/* Unlock Skill */
		[SignalNames.UnlockSkillRequest]: Net.Definitions.ClientToServerEvent<[skillId: SkillId]>(),
		[SignalNames.UnlockSkillResponse]: Net.Definitions.ServerToClientEvent<[skillId: SkillId]>(),

		/* Assign Skill Slot */
		[SignalNames.SkillSlotAssignmentRequest]:
			Net.Definitions.ClientToServerEvent<[slot: number, skillId: SkillId]>(),
		[SignalNames.SkillSlotAssignmentResponse]:
			Net.Definitions.ServerToClientEvent<[slot: number, skillId: SkillId]>(),

		/* Unassign Skill Slot */
		[SignalNames.UnAssignSkillSlotRequest]: Net.Definitions.ClientToServerEvent<[slot: number]>(),
	}),
});

export default Remotes;

export { SignalNames, GameCycleRemotes, BiDirectionalEvents };
