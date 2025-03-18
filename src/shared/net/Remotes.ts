/* Net Module */
import Net, { Definitions } from "@rbxts/net";

/* ID's */
import * as Payload from "shared/net/RemoteIndex";

/* Interfaces */
import IPlayerData from "shared/_Interfaces/Player Data/IPlayerData";
import { TGameCharacter } from "shared/_Types/TGameCharacter";

interface AttributePanelData {
	availablePoints: number;
	spentPoints: number;
	characterStats: IPlayerData["CharacterStats"];
}

const Remotes = Net.CreateDefinitions({
	/* ======== Client To Server Events =========*/
	/* Full Load and Destroy Triggers */
});

const RemoteEvents = Net.CreateDefinitions({
	/* ======== Client To Server Events =========*/
	ClientUpdateTarget: Net.Definitions.ClientToServerEvent<[target: string]>(),
	TestSendEvent: Net.Definitions.ClientToServerEvent<[eventName: string]>(),

	/* ======== Server To Client Events =========*/
	ServerTargetUpdate: Net.Definitions.ServerToClientEvent<[targetId: string]>(),
	SendPlayerData: Net.Definitions.ServerToClientEvent<[playerData: IPlayerData]>(),

	/* Character Creation */
	GameCharacterCreated: Definitions.ServerToClientEvent<[]>(),
	GameCharacterDestroyed: Definitions.ServerToClientEvent<[]>(),

	UpdateSkillSlotMap: Net.Definitions.ServerToClientEvent<[skillSlotMap: Payload.PSkillSlotMap]>(),
	UpdateInfoFrame: Net.Definitions.ServerToClientEvent<[payload: Payload.PInfoFrame]>(),
});

const RemoteFunctions = Net.CreateDefinitions({
	// Client-to-server remote function to initialize panel data
	GetSkillSlotMap: Net.Definitions.ServerAsyncFunction<() => Payload.PSkillSlotMap | undefined>(),
	GetEquipmentSlotMap: Net.Definitions.ServerAsyncFunction<() => Payload.PEquipmentSlotMap | undefined>(),
	GetCharacterFrameData: Net.Definitions.ServerAsyncFunction<() => Payload.PInfoFrame | undefined>(),
});

/* Exports */
export { Remotes, RemoteFunctions, RemoteEvents };
