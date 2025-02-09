/* Utility */
import Logger from "shared/Utility/Logger";

/* WCS */
import WcsClient from "./_WCS/WCSClient";

/* Controllers */
import KeyboardController from "client/Keyboard/Keyboard";
import UIController from "./net/Controllers/UIController";

import { initializeTargetSelection } from "client/TargetSelector/TargetSelector";

//import { GameCycleEvents } from "./net/ClientEvents";

class GameClient {
	private static _instance: GameClient;

	/* Connections */
	private static _skillControllerStarted: RBXScriptConnection | undefined;
	private static _dataManagerStarted: RBXScriptConnection | undefined;
	private static _characterControllerStarted: RBXScriptConnection | undefined;

	/* Constructor */
	constructor() {
		Logger.Log("MAIN CLIENT", "Client Singleton: Instantiated");
	}

	public static Start() {
		if (this._instance === undefined) {
			/* Create the Game Client */
			this._instance = new GameClient();

			/* Start the WCS Client */
			WcsClient.Start();

			/* Controllers */
			UIController.Start();
			KeyboardController.Start();

			/* Initialize Target Selection */
			initializeTargetSelection();
		}
	}
}

GameClient.Start();
