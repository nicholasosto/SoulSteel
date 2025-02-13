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

export { SkillEvent, WorldEvent, DeveloperEvent, GameCycleEvents, CharacterEvent, Payloads };
