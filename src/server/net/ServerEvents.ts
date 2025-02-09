import { BiDirectionalEvents, S2C, C2S } from "shared/Remotes/Remotes";


const GameCycleEvents = {
	PlayerDataLoaded: S2C.Server.Get("PlayerDataLoaded"),
	PlayerResourceUpdated: S2C.Server.Get("PlayerResourceUpdated"),
	PlayerDied: S2C.Server.Get("PlayerDied"),

	SkillControllerStarted: S2C.Server.Get("SkillControllerStarted"),
	DataManagerStarted: S2C.Server.Get("DataManagerStarted"),
	CharacterControllerStarted: S2C.Server.Get("CharacterControllerStarted"),
};

const WorldEvent = {
	Teleport: BiDirectionalEvents.Server.Get("Teleport"),
};

const SkillEvent = {
	SkillBarCreated: BiDirectionalEvents.Server.Get("SkillBarCreated"),
	SkillSlotAssignment: BiDirectionalEvents.Server.Get("SkillSlotAssignment"),
	UnassignSkillSlot: BiDirectionalEvents.Server.Get("UnAssignSkillSlot"),
};

const DeveloperEvent = {
	GameOfLife: BiDirectionalEvents.Server.Get("GameOfLife"),
};

export { DeveloperEvent, SkillEvent, WorldEvent, GameCycleEvents };
