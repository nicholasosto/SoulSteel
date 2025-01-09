import Remotes, { CharacterFrameData, RemoteNames } from "shared/Remotes";
import CharacterFrame from "./CharacterFrame";
import { InventoryType, InventoryItem } from "shared/_References/Inventory";
import { Logger } from "shared/Utility/Logger";

// Events
//const _remoteInventoryRequest = Remotes.Server.GetNamespace("Inventory").Get(RemoteNames.RequestInventory);
const _remoteInventoryResponse = Remotes.Client.GetNamespace("Inventory").Get(RemoteNames.GetInventory);
//const _remoteEquipItemRequest = Remotes.Server.GetNamespace("Equipment").Get(RemoteNames.EquipItemRequest);
const _remoteGameCharacterCreated = Remotes.Client.GetNamespace("GameCharacter").Get(RemoteNames.GameCharacterCreated);
const _remoteGameCharacterDestroyed = Remotes.Client.GetNamespace("GameCharacter").Get(
	RemoteNames.GameCharacterDestroyed,
);

// UI
const _remoteCharacterFrameUpdate = Remotes.Client.GetNamespace("UserInterface").Get(
	RemoteNames.UIUpdateCharacterFrame,
);

let playerInventory: Map<InventoryType, InventoryItem> = new Map<InventoryType, InventoryItem>();

// Event Handlers

// Inventory Response
function handleInventoryResponse(inventoryMap: Map<InventoryType, InventoryItem>) {
	Logger.Log("Received inventory: ", inventoryMap as unknown as string);
	playerInventory = inventoryMap;
}

// Game Character Created
function handleGameCharacterCreated() {
	Logger.Log(script, "Game Character Created");
}
function handleGameCharacterDestroyed() {
	Logger.Log(script, "Game Character Destroyed");
}

// Character Frame Update
function handleCharacterFrameUpdate(characterFrameData: CharacterFrameData) {
	Logger.Log("Received Character Frame Data: ", characterFrameData as unknown as string);
	CharacterFrame.Update(characterFrameData);
}

// Inventory Request
_remoteInventoryResponse.Connect(handleInventoryResponse);

// Game Character
_remoteGameCharacterCreated.Connect(handleGameCharacterCreated);
_remoteGameCharacterDestroyed.Connect(handleGameCharacterDestroyed);

// UI
_remoteCharacterFrameUpdate.Connect(handleCharacterFrameUpdate);
