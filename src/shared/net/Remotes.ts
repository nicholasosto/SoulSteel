/* Net Module */
import Net, { Definitions } from "@rbxts/net";

/* ID's */
import { SkillId } from "shared/_IDs/IDs_Skill";
import { ResourceId } from "shared/_IDs/IDs_Resource";

/* Interfaces */
import IPlayerData from "shared/_Interfaces/Player Data/IPlayerData";
import Logger from "shared/Utility/Logger";

/* All Payloads */
interface Payloads {
	/* Player Data */
	PlayerData: [playerData: IPlayerData];
	SkillSlotMap: [skillSlotMap: Map<number, SkillId>];
	ProgressionStats: [progressionStats: IPlayerData["ProgressionStats"]];
	CharacterIdentity: [characterIdentity: IPlayerData["CharacterIdentity"]];
	CharacterStats: [characterStats: IPlayerData["CharacterStats"]];
	QuestData: [questData: IPlayerData["QuestData"]];
	Skills: [skills: IPlayerData["Skills"]];

	/* Derived Data Payloads */
	PlayerResourceData: [resourceId: ResourceId, current: number, max: number];

	/* Messaging Payloads */
	PlayerNotification: [success: boolean, title: string, message: string];

	/* Client to Server Payloads */
	AssignSkill: [slot: number, skillId?: SkillId];
}

const Remotes = Net.CreateDefinitions({
	/* ======== Client To Server Events =========*/

	/* Game Cycle - Player UI Ready */
	PlayerUIReady: Definitions.ClientToServerEvent<[]>(),
	PlayerDataRequest: Definitions.ClientToServerEvent<[]>(),

	/*Skills -  Assign Skill Slot */
	AssignSkill: Definitions.ClientToServerEvent<[Payloads["AssignSkill"]]>(),

	/* Quests - Assign */
	AssignQuest: Definitions.ClientToServerEvent<[questId: string]>(),

	/* World - Teleport */
	TeleportTo: Definitions.ClientToServerEvent<[destination: Vector3]>(),
	/* World - Target Selected */
	TargetSelected: Definitions.ClientToServerEvent<[targetId: string]>(),

	/* ======== Server to Client Events =========*/

	/* Messages - Notify Player */
	NotifyPlayer: Definitions.ServerToClientEvent<[Payloads["PlayerNotification"]]>(),

	/* Skills - UI Skill Bar Update */
	SkillBarUpdate: Definitions.ServerToClientEvent<Payloads["SkillSlotMap"]>(),

	/* Data - Player Data Loaded */
	SendPlayerData: Definitions.ServerToClientEvent<Payloads["PlayerData"]>(),
	/* Data - Progression Stats */
	SendProgressionStats: Definitions.ServerToClientEvent<Payloads["ProgressionStats"]>(),
	/* Data - Player Resource Update */
	SendResourceData: Definitions.ServerToClientEvent<[Payloads["PlayerResourceData"]]>(),
});

/* ======== Client to Server Functions =========*/

/* Assign Skill Slot */
function AssignSkillSlot(slot: number, skillId: SkillId): void {
	/* Create Payload */
	const payload: Payloads["AssignSkill"] = [slot, skillId];

	/* Send To Client */
	Remotes.Client.Get("AssignSkill").SendToServer(payload);
}

/* Unassign Skill Slot */
function UnAssignSkillSlot(slot: number): void {
	/* Create Payload */
	const payload: Payloads["AssignSkill"] = [slot, undefined];

	/* Send To Client */
	Remotes.Client.Get("AssignSkill").SendToServer(payload);
}

/* ======== Server to Client Functions =========*/

/* Notify Player */
function SendNotification(player: Player, success: boolean, title: string, message: string): void {
	/* Create Payload */
	const payload: Payloads["PlayerNotification"] = [success, title, message];

	/* Send To Player */
	Remotes.Server.Get("NotifyPlayer").SendToPlayer(player, payload);
}

/* Assign Quest */
function AssignQuestToPlayer(player: Player, questId: string): void {
	/* Send To Player */
	Remotes.Client.Get("AssignQuest").SendToServer(questId);
}

/* Send Resource Update */
function SendResourceUpdate(player: Player, resourceId: ResourceId, current: number, max: number): void {
	/* Create Payload */
	const payload: Payloads["PlayerResourceData"] = [resourceId, current, max];

	/* Send To Player */
	Remotes.Server.Get("SendResourceData").SendToPlayer(player, payload);
	//Logger.Log("Remotes", `Sent Resource Update: ${resourceId} - ${current}/${max}`);
}

/* Exports */
export {
	Remotes,
	Payloads,
	AssignSkillSlot,
	UnAssignSkillSlot,
	SendNotification,
	SendResourceUpdate,
	AssignQuestToPlayer,
};
