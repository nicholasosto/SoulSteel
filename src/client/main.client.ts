/* Utility */
import Logger from "shared/Utility/Logger";

/* WCS */
import WcsClient from "./_WCS/WCSClient";

/* Controllers */
import KeyboardController from "client/Keyboard/Keyboard";
import ClientUIController from "./Controllers/ClientUIController";
import MovementController  from "./Controllers/MovementController";

import { initializeTargetSelection } from "client/TargetSelector/TargetSelector";

class GameClient {
	private static _instance: GameClient;

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
			ClientUIController.Start();
			KeyboardController.Start();
			new MovementController();

			/* Initialize Target Selection */
			initializeTargetSelection();
		}
	}
}

GameClient.Start();
