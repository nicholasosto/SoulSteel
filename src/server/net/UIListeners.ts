import DataManager from "server/Controllers/DataManager";
import { GameCycleEvents, CharacterEvent } from "server/net/_Server_Events";
import { ResourceId } from "shared/Game Character/Character Resources/Resources";
import PCController from "server/Controllers/PlayerCharacterController";
import Logger from "shared/Utility/Logger";

let _connection_UIReady: RBXScriptConnection | undefined;

export function StartUIListeners() {
	_connection_UIReady?.Disconnect();
	_connection_UIReady = GameCycleEvents.PlayerUIReady.Connect((player: Player) => {
		let PC = PCController.GetPlayerCharacter(player);
		while (PC === undefined) {
			wait(0.5);
			PC = PCController.GetPlayerCharacter(player);
		}
		Logger.Log(script, "Player Character: Exp", PC.ExperienceResource as unknown as string);
		UIController.UpdatePlayerUI(player);
	});
}

export class UIController {
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
