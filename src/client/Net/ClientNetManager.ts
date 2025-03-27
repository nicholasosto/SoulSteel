/* ClientNetManager.ts
 * Client Network Manager
 * Handles all client-side network interactions and UI updates
 */

/* Network Imports */
import { Players } from "@rbxts/services";
import { RemoteEvents, RemoteFunctions } from "shared/net/Remotes";
import {
	PlayerClassVO,
	PlayerCoreStatsVO,
	PlayerDisplayNameVO,
	PlayerProgressionVO,
	PlayerResourceVO,
} from "client/_Fusions/PlayerDataObjects";
import { Observer } from "@rbxts/fusion";

/* GUI Controllers */
//import UIManager from "client/UI Controllers/UIManager";

/* Payloads */

/* FusionUpdates */
const OnSendResourceData = RemoteEvents.Client.Get("SendResourceData");
const UpdateDerivedStats = RemoteEvents.Client.Get("UpdateDerivedStats");
const GetDerivedStats = RemoteFunctions.Client.Get("GetDerivedStats");

/* Remote Functions */
const GetSkillSlotMap = RemoteFunctions.Client.Get("GetSkillSlotMap"); // HUD - Skill Bar
//const GetCharacterFrameData = RemoteFunctions.Client.Get("GetCharacterFrameData"); // Character Frame
const GetEquipmentSlotMap = RemoteFunctions.Client.Get("GetEquipmentSlotMap"); // Equipment Frame

/* Update Events */
//const UpdateInfoFrame = RemoteEvents.Client.Get("UpdateInfoFrame"); // Info Frame
const UpdateSkillSlotMap = RemoteEvents.Client.Get("UpdateSkillSlotMap"); // HUD - Skill Bar
const SendPlayerData = RemoteEvents.Client.Get("SendPlayerData"); // Player Data Loaded

/* Skill Bar */

/* Character Frame - Resource Bars */

export default class ClientNetManager {
	private static _instance: ClientNetManager;

	/* Data Connections */
	private static _onSendPlayerData: RBXScriptConnection | undefined;

	/*Fusion Updates */
	private static _onDerivedStats: RBXScriptConnection | undefined;

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
		}
	}

	/* Initialize Listeners */
	private static InitializeListeners() {
		/* Resource Data */
		this._onDerivedStats?.Disconnect();
		this._onDerivedStats = OnSendResourceData.Connect((resourceData) => {
			warn("ClientNetManager: Received Resource Data");
			print(resourceData);
			PlayerResourceVO.MaxHealth.set(resourceData.Health);
			PlayerResourceVO.MaxStamina.set(resourceData.Stamina);
			PlayerResourceVO.MaxSoulPower.set(resourceData.SoulPower);
			PlayerResourceVO.MaxDomainResource.set(resourceData.DomainEssence);
			PlayerProgressionVO.ExperienceToNextLevel.set(resourceData.Experience);
		});

		/* Derived Stats */
		GetDerivedStats.CallServerAsync().then((derivedStats) => {
			warn("ClientNetManager: Received Derived Stats");
			print(derivedStats);
			if (derivedStats) {
				PlayerResourceVO.MaxHealth.set(derivedStats.MaxHealth);
				PlayerResourceVO.MaxStamina.set(derivedStats.MaxStamina);
				PlayerResourceVO.MaxSoulPower.set(derivedStats.MaxSoulPower);
				PlayerResourceVO.MaxDomainResource.set(derivedStats.MaxDomainResource);
				PlayerProgressionVO.ExperienceToNextLevel.set(derivedStats.ExperienceToNextLevel);
			}
		});
	}
}
