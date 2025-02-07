import Net, { Definitions } from "@rbxts/net";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";
import { ResourceId } from "shared/_References/Resources";

/* Payloads */
interface Payloads {
	PlayerLevelUp: [level: number];
	PlayerInfoResponse: [name: string, level: number, profilePicId: string];
	PlayerResourceUpdate: [resourceId: ResourceId, current: number, max: number];
}

/* Signal Names */
enum SignalNames {
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

/* Remotes */
const Remotes = Net.Definitions.Create({
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

export { SignalNames };
