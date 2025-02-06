import { ResourceId } from "shared/_References/Resources";
import * as ServerRemotes from "shared/Remotes/ServerRemotes";
import Logger from "shared/Utility/Logger";

// Resource Bars Update
export function SendPlayerResourceUpdate(player: Player, resourceId: ResourceId, current: number, max: number) {
	Logger.Log(script, "Sending resource update to player:", player, resourceId, current, max);
	ServerRemotes.PlayerRemotes.PlayerResourceUpdate.SendToPlayer(player, resourceId, current, max);
}

// Level Up - Character Frame ect.
export function SendPlayerLevelUp(player: Player, newLevel: number) {
	Logger.Log(script, "Sending level up to player:", player, newLevel);
	ServerRemotes.PlayerRemotes.PlayerLevelUp.SendToPlayer(player, newLevel);
}
