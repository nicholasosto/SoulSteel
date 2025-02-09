// Utility Imports
import Logger from "shared/Utility/Logger";
import KeyboardController from "client/Keyboard/Keyboard";
import { initializeTargetSelection } from "client/TargetSelector/TargetSelector";
import WcsClient from "./_WCS/WCSClient";
import { GameCycleEvents } from "./net/ClientEvents";

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

			/* Initialize Listeners */
			this._initializeListeners();
			// Start the Keyboard Controller
			initializeTargetSelection();
			KeyboardController.Start();

			Logger.Log(script, "Started()");
		}
	}

	private static _initializeListeners() {
		/* Skill Controller Started */
		this._skillControllerStarted?.Disconnect();
		this._skillControllerStarted = GameCycleEvents.SkillControllerStarted.Connect(() => {
			Logger.Log("REMOTE", "Skill Controller Started");
		});

		/* Data Manager Started */
		this._dataManagerStarted?.Disconnect();
		this._dataManagerStarted = GameCycleEvents.DataManagerStarted.Connect(() => {
			Logger.Log("REMOTE", "Data Manager Started");
		});

		/* Character Controller Started */
		this._characterControllerStarted?.Disconnect();
		this._characterControllerStarted = GameCycleEvents.CharacterControllerStarted.Connect(() => {
			Logger.Log("REMOTE", "Character Controller Started");
		});
	}
}

GameClient.Start();
