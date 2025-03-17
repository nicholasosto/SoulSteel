import { RemoteEvents, RemoteFunctions } from "shared/net/Remotes";
import { SkillPanelData, SkillSlotMap } from "shared/_IDs/SkillIndex";
import { GetGameCharacter } from "shared/_Registry/EntityRegistration";
import PlayerCharacter from "server/Character/PlayerCharacter";
import * as Payloads from "shared/net/RemoteIndex";

/* Remote Functions */
const GetSlotMapData = RemoteFunctions.Server.Get("GetSkillSlotMap");
const GetInfoFrameData = RemoteFunctions.Server.Get("GetCharacterFrameData");

/* Remote Events */
const UpdateSkillSlotMapEvent = RemoteEvents.Server.Get("UpdateSkillSlotMap");
const UpdateInfoFrameEvent = RemoteEvents.Server.Get("UpdateInfoFrame");

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

	private static _getSkillSlotMap(player: Player): Payloads.PSkillSlotMap | undefined {
		const character = GetGameCharacter(tostring(player.UserId)) as PlayerCharacter | undefined;
		const skillSlotMap = character?.dataManager?.GetSkillSlotMap() as SkillSlotMap | undefined;
		return skillSlotMap;
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

		/*Get InfoFrame Data*/
		GetInfoFrameData.SetCallback(async (player: Player) => {
			const infoFrameData = this._getInfoFrameData(player);
			return infoFrameData;
		});
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
