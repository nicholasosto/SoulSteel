import { RemoteEvents, RemoteFunctions } from "shared/net/Remotes";
import { SkillPanelData, SkillSlotMap } from "shared/_IDs/SkillIndex";
import { GetGameCharacter } from "shared/_Registry/EntityRegistration";
import PlayerCharacter from "server/Character/PlayerCharacter";
import * as Payloads from "shared/net/RemoteIndex";
import IPlayerData from "shared/_Interfaces/Player Data/IPlayerData";

/* Remote Functions */
const GetSlotMapData = RemoteFunctions.Server.Get("GetSkillSlotMap");
const GetEquipmentSlotMap = RemoteFunctions.Server.Get("GetEquipmentSlotMap");
const GetInfoFrameData = RemoteFunctions.Server.Get("GetCharacterFrameData");

/* Remote Events */
const UpdateSkillSlotMapEvent = RemoteEvents.Server.Get("UpdateSkillSlotMap");
const UpdateInfoFrameEvent = RemoteEvents.Server.Get("UpdateInfoFrame");
const SendPlayerData = RemoteEvents.Server.Get("SendPlayerData");
const TestSendEvent = RemoteEvents.Server.Get("TestSendEvent");

/*Singleton*/
export default class ServerNetManager {
	/*Instance*/
	private static _instance: ServerNetManager;

	/* Data Connections */
	private static _onTestSend: RBXScriptConnection | undefined;

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
		/* Test Send Event */
		this._onTestSend?.Disconnect();
		this._onTestSend = TestSendEvent.Connect((player: Player, eventName: string) => {
			this._HandleTestSend(player, eventName);
		});
	}

	private static _HandleTestSend(player: Player, eventName: string) {
		switch (eventName) {
			case "EquipSkill":
				print(`TestSendEvent: ${player.Name} triggered EquipSkill`);
				break;
			case "UnequipSkill":
				print(`TestSendEvent: ${player.Name} triggered UnequipSkill`);
				break;
			default:
				print(`TestSendEvent: ${player.Name} triggered an unknown event: ${eventName}`);
				break;
		}
	}

	private static _getSkillPanelData(player: Player): SkillPanelData | undefined {
		const character = GetGameCharacter(tostring(player.UserId)) as PlayerCharacter | undefined;
		const skillPanelData = character?.dataManager?.GetSkillPanelData() as SkillPanelData | undefined;
		return skillPanelData;
	}

	private static _getSkillSlotMap(player: Player): Payloads.PSkillSlotMap | undefined {
		const character = GetGameCharacter(tostring(player.UserId)) as PlayerCharacter | undefined;
		const skillSlotMap = character?.dataManager?.GetSkillSlotMap() as SkillSlotMap | undefined;
		return skillSlotMap;
	}

	private static _getEquipmentSlotMap(player: Player): Payloads.PEquipmentSlotMap | undefined {
		const character = GetGameCharacter(tostring(player.UserId)) as PlayerCharacter | undefined;
		const equipmentSlotMap = character?.dataManager?.GetEquipmentSlotMap() as Payloads.PEquipmentSlotMap | undefined;
		return equipmentSlotMap;
	}

	private static _getInfoFrameData(player: Player): Payloads.PInfoFrame | undefined {
		const character = GetGameCharacter(tostring(player.UserId)) as PlayerCharacter | undefined;
		const infoFrameData = character?.GetInfoFrameData() as Payloads.PInfoFrame | undefined;
		return infoFrameData;
	}

	/* Initialize Callbacks */
	private static InitializeCallbacks() {
		/*Get Skill Slot Map*/
		GetSlotMapData.SetCallback(async (player: Player) => {
			const skillSlotMap = this._getSkillSlotMap(player);
			return skillSlotMap;
		});

		/*Get Equipment Slot Map*/
		GetEquipmentSlotMap.SetCallback(async (player: Player) => {
			const skillPanelData = this._getEquipmentSlotMap(player);
			return skillPanelData;
		});

		/*Get InfoFrame Data*/
		GetInfoFrameData.SetCallback(async (player: Player) => {
			const infoFrameData = this._getInfoFrameData(player);
			return infoFrameData;
		});
	}

	public static SendPlayerData(player: Player, playerData: IPlayerData) {
		SendPlayerData.SendToPlayer(player, playerData);
	}

	/* Send InfoFrame Update */
	public static SendInfoFrameUpdate(player: Player) {
		const infoFrameData = this._getInfoFrameData(player);
		if (infoFrameData !== undefined) {
			UpdateInfoFrameEvent.SendToPlayer(player, infoFrameData);
		}
	}

	/* Skill Slot Map (SkillBar) */
	public static SendSkillSlotMapUpdate(player: Player) {
		const skillSlotMap = this._getSkillSlotMap(player);
		if (skillSlotMap !== undefined) {
			UpdateSkillSlotMapEvent.SendToPlayer(player, skillSlotMap);
		}
	}
}
