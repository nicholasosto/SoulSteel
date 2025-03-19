import { Players } from "@rbxts/services";
/* Utility */
import Logger from "shared/Utility/Logger";

/* WCS */
import WcsClient from "./_Helpers/WCSClientSetup";

/* Input Controllers */
import KeyboardController from "client/Input/KeyboardController";
import MovementController from "client/Input/MovementController";
import ClientTargetController from "client/Input/ClientTargetController";

/*Network */
import ClientNetManager from "./Net/ClientNetManager";

/* UI Controllers */
import UIManager from "client/UI Controllers/UIManager";
import GUIStateController from "shared/State/GUI State/GUIStateController";

/* Collections */
import { CollectTransparencyTweens } from "../shared/PulseTween";
import { StartCollectingCloseButtons } from "shared/Collections/CloseButton";

/* Tests */
import EquipmentManager from "shared/Storage/EquipmentManager";

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

			/* UI Controllers */
			UIManager.Start();
			GUIStateController.Start();
			ClientNetManager.Start();
			EquipmentManager.Start();

			/* Start the WCS Client */
			WcsClient.Start();

			/* Input Controllers */
			KeyboardController.Start();
			new MovementController();
			ClientTargetController.Start();

			/* Collections */
			CollectTransparencyTweens();
			StartCollectingCloseButtons();

		}
	}
}

GameClient.Start();
/*Test */

/* Log Client Loaded */
warn("Client: Fully Loaded");
