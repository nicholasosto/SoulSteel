// Roblox Imports
import { Players } from "@rbxts/services";

// Deffinition Imports
import Logger from "shared/Utility/Logger";
import { PlayerRemotes } from "shared/Remotes/ServerRemotes";

// Type Imports
import { CharacterResource } from "shared/Character Resources/CharacterResource";
import { ResourceId } from "shared/_References/Resources";

// Resource Update
function SendPlayerResourceUpdate(player: Player, characterResource: CharacterResource) {
	const [value, maxValue] = characterResource.GetValues();
	const resource = characterResource.ResourceName as ResourceId;

	PlayerRemotes.PlayerResourceUpdate.SendToPlayer(player, resource, math.floor(value), math.floor(maxValue));
}

// Info Update
function SendPlayerInfoUpdate(player: Player, name: string, level: number) {
	// Get the player's thumbnail
	const thumbnail = Players.GetUserThumbnailAsync(
		player.UserId,
		Enum.ThumbnailType.HeadShot,
		Enum.ThumbnailSize.Size420x420,
	)[0];

	// Send the player's info update
	PlayerRemotes.PlayerInfoUpdate.SendToPlayer(player, name, level, thumbnail);
}

export { SendPlayerResourceUpdate, SendPlayerInfoUpdate };
