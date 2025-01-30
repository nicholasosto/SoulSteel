import { Players } from "@rbxts/services";
import Remotes, { RemoteNames } from "shared/Remotes/Remotes";
import { ResourceId } from "shared/_References/Resources";
import { CharacterResource } from "shared/Character Resources/CharacterResource";
import { Logger } from "shared/Utility/Logger";

// Player: Remotes
const nsPlayerRemotes = Remotes.Server.GetNamespace("Player");
const PlayerRemotes = {
	PlayerLevelUp: nsPlayerRemotes.Get(RemoteNames.PlayerLevelUp),
	PlayerResourceUpdate: nsPlayerRemotes.Get(RemoteNames.PlayerResourceUpdate),
	PlayerInfoUpdate: nsPlayerRemotes.Get(RemoteNames.PlayerInfoUpdate),
	PlayerStatUpdate: nsPlayerRemotes.Get(RemoteNames.PlayerStatUpdate),
};

// Player Character: Remotes
const nsPlayerCharacter = Remotes.Server.GetNamespace("PlayerCharacter");
const PlayerCharacterRemotes = {
	PlayerCharacterCreated: nsPlayerCharacter.Get(RemoteNames.PlayerCharacterCreated),
	PlayerCharacterDestroyed: nsPlayerCharacter.Get(RemoteNames.PlayerCharacterDestroyed),
};

// Equipment: Remotes
const nsEquipment = Remotes.Server.GetNamespace("Equipment");
const EquipmentRemotes = {
	EquipItemRequest: nsEquipment.Get(RemoteNames.EquipItemRequest),
};

// Inventory: Remotes
const nsInventory = Remotes.Server.GetNamespace("Inventory");
const InventoryRemotes = {
	GetInventory: nsInventory.Get(RemoteNames.GetInventory),
	RequestInventory: nsInventory.Get(RemoteNames.RequestInventory),
};

/*
 * Functions
 *
 */

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
	Logger.Log(script, thumbnail);
	// Send the player's info update
	PlayerRemotes.PlayerInfoUpdate.SendToPlayer(player, name, level, thumbnail);
}

export {
	PlayerRemotes,
	PlayerCharacterRemotes,
	EquipmentRemotes,
	InventoryRemotes,
	SendPlayerResourceUpdate,
	SendPlayerInfoUpdate,
};
