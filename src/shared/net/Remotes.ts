/* Net Module */
import Net, { Definitions } from "@rbxts/net";

/* ID's */
import * as Payload from "shared/net/RemoteIndex";

/* Interfaces */
import IPlayerData from "shared/_Interfaces/Player Data/IPlayerData";

const RemoteEvents = Net.CreateDefinitions({
	/* ======== Client To Server Events =========*/
	ClientUpdateTarget: Net.Definitions.ClientToServerEvent<[target: string]>(),
	//TestSendEvent: Net.Definitions.ClientToServerEvent<[eventName: string]>(),

	/* ======== Server To Client Events =========*/
	SendResourceData: Net.Definitions.ServerToClientEvent<[resourceData: Payload.PCurrentResourceAmounts]>(),

	/* Player Data */
	ServerTargetUpdate: Net.Definitions.ServerToClientEvent<[targetId: string]>(),
	SendPlayerData: Net.Definitions.ServerToClientEvent<[playerData: IPlayerData]>(),

	/* Character Creation */
	GameCharacterCreated: Definitions.ServerToClientEvent<[]>(),
	GameCharacterDestroyed: Definitions.ServerToClientEvent<[]>(),

	UpdateSkillSlotMap: Net.Definitions.ServerToClientEvent<[skillSlotMap: Payload.PSkillSlotMap]>(),
});

const RemoteFunctions = Net.CreateDefinitions({
	// Client-to-server remote function to initialize panel data
	GetSkillSlotMap: Net.Definitions.ServerAsyncFunction<() => Payload.PSkillSlotMap | undefined>(),
	GetEquipmentSlotMap: Net.Definitions.ServerAsyncFunction<() => Payload.PEquipmentSlotMap | undefined>(),
	GetDerivedStats: Net.Definitions.ServerAsyncFunction<() => Payload.PDerivedStats | undefined>(),
	//GetCharacterFrameData: Net.Definitions.ServerAsyncFunction<() => Payload.PInfoFrame | undefined>(),
});

/* Exports */
export { RemoteFunctions, RemoteEvents };
