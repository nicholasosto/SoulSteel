// Utility Imports
import Logger from "shared/Utility/Logger";

// Roblox Services
import { ReplicatedStorage, Players } from "@rbxts/services";

// WCS Imports
import { CreateServer } from "@rbxts/wcs";

// Manager Imports
import StorageManager from "shared/Storage/StorageManager";

// Controllers
import PCController from "./Controllers/PlayerCharacterController";
import SkillController from "./Controllers/SkillController";
import TargetingController from "./Controllers/TargetingController";
import TeleportController from "./Controllers/TeleportController";
import PlayerDataController from "./Controllers/PlayerDataController";

// Collections
import { StartCollectingNPCs } from "./Collections/NPCCollector";
import { StartCollectingLava } from "./Collections/LavaCollector";
import { StartCollectingResourceDrains } from "./Collections/ResourceDrain";
import { StartZoneDetection } from "./Collections/ZoneCollector";
import StartQuestBlockCollection from "./Collections/QuestBlock";

/* Types */
import { TGameCharacter } from "shared/_Types/TGameCharacter";

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
			StorageManager.Start();
			/* Start WCS */
			GameServer.StartWCS();
			PlayerDataController.Start();
			wait(1.5); // Wait for the WCS Server and DataManager to start and register the directories

			PCController.Start();
			SkillController.Start();
			TargetingController.Start();
			TeleportController.Start();
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
//StartTeleportListener();

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
