import { ServerListenerEvent } from "@rbxts/net/out/server/ServerEvent";
import {InventoryItem, InventoryType, ItemId, DefaultInventory } from "shared/_References/Inventory";
import Remotes, { RemoteNames } from "shared/Remotes";
import { Logger } from "shared/Utility/Logger";

// Events
const EquipmentConnections = {
	EquipItemRequest: Remotes.Server.GetNamespace("Equipment").Get(RemoteNames.EquipItemRequest),
};

const InventoryConnections = {
	GetInventory: Remotes.Server.GetNamespace("Inventory").Get(RemoteNames.GetInventory),
	RequestInventory: Remotes.Server.GetNamespace("Inventory").Get(RemoteNames.RequestInventory),
};
// Event Handlers

// RequestInventory
function RequestInventory(player: Player): void {
	Logger.Log(script, "RequestInventory: ", player);

	// Send the inventory to the player
	InventoryConnections.GetInventory.SendToPlayer(player, DefaultInventory);
}

// Equipment
function EquipItemRequest(player: Player, itemId: ItemId): void {
	Logger.Log(script, "EquipItemRequest: ", player, itemId);
}

// Connect Events
InventoryConnections.RequestInventory.Connect(RequestInventory)
EquipmentConnections.EquipItemRequest.Connect(EquipItemRequest);
