import Net, { Definitions } from "@rbxts/net";
import { SkillId } from "shared/_IDs/IDs_Skill";
import { ResourceId } from "shared/_IDs/IDs_Resource";
import IPlayerData  from "shared/_Interfaces/IPlayerData";
import Logger from "shared/Utility/Logger";
import { QuestId } from "shared/_IDs/IDs_Quest";

interface PlayerNotificationPayload {
	message: string;
	confirmation: boolean;
}

/* Payloads */
interface Payloads {
	PlayerLevelUp: [level: number];
	PlayerInfoResponse: [name: string, level: number, profilePicId: string];
	PlayerResourceUpdate: { resourceId: ResourceId; current: number; max: number };
}

const BiDirectional = Net.Definitions.Create({
	GameOfLife: Net.Definitions.BidirectionalEvent<[]>(),
	Teleport: Net.Definitions.BidirectionalEvent<[destination: Vector3]>(),
	SkillSlotAssignment: Net.Definitions.BidirectionalEvent<[slot: number, skillId: SkillId]>(),
	UnAssignSkillSlot: Net.Definitions.BidirectionalEvent<[slot: number]>(),
	ModuleToModule: Net.Definitions.BidirectionalEvent<[message: string]>(),
	PlayerNotification: Net.Definitions.BidirectionalEvent<[payload: PlayerNotificationPayload]>(),
});


const C2S = Net.Definitions.Create({
	PlayerUIReady: Net.Definitions.ClientToServerEvent(),
	TargetSelected: Net.Definitions.ClientToServerEvent<[targetId: string]>(),

	/*Quests*/
	QuestAccepted: Net.Definitions.ClientToServerEvent<[questId: QuestId]>(),
	QuestUpdated: Net.Definitions.ClientToServerEvent<[questId: QuestId]>(),
	QuestCompleted: Net.Definitions.ClientToServerEvent<[questId: QuestId]>(),
});

const S2C = Net.Definitions.Create({
	PlayerDataLoaded: Net.Definitions.ServerToClientEvent<[playerData: IPlayerData]>(),
	PlayerResourceUpdated: Net.Definitions.ServerToClientEvent<[Payloads["PlayerResourceUpdate"]]>(),
	PlayerDied: Net.Definitions.ServerToClientEvent(),

	SkillControllerStarted: Net.Definitions.ServerToClientEvent(),
	CharacterControllerStarted: Net.Definitions.ServerToClientEvent(),
	DataManagerStarted: Net.Definitions.ServerToClientEvent(),

	/*Quests*/
	QuestRewarded: Net.Definitions.ServerToClientEvent<[questId: QuestId]>(),
	QuestAssigned: Net.Definitions.ServerToClientEvent<[questId: QuestId]>(),
	
	/*Progression*/
	SendProgressionStats: Net.Definitions.ServerToClientEvent<[progressionStats: IPlayerData["ProgressionStats"]]>(),
});


/* Send To Client */
function SendNotification(player: Player, message: string, confirmation: boolean): void {
	const payload: PlayerNotificationPayload = { message, confirmation };
	BiDirectional.Server.Get("PlayerNotification").SendToPlayer(player, payload);
	Logger.Log(script, `Notification: ${message}`, player);
}

/* Send To Server */
function SendNoticationConfirmation(confirmation: boolean): void {
	const payload: PlayerNotificationPayload = { message: "", confirmation };
	BiDirectional.Client.Get("PlayerNotification").SendToServer(payload);
}

export { S2C, C2S, BiDirectional as BiDirectionalEvents, Payloads, SendNotification, SendNoticationConfirmation };
