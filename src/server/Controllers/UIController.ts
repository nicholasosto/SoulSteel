import Logger from "shared/Utility/Logger";
import { GameCycleEvents } from "server/net/_Server_Events";
import { SendNotification } from "shared/net/Remotes";
import { GetPlayerCharacter } from "shared/_Registry/EntityRegistration";
import { IPlayerData } from "shared/_Functions/DataFunctions";

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
		Logger.Log(script, playerCharacter?.dataManager.GetData() as unknown as string);

		print("NEW: ", playerDataM);
		GameCycleEvents.PlayerDataLoaded.SendToPlayer(player, playerDataM);
	}

	public static NotifyPlayer(player: Player, message: string, confirmation: boolean) {
		SendNotification(player, message, confirmation);
	}
}
