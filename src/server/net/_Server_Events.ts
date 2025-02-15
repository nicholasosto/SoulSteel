import { ResourceId } from "shared/_IDs/IDs_Resource";
import { BiDirectionalEvents, S2C, C2S, Payloads } from "shared/net/Remotes";

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
};

export { DeveloperEvent, SkillEvent, WorldEvent, GameCycleEvents, Payloads, Outbound, Notifications };
