import { Players, RunService } from "@rbxts/services";
import { DataManager } from "server/PlayerData/DataManager";
import { ItemId, DefaultInventory } from "shared/_References/Inventory";
import { Logger } from "shared/Utility/Logger";
import { PlayerRemotes, InventoryRemotes, EquipmentRemotes } from "./RemoteIndex";

// RequestInventory
function RequestInventory(player: Player): void {
	Logger.Log(script, "RequestInventory: ", player);

	// Send the inventory to the player
	InventoryRemotes.GetInventory.SendToPlayer(player, DefaultInventory);
}

// Equipment
function EquipItemRequest(player: Player, itemId: ItemId): void {
	Logger.Log(script, "EquipItemRequest: ", player, itemId);
}

// Connect Events
InventoryRemotes.RequestInventory.Connect(RequestInventory);
EquipmentRemotes.EquipItemRequest.Connect(EquipItemRequest);

// Heartbeat: Settings
const updateInterval = 4;
let lastUpdate = 0;

// Heartbeat: Update Loop
function UpdateLoop(): void {
	const players = Players.GetPlayers();
	if (players.size() === 0) {
		return;
	}

	players.forEach((player) => {
		const playerData = DataManager.GetDataCache(tostring(player.UserId))._playerData;
		// eslint-disable-next-line prettier/prettier
		const thumbnail = Players.GetUserThumbnailAsync(player.UserId, Enum.ThumbnailType.HeadShot, Enum.ThumbnailSize.Size420x420)[0];

		PlayerRemotes.PlayerInfoUpdate.SendToPlayer(
			player,
			player.Name,
			playerData.ProgressionStats.Level,
			tostring(thumbnail),
		);
	});
}

// Heartbeat: Connect
RunService.Heartbeat.Connect((dt) => {
	if (tick() - lastUpdate >= updateInterval) {
		lastUpdate = tick();
		UpdateLoop();
	}
});
