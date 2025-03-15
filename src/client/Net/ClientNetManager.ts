/* ClientNetManager.ts
 * Client Network Manager
 * Handles all client-side network interactions and UI updates
 */

/* Network Imports */
import { Players } from "@rbxts/services";
import { Payloads, RemoteEvents, RemoteFunctions } from "shared/net/Remotes";
import { InfoFramePayload } from "shared/net/RemoteIndex";

/* IDs and Types */
import { SkillSlotMap } from "shared/_IDs/SkillIndex";

/* GUI Controllers */
import UIManager from "client/UIManager";

/* Remote Functions */
const GetSkillSlotMap = RemoteFunctions.Client.Get("GetSkillSlotMap"); // HUD - Skill Bar
const GetCharacterFrameData = RemoteFunctions.Client.Get("GetCharacterFrameData"); // Character Frame

/* Update Events */
const UpdateSkillPanel = RemoteEvents.Client.Get("UpdateSkillPanel"); // Skill Panel
const UpdateEquipmentPanel = RemoteEvents.Client.Get("UpdateEquipmentPanel"); // Equipment Panel
const UpdateInfoFrame = RemoteEvents.Client.Get("UpdateInfoFrame"); // Info Frame
const UpdateSkillSlotMap = RemoteEvents.Client.Get("UpdateSkillSlotMap"); // HUD - Skill Bar

/* Skill Bar */

/* Character Frame - Resource Bars */

export default class ClientNetManager {
	private static _instance: ClientNetManager;

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
			warn("NetManager: Pre-Initialized");
			this.InitializeListeners();
			warn("NetManager: Initialized Listeners");

			this._InitializePanelData();
			warn("NetManager: Initialized Panel Data");
		}
	}

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
			return result as SkillSlotMap | undefined;
		});
		return slotMap;
	}
	/* Get Character Frame Data */
	public static async GetCharacterFrameData() {
		const characterFrameData = await GetCharacterFrameData.CallServerAsync().then((result) => {
			return result as InfoFramePayload | undefined;
		});
		return characterFrameData;
	}

	/* Initialize Listeners */
	private static InitializeListeners() {
		/* Update Skill Panel */
		this._updateSkillPanel?.Disconnect();
		this._updateSkillPanel = UpdateSkillPanel.Connect((panelData) => {
			// Handle the update skill panel event
			warn("NetManager: Received skill panel data:", panelData);
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
}

Players.LocalPlayer.CharacterAdded.Connect(() => {
	ClientNetManager.Start();
	warn("Starting UIManager - Character Added");
	UIManager.Start();
	const skillSlotMap = ClientNetManager.GetSkillSlotMap().await()[1] as SkillSlotMap | undefined;
	if (skillSlotMap) {
		UIManager.UpdateSkillBar(skillSlotMap);
	}
	const characterFrameData = ClientNetManager.GetCharacterFrameData().await()[1] as InfoFramePayload | undefined;
	if (characterFrameData) {
		UIManager.UpdateInfoFrame(characterFrameData);
	}
});

Players.LocalPlayer.CharacterRemoving.Connect(() => {
	warn("Cleaning up UIManager - Character Removed");
	UIManager.ClearUI();
});
