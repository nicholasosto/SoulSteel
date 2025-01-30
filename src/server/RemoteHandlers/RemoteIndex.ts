import Remotes, { RemoteNames } from "shared/Remotes/Remotes";

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

export { PlayerRemotes, PlayerCharacterRemotes, EquipmentRemotes, InventoryRemotes };
