import { QuestId } from "shared/_IDs/IDs_Quest";
import { BiDirectionalEvents, S2C, C2S, Payloads } from "shared/net/Remotes";
const WorldEvent = {
	Teleport: BiDirectionalEvents.Client.Get("Teleport"),
	TargetSelected: C2S.Client.Get("TargetSelected"),
};

const DeveloperEvent = {
	GameOfLife: BiDirectionalEvents.Client.Get("GameOfLife"),
};

const SkillEvent = {
	SkillSlotAssignment: BiDirectionalEvents.Client.Get("SkillSlotAssignment"),
	UnassignSkillSlot: BiDirectionalEvents.Client.Get("UnAssignSkillSlot"),
};

const CharacterEvent = {
	ResourceUpdated: S2C.Client.Get("PlayerResourceUpdated"),
};

const GameCycleEvents = {
	PlayerDataLoaded: S2C.Client.Get("PlayerDataLoaded"),
	PlayerResourceUpdated: S2C.Client.Get("PlayerResourceUpdated"),
	PlayerDied: S2C.Client.Get("PlayerDied"),

	PlayerUIReady: C2S.Client.Get("PlayerUIReady"),

	SkillControllerStarted: S2C.Client.Get("SkillControllerStarted"),
	DataManagerStarted: S2C.Client.Get("DataManagerStarted"),
	CharacterControllerStarted: S2C.Client.Get("CharacterControllerStarted"),
};

const Notifications = {
	PlayerNotification: BiDirectionalEvents.Client.Get("PlayerNotification"),
};

const QuestCompleted = C2S.Client.Get("QuestCompleted");
const QuestRewarded = S2C.Client.Get("QuestRewarded");
const QuestAssigned = S2C.Client.Get("QuestAssigned");

const QuestToServer = {
	SendQuestAccepted: C2S.Client.Get("QuestAccepted"),

	SendQuestComplete(questId: QuestId) {
		QuestCompleted.SendToServer(questId);
	},
};


export {
	SkillEvent,
	WorldEvent,
	DeveloperEvent,
	GameCycleEvents,
	CharacterEvent,
	Payloads,
	QuestToServer,
	Notifications,
	QuestRewarded,
	QuestAssigned,
};
