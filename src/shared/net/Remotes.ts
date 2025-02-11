import Net, { Definitions } from "@rbxts/net";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";
import { ResourceId } from "server/Character/Character Resources/Resources";
import { IPlayerData } from "shared/Data Interfaces/PlayerData";
import { CharacterResource } from "server/Character/Character Resources/CharacterResource";

/* Payloads */
interface Payloads {
	PlayerLevelUp: [level: number];
	PlayerInfoResponse: [name: string, level: number, profilePicId: string];
	PlayerResourceUpdate: { resourceId: ResourceId, current: number, max: number};
}

const BiDirectionalEvents = Net.Definitions.Create({
	GameOfLife: Net.Definitions.BidirectionalEvent<[]>(),
	Teleport: Net.Definitions.BidirectionalEvent<[destination: Vector3]>(),
	SkillSlotAssignment: Net.Definitions.BidirectionalEvent<[slot: number, skillId: SkillId]>(),
	UnAssignSkillSlot: Net.Definitions.BidirectionalEvent<[slot: number]>(),
	ModuleToModule: Net.Definitions.BidirectionalEvent<[message: string]>(),
});

const C2S = Net.Definitions.Create({
	PlayerUIReady: Net.Definitions.ClientToServerEvent(),
	TargetSelected: Net.Definitions.ClientToServerEvent<[targetId: string]>(),
});

const S2C = Net.Definitions.Create({
	PlayerDataLoaded: Net.Definitions.ServerToClientEvent<[playerData: IPlayerData]>(),
	PlayerResourceUpdated: Net.Definitions.ServerToClientEvent<[Payloads["PlayerResourceUpdate"]]>(),
	PlayerDied: Net.Definitions.ServerToClientEvent(),

	SkillControllerStarted: Net.Definitions.ServerToClientEvent(),
	CharacterControllerStarted: Net.Definitions.ServerToClientEvent(),
	DataManagerStarted: Net.Definitions.ServerToClientEvent(),
});

export { S2C, C2S, BiDirectionalEvents, Payloads };
