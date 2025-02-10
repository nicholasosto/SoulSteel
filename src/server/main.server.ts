// Utility Imports
import Logger from "shared/Utility/Logger";

// Roblox Services
import { ReplicatedStorage, Players } from "@rbxts/services";

// WCS Imports
import { Character, CreateServer } from "@rbxts/wcs";
// Manager Imports
import StorageManager from "shared/Storage Manager/StorageManager";
import DataManager from "server/Controllers/DataManager";

// Event Listeners

import StartTeleportListener from "./net/TeleportListener";

// Controllers
import PCController from "./Controllers/PlayerCharacterController";
import StartDeveloperListener from "./net/DeveloperListener";
import SkillController from "./Controllers/SkillController";
import { StartUIListeners, UIController } from "./net/UIListeners";
//import { GameCycleEvents } from "./net/ServerEvents";

class GameServer {
	private static _instance: GameServer;
	private static _wcsServerStarted: boolean = false;

	/* Constructor */
	constructor() {
		Logger.Log("MAIN SERVER", "Server Singleton: Instantiated");
	}

	public static Start() {
		if (this._instance === undefined) {
			this._instance = new GameServer();
			/* Start Data Manager */
			DataManager.Start();
			StorageManager.Start();
			/* Start WCS */
			GameServer.StartWCS();

			wait(1.5); // Wait for the WCS Server and DataManager to start and register the directories

			PCController.Start();
			SkillController.Start();
		}
	}

	public static StartWCS() {
		Logger.Log(script, "StartWCS()");

		if (!this._wcsServerStarted) {
			// Create the WCS Server
			const WCSServer = CreateServer();

			// Reference the Parent WCS Directory
			const ParentWCSDirectory = ReplicatedStorage.WaitForChild("TS").WaitForChild("Skills");

			// WCS Directories
			const SkillsDirectorory = ParentWCSDirectory.WaitForChild("WCSSkills");
			const StatusDirectory = ParentWCSDirectory.WaitForChild("WCSStatus");

			// Register the WCS Directories
			WCSServer.RegisterDirectory(SkillsDirectorory);
			WCSServer.RegisterDirectory(StatusDirectory);

			// Start the WCS Server
			WCSServer.Start();
			this._wcsServerStarted = true;
		}
	}
}

/* Start the Game Server */
GameServer.Start();

/* Handle Player Added */
function HandlePlayerAdded(player: Player) {
	/* Create the Player Character */
	player.CharacterAdded.Connect((character) => {
		/* Character Controller */
		PCController.OnCharacterAdded(player, character);
		UIController.UpdatePlayerUI(player);

		/* Humanoid and WCS cleanup */
		const humanoid = character.WaitForChild("Humanoid") as Humanoid;
		humanoid.Died.Connect(() => {
			Logger.Log("[MAIN SERVER] - Character Removed: ", character);
			PCController.OnCharacterRemoved(player);
		});
	});
}

/* Get Existing Players: When the player joins before the server listens */
Players.GetPlayers().forEach((player) => {
	HandlePlayerAdded(player);
});

/* Player Added Event */
Players.PlayerAdded.Connect((player) => {
	HandlePlayerAdded(player);
});
StartUIListeners();
StartTeleportListener();
StartDeveloperListener();
