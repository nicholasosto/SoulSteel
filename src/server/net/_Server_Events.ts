import { QuestId } from "shared/_IDs/IDs_Quest";
import { ResourceId } from "shared/_IDs/IDs_Resource";
import IPlayerData from "shared/_Interfaces/Player Data/IPlayerData";
import { BiDirectionalEvents, S2C, C2S, Payloads } from "shared/net/Remotes";
import Logger from "shared/Utility/Logger";

const GameCycleEvents = {
	PlayerDataLoaded: S2C.Server.Get("PlayerDataLoaded"),
	PlayerResourceUpdated: S2C.Server.Get("PlayerResourceUpdated"),
	PlayerDied: S2C.Server.Get("PlayerDied"),

	PlayerUIReady: C2S.Server.Get("PlayerUIReady"),

	SkillControllerStarted: S2C.Server.Get("SkillControllerStarted"),
	DataManagerStarted: S2C.Server.Get("DataManagerStarted"),
	CharacterControllerStarted: S2C.Server.Get("CharacterControllerStarted"),
};

const WorldEvent = {
	Teleport: BiDirectionalEvents.Server.Get("Teleport"),
};

const SkillEvent = {
	SkillSlotAssignment: BiDirectionalEvents.Server.Get("SkillSlotAssignment"),
	UnassignSkillSlot: BiDirectionalEvents.Server.Get("UnAssignSkillSlot"),
};

const CharacterEvent = {
	ResourceUpdated: S2C.Server.Get("PlayerResourceUpdated"),
};

const DeveloperEvent = {
	GameOfLife: BiDirectionalEvents.Server.Get("GameOfLife"),
};

const Notifications = {
	PlayerNotification: BiDirectionalEvents.Server.Get("PlayerNotification"),
};

const Outbound = {
	SendResourceUpdate(player: Player, resource: { resourceId: ResourceId; current: number; max: number }) {
		CharacterEvent.ResourceUpdated.SendToPlayer(player, resource);
	},
	SendQuestRewarded(player: Player, questId: QuestId) {
		S2C.Server.Get("QuestRewarded").SendToPlayer(player, questId);
	},
	SendQuestAssigned(player: Player, questId: QuestId) {
		S2C.Server.Get("QuestAssigned").SendToPlayer(player, questId);
	},
	SendProgressionStats(player: Player, progressionStats: IPlayerData["ProgressionStats"]) {
		S2C.Server.Get("SendProgressionStats").SendToPlayer(player, progressionStats);
	},
};

const QuestCompleted = C2S.Server.Get("QuestCompleted");

// C2S.Server.Get("QuestCompleted").Connect((player, questId) => {
// 	Logger.Log(script, "Quest Completed", player, questId);
// 	Outbound.SendQuestRewarded(player, questId);
// });

export { DeveloperEvent, SkillEvent, WorldEvent, GameCycleEvents, Payloads, Outbound, Notifications, QuestCompleted };
