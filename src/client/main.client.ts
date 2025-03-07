/* Utility */
import Logger from "shared/Utility/Logger";

/* WCS */
import WcsClient from "./_WCS/WCSClient";

/* Audio */
import AudioPlayer from "shared/Utility/AudioPlayer";

/* Input Controllers */
import KeyboardController from "client/Keyboard/Keyboard";
import MovementController from "./Controllers/MovementController";
import ClientTargetController from "./Controllers/ClientTargetController";

/* UI Controllers */
import StartScreenController from "./ScreenGUIs/StartScreen/StartScreenController";
import MainMenuController from "./ScreenGUIs/MainMenu";
import SkillBarController from "./Controllers/SkillBarController";
import CharacterFrameController from "./Controllers/CharacterFrameController";

/* Collections */
import { CollectTransparencyTweens } from "./Collectors/PulseTween";

/* Other */
import { PlayerGUI } from "./ScreenGUIs/GUI_Index";

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

			/* UI Controllers */
			MainMenuController.Start();
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
		}
	}
}

GameClient.Start();
