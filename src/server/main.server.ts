// Utility Imports
import Logger from "shared/Utility/Logger";

// Roblox Services
import { ReplicatedStorage, Players } from "@rbxts/services";

// WCS Imports
import { Character, CreateServer } from "@rbxts/wcs";

// Manager Imports
import StorageManager from "shared/Storage/StorageManager";
import OldDataManager from "server/Controllers/OldDataManager";

// Controllers
import PCController from "./Controllers/PlayerCharacterController";
//import StartDeveloperListener from "./net/DeveloperListener";
import SkillController from "./Controllers/SkillController";
import UIController from "./Controllers/UIController";

// Collections
import { StartCollectingNPCs } from "./Collections/NPCCollector";
import { StartCollectingLava } from "./Collections/LavaCollector";
import { StartCollectingResourceDrains } from "./Collections/ResourceDrain";
import { StartZoneDetection } from "./Collections/ZoneCollector";
import StartQuestBlockCollection from "./Collections/QuestBlock";

// Event Listeners
import { StartUIListeners } from "./net/UIListeners";
import StartTeleportListener from "./net/TeleportListener";
import { TGameCharacter } from "shared/_Types/TGameCharacter";
import { sendMessageToOpenAI } from "server/API Calls/OpenAI";

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
			OldDataManager.Start();
			StorageManager.Start();
			/* Start WCS */
			GameServer.StartWCS();

			wait(1.5); // Wait for the WCS Server and DataManager to start and register the directories

			PCController.Start();
			SkillController.Start();
		}
	}

	public static StartWCS() {
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
const _playerConnections: Map<Player, RBXScriptConnection> = new Map();
const _destroyConnection: Map<Player, RBXScriptConnection> = new Map();

/* Start the Listeners */
StartUIListeners();
StartTeleportListener();
//StartDeveloperListener();

/* Start the Collections */
StartCollectingNPCs();
StartCollectingLava();
StartCollectingResourceDrains();
StartZoneDetection();
StartQuestBlockCollection();

/* Handle Player Added */
function HandleCharacterAdded(player: Player, character: TGameCharacter | undefined): boolean {
	if (character === undefined) return false;
	if (player === undefined) return false;

	const playerCharacter = PCController.CreatePlayerCharacter(player, character);
	if (playerCharacter === undefined) return false;

	const humanoid = character.Humanoid;
	if (humanoid === undefined) return false;

	_destroyConnection.set(
		player,
		humanoid.Died.Connect(() => {
			Logger.Log("Flow - Player Died: ", player.Name);
			PCController.RemovePlayerCharacter(player);
		}),
	);

	UIController.UpdatePlayerUI(player);

	return true;
}

function HandlePlayerAdded(player: Player) {
	/* If character exists */

	const _topSuccess = HandleCharacterAdded(player, player.Character as TGameCharacter);
	Logger.Log("Flow - Player Added [Handle Player - Existing]: " + _topSuccess);
	_playerConnections.get(player)?.Disconnect();
	_playerConnections.set(
		player,
		player.CharacterAdded.Connect((character) => {
			const success = HandleCharacterAdded(player, character as TGameCharacter);
			Logger.Log("Flow - Player Added [Handle Player - New]: " + success);
		}),
	);
}

/* Player Added Event */
Players.PlayerAdded.Connect((player) => {
	Logger.Log("Flow - Player Added [Start]: Existing Player");
	HandlePlayerAdded(player);
});

/* Get Existing Players: When the player joins before the server listens */
Players.GetPlayers().forEach((player) => {
	Logger.Log("Flow - Player Added [Start]: Existing Player");
	HandlePlayerAdded(player);
});

//const hello = sendMessageToOpenAI("Hello World!");
//Logger.Log("OpenAI", hello);
