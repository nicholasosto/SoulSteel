import Logger from "shared/Utility/Logger";
import { ResourceId } from "shared/_Types/GameCharacterShared";
import DataManager from "server/Controllers/DataManager";
import { GameCycleEvents, CharacterEvent } from "server/net/_Server_Events";

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

	public static UpdateResourceBar(
		player: Player,
		resource: { resourceId: ResourceId; current: number; max: number },
	) {
		Logger.Log(script, "[GameCycle - UI Controller] - UpdateResourceBar / ResourceUpdated");
		CharacterEvent.ResourceUpdated.SendToPlayer(player, resource);
	}

	public static UpdatePlayerUI(player: Player) {
		Logger.Log(script, "[GameCycle - UI Controller] - UpdatePlayerUI / PlayerDataLoaded");
		const playerData = DataManager.GetDataCache(player)._playerData;
		print(playerData);
		GameCycleEvents.PlayerDataLoaded.SendToPlayer(player, playerData);
	}
}
