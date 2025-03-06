import Logger from "shared/Utility/Logger";
import { SendNotification } from "shared/net/Remotes";
import { GetPlayerCharacter } from "shared/_Registry/EntityRegistration";
import { IPlayerData } from "shared/_Functions/DataFunctions";
import { Remotes } from "shared/net/Remotes";

export default class UIController {
	// Singleton
	private static _instance: UIController;

	// Constructor
	private constructor() {
		Logger.Log(script, "CONSTRUCTOR()");
	}

	public static Start() {
		if (this._instance === undefined) {
			this._instance = new UIController();
		}
	}
	public static UpdatePlayerUI(player: Player) {
		Logger.Log(script, "[GameCycle - UI Controller] - UpdatePlayerUI / PlayerDataLoaded");
		const playerCharacter = GetPlayerCharacter(player);
		const playerDataM = playerCharacter?.dataManager.GetData() as IPlayerData;
		if (playerDataM === undefined) {
			warn("Player Data is undefined");
			return;
		}
		Remotes.Server.Get("SendPlayerData").SendToPlayer(player, playerDataM);
	}

	public static NotifyPlayer(player: Player, success: boolean, title: string, message: string) {
		SendNotification(player, success, title, message);
	}
}
