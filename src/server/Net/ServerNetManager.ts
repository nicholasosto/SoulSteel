import { RemoteEvents, RemoteFunctions } from "shared/net/Remotes";
import { SkillPanelData, SkillSlotMap } from "shared/_IDs/SkillIndex";
import { GetGameCharacter } from "shared/_Registry/EntityRegistration";
import PlayerCharacter from "server/Character/PlayerCharacter";
import { Character } from "@rbxts/wcs";
import { InfoFramePayload } from "shared/net/RemoteIndex";

/* Remote Functions */
const GetSkillPanelData = RemoteFunctions.Server.Get("GetSkillPanelData");
const GetSlotMapData = RemoteFunctions.Server.Get("GetSkillSlotMap");
const GetInfoFrameData = RemoteFunctions.Server.Get("GetCharacterFrameData");

/* Remote Events */
const UpdateSkillPanelEvent = RemoteEvents.Server.Get("UpdateSkillPanel");
const UpdateSkillSlotMapEvent = RemoteEvents.Server.Get("UpdateSkillSlotMap");
const UpdateInfoFrameEvent = RemoteEvents.Server.Get("UpdateInfoFrame");
// #TODO Add teleport, equipment, attributes, etc.

/*Singleton*/
export default class ServerNetManager {
	/*Instance*/
	private static _instance: ServerNetManager;

	/* Constructor */
	private constructor() {
		warn("ServerNetManager: Instantiated");
	}

	/* Start */
	public static Start() {
		if (this._instance === undefined) {
			this._instance = new ServerNetManager();
			print("ServerNetManager: Started");
			this.InitializeCallbacks();
		}
	}

	private static _getSkillPanelData(player: Player): SkillPanelData | undefined {
		const character = GetGameCharacter(tostring(player.UserId)) as PlayerCharacter | undefined;
		const skillPanelData = character?.dataManager?.GetSkillPanelData() as SkillPanelData | undefined;
		return skillPanelData;
	}

	private static _getSkillSlotMap(player: Player): SkillSlotMap | undefined {
		const character = GetGameCharacter(tostring(player.UserId)) as PlayerCharacter | undefined;
		const skillSlotMap = character?.dataManager?.GetSkillSlotMap() as SkillSlotMap | undefined;
		return skillSlotMap;
	}

	private static _getInfoFrameData(player: Player): InfoFramePayload | undefined {
		const character = GetGameCharacter(tostring(player.UserId)) as PlayerCharacter | undefined;
		const infoFrameData = character?.GetInfoFrameData() as InfoFramePayload | undefined;
		return infoFrameData;
	}

	/* Initialize Callbacks */
	private static InitializeCallbacks() {
		/*Get Skill Panel Data*/
		GetSkillPanelData.SetCallback(async (player: Player) => {
			const skillPanelData = this._getSkillPanelData(player);
			return skillPanelData;
		});

		/*Get Skill Slot Map*/
		GetSlotMapData.SetCallback(async (player: Player) => {
			const skillSlotMap = this._getSkillSlotMap(player);
			return skillSlotMap;
		});

		GetInfoFrameData.SetCallback(async (player: Player) => {
			const infoFrameData = this._getInfoFrameData(player);
			return infoFrameData;
		});
	}
	public static SendInfoFrameUpdate(player: Player) {
		const infoFrameData = this._getInfoFrameData(player);
		if (infoFrameData !== undefined) {
			UpdateInfoFrameEvent.SendToPlayer(player, infoFrameData);
			print("Sent InfoFrame Update to player:", player.Name);
		}
	}

	/* Wrapper Network Functions */
	/* HUD - Character Frame */

	/* Skill Panel */
	public static SendSkillPanelUpdate(player: Player) {
		const skillPanelData = this._getSkillPanelData(player);
		if (skillPanelData !== undefined) {
			UpdateSkillPanelEvent.SendToPlayer(player, skillPanelData);
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
