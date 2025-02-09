import Net, { Definitions } from "@rbxts/net";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";
import { ResourceId } from "shared/Game Character/Character Resources/Resources";
import SkillBar from "shared/Epic UI/Skill Bar/SkillBar";
import { IPlayerData } from "shared/Data Interfaces/PlayerData";

/* Payloads */
// interface Payloads {
// 	PlayerLevelUp: [level: number];
// 	PlayerInfoResponse: [name: string, level: number, profilePicId: string];
// 	PlayerResourceUpdate: [resourceId: ResourceId, current: number, max: number];
// }

const BiDirectionalEvents = Net.Definitions.Create({
	GameOfLife: Net.Definitions.BidirectionalEvent<[]>(),
	Teleport: Net.Definitions.BidirectionalEvent<[destination: Vector3]>(),
	SkillBarCreated: Net.Definitions.BidirectionalEvent<[skillMap?: Map<number, SkillId>]>(),
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
	PlayerResourceUpdated:
		Net.Definitions.ServerToClientEvent<[resourceId: ResourceId, current: number, max: number]>(),
	PlayerDied: Net.Definitions.ServerToClientEvent(),

	SkillControllerStarted: Net.Definitions.ServerToClientEvent(),
	CharacterControllerStarted: Net.Definitions.ServerToClientEvent(),
	DataManagerStarted: Net.Definitions.ServerToClientEvent(),
});


export { S2C, C2S, BiDirectionalEvents };
