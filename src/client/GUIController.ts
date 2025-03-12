import { Remotes } from "shared/net/Remotes";
import { Players } from "@rbxts/services";
/* Observers */

/* Remotes */
const PlayerDataSent = Remotes.Client.Get("SendPlayerData");

export default class GUIController {
	/* Singleton Instance */
	private static _instance: GUIController;

	/* Connections */
	private static _playerDataConnection: RBXScriptConnection | undefined;

	/* Constructor */
	private constructor() {
		warn("Player GUI Controller: Started");
	}

	/* Start */
	public static Start() {
		if (this._instance === undefined) {
			this._instance = new GUIController();
			this.InitializeDataConnection();
		}
	}

	/* Initialize Data Connection */
	private static InitializeDataConnection() {
		this._playerDataConnection?.Disconnect();
		this._playerDataConnection = PlayerDataSent.Connect((playerData) => {
			//warn("GUI Controller: Player Data Received: ", playerData["CharacterStats"]);
		});
	}
}
