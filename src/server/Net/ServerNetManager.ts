import { RemoteEvents, RemoteFunctions } from "shared/net/Remotes";
import { SkillPanelData, SkillSlotMap } from "shared/_IDs/SkillIndex";
import { GetGameCharacter } from "shared/_Registry/EntityRegistration";
//import { ReCalculateDerivedStats } from "server/Character/Helpers/StatsHelper";
import PlayerCharacter from "server/Character/PlayerCharacter";
import * as Payloads from "shared/net/RemoteIndex";
import { GetPlayerData } from "serverStorage/ProfileServiceStorage";
//import { PlayerState } from "shared/__FusionSystem/PlayerState";
//import IPlayerData from "shared/_Interfaces/Player Data/IPlayerData";

/* Remote Functions */
// const GetSlotMapData = RemoteFunctions.Server.Get("GetSkillSlotMap");
// const GetEquipmentSlotMap = RemoteFunctions.Server.Get("GetEquipmentSlotMap");
// const GetDerivedStats = RemoteFunctions.Server.Get("GetDerivedStats");
const GetPlayerDataRF = RemoteFunctions.Server.Get("GetPlayerData");
//const GetInfoFrameData = RemoteFunctions.Server.Get("GetCharacterFrameData");

/* Remote Events */
const ClientUpdateTarget = RemoteEvents.Server.Get("ClientUpdateTarget"); // Target Update
const UpdateSkillSlotMapEvent = RemoteEvents.Server.Get("UpdateSkillSlotMap"); // Skill Slot Map Update
const UpdateDerivedStatsEvent = RemoteEvents.Server.Get("UpdateDerivedStats"); // Derived Stats Update
//const UpdateInfoFrameEvent = RemoteEvents.Server.Get("UpdateInfoFrame"); // Info Frame Update
const SendPlayerData = RemoteEvents.Server.Get("SendPlayerData"); // Player Data Update
const CreateGameCharacter = RemoteEvents.Server.Get("CreateCharacter"); // Create Character
const TestLevelUp = RemoteEvents.Server.Get("ClientTestLevelUp"); // Test Level Up

/* Fusion Updates */
const SendResourceData = RemoteEvents.Server.Get("SendResourceData");

/*Singleton*/
export default class ServerNetManager {
	/*Instance*/
	private static _instance: ServerNetManager;

	/* Data Connections */
	private static _clientUpdateTarget: RBXScriptConnection | undefined;
	private static _createGameCharacter: RBXScriptConnection | undefined;

	private static _clientTestLevelUp: RBXScriptConnection | undefined;

	/* Constructor */
	private constructor() {
		warn("ServerNetManager: Instantiated");
	}

	/* Start */
	public static Start() {
		if (this._instance === undefined) {
			this._instance = new ServerNetManager();
			print("ServerNetManager: Started");
			this.initializeListeners();
			this.InitializeCallbacks();
		}
	}

	private static initializeListeners() {
		/* Client Update Target */
		this._clientUpdateTarget?.Disconnect();
		this._clientUpdateTarget = ClientUpdateTarget.Connect((player: Player, target: string) => {
			print(`Client Target Updated: ${target}`);
		});

		/* Test Level Up */
		this._clientTestLevelUp?.Disconnect();
		this._clientTestLevelUp = TestLevelUp.Connect((player: Player) => {
			print("Client Test Level Up");
			const character = GetGameCharacter(tostring(player.UserId)) as PlayerCharacter | undefined;
			print("Character: ", character);
		});

		/* Create Game Character */
		this._createGameCharacter?.Disconnect();
		this._createGameCharacter = CreateGameCharacter.Connect(
			(player: Player, displayName: string, selectedRace: string) => {
				print("Creating Game Character: ", displayName, selectedRace);
			},
		);
	}

	private static _getSkillSlotMap(player: Player): Payloads.PSkillSlotMap | undefined {
		const character = GetGameCharacter(tostring(player.UserId)) as PlayerCharacter | undefined;
		const skillSlotMap = character?.dataManager?.GetSkillSlotMap() as SkillSlotMap | undefined;
		return skillSlotMap;
	}

	private static _getEquipmentSlotMap(player: Player): Payloads.PEquipmentSlotMap | undefined {
		const character = GetGameCharacter(tostring(player.UserId)) as PlayerCharacter | undefined;
		const equipmentSlotMap = character?.dataManager?.GetEquipmentSlotMap() as
			| Payloads.PEquipmentSlotMap
			| undefined;
		return equipmentSlotMap;
	}

	/* Initialize Callbacks */
	private static InitializeCallbacks() {
		/*Get Player Data*/
		GetPlayerDataRF.SetCallback(async (player: Player) => {
			warn("ServerNetManager: Callback - GetPlayerData");
			const playerData = GetPlayerData(player);
			if (playerData === undefined) {
				warn("Error: Failed to load player data");
				return undefined;
			} else {
				print("Player Data: ", playerData);
			}
			return playerData;
		});
		/*Get Skill Slot Map*/
		// GetSlotMapData.SetCallback(async (player: Player) => {
		// 	warn("ServerNetManager: Callback - GetSkillSlotMap");
		// 	const skillSlotMap = this._getSkillSlotMap(player);
		// 	return skillSlotMap;
		// });

		// /*Get Equipment Slot Map*/
		// GetEquipmentSlotMap.SetCallback(async (player: Player) => {
		// 	warn("ServerNetManager: Callback - GetEquipmentSlotMap");
		// 	const skillPanelData = this._getEquipmentSlotMap(player);
		// 	return skillPanelData;
		// });

		// /*Get Derived Stats*/
		// GetDerivedStats.SetCallback(async (player: Player) => {
		// 	warn("ServerNetManager: Callback - GetDerivedStats");
		// 	/* Start Profile Test */
		// 	const profileData = GetPlayerData(player);
		// 	if (profileData === undefined) {
		// 		warn("Error: Failed to load player data");
		// 		return undefined;
		// 	} else {
		// 		print("Player Data: ", profileData);
		// 	}
		// 	/* End Profile Test */
		// 	const character = GetGameCharacter(tostring(player.UserId)) as PlayerCharacter | undefined;
		// 	const playerData = character?.dataManager?.GetData() as IPlayerData | undefined;
		// 	if (playerData === undefined) {
		// 		return undefined;
		// 	}
		// 	const derivedStats = ReCalculateDerivedStats(playerData);
		// 	return derivedStats;
		// });
	}

	public static SendDerivedStats(player: Player, derivedStats: Payloads.PDerivedStats) {
		warn("ServerNetManager: Called from another script to send derived stats");
		UpdateDerivedStatsEvent.SendToPlayer(player, derivedStats);
	}

	// public static SendPlayerData(player: Player, playerData: IPlayerData) {
	// 	warn("ServerNetManager: Called from another script to send player data");
	// 	SendPlayerData.SendToPlayer(player, playerData);
	// }

	/* Fusion Updates */
	public static SendResourceData(player: Player, resourceData: Payloads.PCurrentResourceAmounts) {
		warn("ServerNetManager: Called from another script to send resource data");
		SendResourceData.SendToPlayer(player, resourceData);
	}

	/* Skill Slot Map (SkillBar) */
	public static SendSkillSlotMapUpdate(player: Player) {
		const skillSlotMap = this._getSkillSlotMap(player);
		if (skillSlotMap !== undefined) {
			UpdateSkillSlotMapEvent.SendToPlayer(player, skillSlotMap);
		}
	}
}
