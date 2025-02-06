import Logger from "shared/Utility/Logger";
import * as ServerRemotes from "shared/Remotes/ServerRemotes";
import { ResourceId } from "shared/_References/Resources";

// Resource Bars Update
function SendPlayerResourceUpdate(player: Player, resourceId: ResourceId, current: number, max: number) {
	Logger.Log(script, "Sending resource update to player:", player, resourceId, current, max);
	ServerRemotes.PlayerRemotes.PlayerResourceUpdate.SendToPlayer(player, resourceId, current, max);
}

// Level Up - Character Frame ect.
function SendPlayerLevelUp(player: Player, newLevel: number) {
	Logger.Log(script, "Sending level up to player:", player, newLevel);
	ServerRemotes.PlayerRemotes.PlayerLevelUp.SendToPlayer(player, newLevel);
}

function EmitPlayerCharacterCreated(player: Player) {
	ServerRemotes.PlayerCharacterRemotes.PlayerCharacterCreated.SendToPlayer(player);
}

export { SendPlayerResourceUpdate, SendPlayerLevelUp, EmitPlayerCharacterCreated };
