// Utility Imports
import Logger from "shared/Utility/Logger";

// Roblox Services
import { ReplicatedStorage } from "@rbxts/services";

// WCS Imports
import { CreateServer } from "@rbxts/wcs";
// Manager Imports
import StorageManager from "shared/Storage Manager/StorageManager";
import DataManager from "server/Controllers/DataManager";

// Event Listeners

import StartTeleportListener from "./net/TeleportListener";

// Controllers
import CharacterController from "./Controllers/CharacterController";
import StartDeveloperListener from "./net/DeveloperListener";
import SkillController from "./Controllers/SkillController";
import { GameCycleEvents } from "./net/ServerEvents";

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

			CharacterController.Start();
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

GameServer.Start();

StartTeleportListener();
StartDeveloperListener();
