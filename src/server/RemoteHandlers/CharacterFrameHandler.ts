import { PlayerRemotes } from "server/RemoteHandlers/RemoteIndex";
import { ResourceId } from "shared/_References/Resources";

function UpdateResourceBar(player: Player, resource: ResourceId, value: number, maxValue: number) {
	const percent = (value / maxValue) * 100;
	PlayerRemotes.PlayerResourceUpdate.SendToPlayer(
		player,
		resource,
		percent,
		math.floor(value) / math.floor(maxValue),
	);
}

// Update the player's character information
function UpdateCharacterInfo(player: Player, name: string, level: number, profilePicId: string) {
	PlayerRemotes.PlayerInfoUpdate.SendToPlayer(player, name, level, profilePicId);
}

export { UpdateResourceBar, UpdateCharacterInfo };
