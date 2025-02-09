import { BiDirectionalEvents, S2C, C2S } from "shared/Remotes/Remotes";
const WorldEvent = {
	Teleport: BiDirectionalEvents.Client.Get("Teleport"),
	TargetSelected: C2S.Client.Get("TargetSelected"),
};

const DeveloperEvent = {
	GameOfLife: BiDirectionalEvents.Client.Get("GameOfLife"),
};

const SkillEvent = {
	SkillBarCreated: BiDirectionalEvents.Client.Get("SkillBarCreated"),
	SkillSlotAssignment: BiDirectionalEvents.Client.Get("SkillSlotAssignment"),
	UnassignSkillSlot: BiDirectionalEvents.Client.Get("UnAssignSkillSlot"),
};

const GameCycleEvents = {
	PlayerDataLoaded: S2C.Client.Get("PlayerDataLoaded"),
	PlayerResourceUpdated: S2C.Client.Get("PlayerResourceUpdated"),
	PlayerDied: S2C.Client.Get("PlayerDied"),

	SkillControllerStarted: S2C.Client.Get("SkillControllerStarted"),
	DataManagerStarted: S2C.Client.Get("DataManagerStarted"),
	CharacterControllerStarted: S2C.Client.Get("CharacterControllerStarted"),
};

export { SkillEvent, WorldEvent, DeveloperEvent, GameCycleEvents };
