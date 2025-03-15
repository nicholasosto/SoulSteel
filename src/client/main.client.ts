import { Players } from "@rbxts/services";
/* Utility */
import Logger from "shared/Utility/Logger";

/* Storage */
import GameItemManager from "shared/GameItemManager/GameItemManager";

/* WCS */
import WcsClient from "./_WCS/WCSClient";

/* Audio */
import AudioPlayer from "shared/Utility/AudioPlayer";
import GUICollection from "shared/User Interface Classes/GUICollection";

/* Input Controllers */
import KeyboardController from "client/Controllers/Input/KeyboardController";
import MovementController from "./Controllers/Input/MovementController";
import ClientTargetController from "../shared/User Interface Classes/Controllers/ClientTargetController";

/*Network */
import ClientNetManager from "./Net/ClientNetManager";

/* UI Controllers */
import UIManager from "client/UIManager";
//import StartScreenController from "./Controllers/UI/StartScreenController";
//import MainMenuController from "./Controllers/UI/MainMenuController";
//import SkillBarController from "./Controllers/UI/SkillBarController";
//import CharacterFrameController from "./Controllers/UI/CharacterFrameController";
//import TeleportPanelController from "./Controllers/UI/TeleportPanelController";
//import AttributesGUIController from "shared/_ObserverPattern/_Observers/AttibutesGUIController";

/* Collections */
import { CollectTransparencyTweens } from "./Collectors/PulseTween";

/* Remotes */
import { Remotes } from "shared/net/Remotes";

/* Other */
//import { AttributesFrame, PlayerGUI } from "./_Helpers/GUI_Index";
//import SkillUIController from "client/__PlanningVersion/SkillUIController";

class GameClient {
	private static _instance: GameClient;

	/* Remotes */
	//private static _PlayerDataRequest = Remotes.Client.Get("PlayerDataRequest");

	/* Constructor */
	constructor() {
		warn("Game Client: Instantiated");
	}

	public static Start() {
		if (this._instance === undefined) {
			warn("Game Client: Starting");
			/* Create the Game Client */
			this._instance = new GameClient();

			ClientNetManager.Start();
			/* Start the Storage Managers */
			//GameItemManager.Start();
			//GUICollection.GetInstance();

			//print("Game Client: Storage Managers Started");
			/* Start the WCS Client */
			WcsClient.Start();
			//print("Game Client: WCS Client Started");
			/* UI Controllers */
			//MainMenuController.Start();
			//TeleportPanelController.Start();
			//StartScreenController.Start(PlayerGUI.FindFirstChild("StartScreen") as ScreenGui);
			//CharacterFrameController.Start();
			//SkillBarController.Start();
			//AttributesGUIController.Start(AttributesFrame);
			//print("Game Client: UI Controllers Started");

			/* Input Controllers */
			//KeyboardController.Start();
			//new MovementController();
			//ClientTargetController.Start();
			//print("Game Client: Input Controllers Started");
			/* Collections */
			CollectTransparencyTweens();

			/* Audio */
			//AudioPlayer.PlayCreepyMoan();

			/* Player Data Request */
			//this._PlayerDataRequest.SendToServer();
		}
	}
}

GameClient.Start();
/*Test */
UIManager.Start();
/* Log Client Loaded */
warn("Client: Fully Loaded");
