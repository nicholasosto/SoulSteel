/* ClientNetManager.ts
 * Client Network Manager
 * Handles all client-side network interactions and UI updates
 */

/* Network Imports */
import { Players } from "@rbxts/services";
import { RemoteEvents, RemoteFunctions } from "shared/net/Remotes";
import * as Payload from "shared/net/RemoteIndex";
import { PlayerCurrency, PlayerStats, PlayerProgression, ResourceBars } from "shared/_ROACT/Components/DataValueObjects";

/* GUI Controllers */
import UIManager from "client/UI Controllers/UIManager";

/* Payloads */

/* FusionUpdates */
const OnSendResourceData = RemoteEvents.Client.Get("SendResourceData");

/* Remote Functions */
const GetSkillSlotMap = RemoteFunctions.Client.Get("GetSkillSlotMap"); // HUD - Skill Bar
const GetCharacterFrameData = RemoteFunctions.Client.Get("GetCharacterFrameData"); // Character Frame
const GetEquipmentSlotMap = RemoteFunctions.Client.Get("GetEquipmentSlotMap"); // Equipment Frame

/* Update Events */
const UpdateInfoFrame = RemoteEvents.Client.Get("UpdateInfoFrame"); // Info Frame
const UpdateSkillSlotMap = RemoteEvents.Client.Get("UpdateSkillSlotMap"); // HUD - Skill Bar
const SendPlayerData = RemoteEvents.Client.Get("SendPlayerData"); // Player Data Loaded

/* Skill Bar */

/* Character Frame - Resource Bars */

export default class ClientNetManager {
	private static _instance: ClientNetManager;

	/* Data Connections */
	private static _onSendPlayerData: RBXScriptConnection | undefined;

	/*Fusion Updates */
	private static _onResourceData: RBXScriptConnection | undefined;

	/* Panel Connections */
	private static _updateSkillPanel: RBXScriptConnection | undefined;

	/* HUD - GUI Element Updates */
	private static _updateSkillSlotMap: RBXScriptConnection | undefined;
	private static _updateCharacterFrame: RBXScriptConnection | undefined;
	private static _updatePlayerProgression: RBXScriptConnection | undefined;

	/* Constructor */
	private constructor() {}

	/* Start */
	public static async Start() {
		if (this._instance === undefined) {
			/* Client Network Manager */
			this._instance = new ClientNetManager();
			this.InitializeListeners();
			this._InitializePanelData();
		}
	}

	/* Initialize Listeners */
	private static InitializeListeners() {
		/* Fusion Updates */
		this._onResourceData?.Disconnect();
		this._onResourceData = OnSendResourceData.Connect((resourceData) => {
			// Handle the resource data received
			warn("NetManager: Received resource data:", resourceData);
			ResourceBars.PlayerHealth.playerCurrentHealth.set(resourceData.Health);
		});
		/* Player Data Loaded */
		this._onSendPlayerData?.Disconnect();
		this._onSendPlayerData = SendPlayerData.Connect((playerData) => {
			// Handle the player data received
			warn("NetManager: Received player data:", playerData);
			UIManager.OnPlayerDataLoaded(playerData);
			PlayerProgression.playerLevel.set(playerData.ProgressionStats.Level);
			PlayerProgression.playerExperience.set(playerData.ProgressionStats.Experience);
			PlayerStats.playerAttributePoints.set(playerData.AvaliableAttributePoints);
			PlayerStats.playerStrength.set(playerData.CharacterStats.Strength);
			PlayerStats.playerDexteriy.set(playerData.CharacterStats.Dexterity);
			PlayerStats.playerIntelligence.set(playerData.CharacterStats.Intelligence);
			PlayerStats.playerConstitution.set(playerData.CharacterStats.Constitution);
			PlayerCurrency.playerSoulChips.set(100);
			PlayerCurrency.playerSoulShards.set(50);
			PlayerCurrency.playerSoulGems.set(10);
		});
		/* Update Skill Slot Map */
		this._updateSkillSlotMap?.Disconnect();
		this._updateSkillSlotMap = UpdateSkillSlotMap.Connect((slotMap) => {
			warn("NetManager: Received skill slot map:", slotMap);
			UIManager.UpdateSkillBar(slotMap);
		});

		/* Resource Bar Connection */
		this._updateCharacterFrame?.Disconnect();
		this._updateCharacterFrame = UpdateInfoFrame.Connect((payload) => {
			// Handle the update info frame event
			UIManager.UpdateInfoFrame(payload);
		});
	}

	/* Initialize Panel Data */
	private static async _InitializePanelData() {
		/* Skill Slot Map */
		const skillSlotMap = await this.GetSkillSlotMap();
		if (skillSlotMap) {
			UIManager.UpdateSkillBar(skillSlotMap);
		}

		/* Character Frame Data */
		const characterFrameData = await this.GetCharacterFrameData();
		if (characterFrameData) {
			UIManager.UpdateInfoFrame(characterFrameData);
		}
	}

	/* Get Skill Slot Map */
	public static async GetSkillSlotMap() {
		const slotMap = await GetSkillSlotMap.CallServerAsync().then((result) => {
			return result as Payload.PSkillSlotMap | undefined;
		});
		return slotMap;
	}

	/* Get Equipment Slot Map */
	public static async GetEquippedItems() {
		const equipmentSlotMap = await GetEquipmentSlotMap.CallServerAsync().then((result) => {
			return result as Payload.PEquipmentSlotMap | undefined;
		});
		return equipmentSlotMap;
	}

	/* Get Equipment Inventory */
	public static async GetEquipmentInventory() {
		//TODO: Implement
		// StorageManager GetEquipmentInventory??
	}

	/* Get Character Frame Data */
	public static async GetCharacterFrameData() {
		const characterFrameData = await GetCharacterFrameData.CallServerAsync().then((result) => {
			return result as Payload.PInfoFrame | undefined;
		});
		return characterFrameData;
	}
}

Players.LocalPlayer.CharacterAdded.Connect(() => {
	ClientNetManager.Start();
	warn("Starting UIManager - Character Added");
	UIManager.Start();
	const skillSlotMap = ClientNetManager.GetSkillSlotMap().await()[1] as Payload.PSkillSlotMap | undefined;
	if (skillSlotMap) {
		UIManager.UpdateSkillBar(skillSlotMap);
	}
	const characterFrameData = ClientNetManager.GetCharacterFrameData().await()[1] as Payload.PInfoFrame | undefined;
	if (characterFrameData) {
		UIManager.UpdateInfoFrame(characterFrameData);
	}
});

Players.LocalPlayer.CharacterRemoving.Connect(() => {
	warn("Cleaning up UIManager - Character Removed");
});
