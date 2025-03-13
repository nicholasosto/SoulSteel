/* Net Module */
import Net, { Definitions } from "@rbxts/net";

/* ID's */
import { SkillId } from "shared/_IDs/IDs_Skill";
import { ResourceId } from "shared/_IDs/IDs_Resource";

/* Interfaces */
import IPlayerData from "shared/_Interfaces/Player Data/IPlayerData";
import { GameState } from "shared/State/GameStore";
import Logger from "shared/Utility/Logger";

interface AttributePanelData {
	availablePoints: number;
	spentPoints: number;
	characterStats: IPlayerData["CharacterStats"];
}
interface SkillPanelData {
	skillSlots: Map<number, SkillId>;
	unlockedSkills: SkillId[];
}

interface IPanelData {
	panelId: string;
	data: AttributePanelData | SkillPanelData;
}
type PanelId = string;
type SlotMapId = string;

type SkillSlotId = string;
type EquipmentSlotId = string;
type EquipmentId = string;
type SkillSlotMap = Map<SkillSlotId, SkillId>;
type EquipmentSlotMap = Map<EquipmentSlotId, EquipmentId>;

type TSlotMap = SkillSlotMap | EquipmentSlotMap;


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

	/* Panel Data */
	AttributePanelData: [attributePanelData: AttributePanelData];

	/* Derived Data Payloads */
	PlayerResourceData: [resourceId: ResourceId, current: number, max: number];

	/* Messaging Payloads */
	PlayerNotification: [success: boolean, title: string, message: string];

	/* Client to Server Payloads */
	AssignSkill: [slot: number, skillId?: SkillId];
}

const Remotes = Net.CreateDefinitions({
	/* ======== Client To Server Events =========*/

	/* Full Load and Destroy Triggers */
	GameCharacterCreated: Definitions.ServerToClientEvent<[]>(),
	GameCharacterDestroyed: Definitions.ServerToClientEvent<[]>(),

	/* GAME STATE */
	StateChanged: Net.Definitions.ServerToClientEvent<[keyof GameState, unknown]>(),

	/* Subject Observer - Score Manager */
	PlayerAttributesUpdated: Definitions.ServerToClientEvent<[AttributePanelData]>(),
	AttributeUpdateRequest: Definitions.ClientToServerEvent<[AttributePanelData]>(),

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

const RemoteFunctions = Net.CreateDefinitions({
	// Client-to-server remote function to initialize panel data
	InitializeAttributePanel: Net.Definitions.ServerAsyncFunction<() => AttributePanelData>(),

	GetPanelData: Net.Definitions.ServerAsyncFunction<(panelId: PanelId) => IPanelData>(),
	GetSlotMap: Net.Definitions.ServerAsyncFunction<(slotMapId: SlotMapId) => TSlotMap>(),
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
	RemoteFunctions,
	AttributePanelData,
	IPanelData,
	SkillId,
	SkillSlotId,
	SkillSlotMap,
	EquipmentId,
	EquipmentSlotId,
	EquipmentSlotMap,
	PanelId
};
