import Logger from "shared/Utility/Logger";
import { BiDirectionalEvents } from "./Remotes";

const BiDirectionalController = {
	Teleport: BiDirectionalEvents.Server.Get("Teleport"),
	GameOfLife: BiDirectionalEvents.Server.Get("GameOfLife"),
	SkillSlotAssignment: BiDirectionalEvents.Server.Get("SkillSlotAssignment"),
	UnAssignSkillSlot: BiDirectionalEvents.Server.Get("UnAssignSkillSlot"),
	ModuleToModule: BiDirectionalEvents.Server.Get("ModuleToModule"),
	PlayerNotification: BiDirectionalEvents.Server.Get("PlayerNotification"),
};

BiDirectionalController.Teleport.Connect((player, destination) => {
	Logger.Log(player, `Teleporting to ${destination}`);
	player.Character?.PivotTo(new CFrame(destination));
});

