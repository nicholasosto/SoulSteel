/* Utility */
import Logger from "shared/Utility/Logger";

/* WCS */
import WcsClient from "./_WCS/WCSClient";

/* Audio */
import AudioPlayer from "shared/Utility/AudioPlayer";

/* Input Controllers */
import KeyboardController from "client/Controllers/Input/KeyboardController";
import MovementController from "./Controllers/Input/MovementController";
import ClientTargetController from "./Controllers/Input/ClientTargetController";

/* UI Controllers */
import StartScreenController from "./Controllers/UI/StartScreenController";
import MainMenuController from "./Controllers/UI/MainMenuController";
import SkillBarController from "./Controllers/UI/SkillBarController";
import CharacterFrameController from "./Controllers/UI/CharacterFrameController";
import TeleportPanelController from "./Controllers/UI/TeleportPanelController";

/* Collections */
import { CollectTransparencyTweens } from "./Collectors/PulseTween";

/* Remotes */
import { Remotes } from "shared/net/Remotes";

/* Other */
import { PlayerGUI } from "./_Helpers/GUI_Index";

class GameClient {
	private static _instance: GameClient;

	/* Remotes */
	private static _PlayerDataRequest = Remotes.Client.Get("PlayerDataRequest");

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

			/* UI Controllers */
			MainMenuController.Start();
			TeleportPanelController.Start();
			StartScreenController.Start(PlayerGUI.FindFirstChild("StartScreen") as ScreenGui);
			CharacterFrameController.Start();
			SkillBarController.Start();

			/* Input Controllers */
			KeyboardController.Start();
			new MovementController();
			ClientTargetController.Start();

			/* Collections */
			CollectTransparencyTweens();

			/* Audio */
			//AudioPlayer.PlayCreepyMoan();

			/* Player Data Request */
			Logger.Log("PlayerDataRequest", "Sending Request");
			this._PlayerDataRequest.SendToServer();
		}
	}
}

GameClient.Start();
