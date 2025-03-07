/* Utility */
import Logger from "shared/Utility/Logger";

/* WCS */
import WcsClient from "./_WCS/WCSClient";

/* Controllers */
import AudioPlayer from "shared/Utility/AudioPlayer";
import KeyboardController from "client/Keyboard/Keyboard";
import ClientUIController from "./Controllers/ClientUIController";
import SkillBarController from "./Controllers/SkillBarController";
import MovementController from "./Controllers/MovementController";
import PlayerGUIController from "./PlayerGUIController/PlayerGUIController";
import StartScreenController from "./ScreenGUIs/StartScreen/StartScreenController";
import MainMenu from "./ScreenGUIs/MainMenu";

import { initializeTargetSelection } from "client/TargetSelector/TargetSelector";
import CharacterFrameController from "./Controllers/CharacterFrameController";
import { CollectTransparencyTweens } from "./Collectors/PulseTween";
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

			/* Controllers */
			StartScreenController.Start(PlayerGUI.FindFirstChild("StartScreen") as ScreenGui);
			MainMenu.Start();
			ClientUIController.Start();
			CharacterFrameController.Start();
			KeyboardController.Start();
			new MovementController();

			/* Initialize Target Selection */
			initializeTargetSelection();
		}
	}
}

GameClient.Start();
//AudioPlayer.PlayCreepyMoan();
SkillBarController.StartSkillBarListeners();
CollectTransparencyTweens();
PlayerGUIController.Start();
