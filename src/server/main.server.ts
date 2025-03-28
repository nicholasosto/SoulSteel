// // Utility Imports
// import Logger from "shared/Utility/Logger";

// // Roblox Services
// import { ReplicatedStorage, Players } from "@rbxts/services";

// // WCS Imports
// import { CreateServer } from "@rbxts/wcs";

// // Manager Imports
// import StorageManager from "shared/Storage/StorageManager";

// // Subjects
// //import ScoreManager from "shared/State/ScoreManager";

// // Controllers
// import ServerNetManager from "./Net/ServerNetManager";
// import PCController from "./Controllers/PlayerCharacterController";
// //import SkillController from "./Controllers/SkillController";
// import TargetingController from "./Controllers/TargetingController";
// //import TeleportController from "./Controllers/TeleportController";
// //import PlayerDataController from "./Controllers/PlayerDataController";

// // Collections
// import { StartCollectingNPCs } from "./Collections/NPCCollector";
// import { StartCollectingLava } from "../shared/Collections/LavaCollector";
// import { StartCollectingOnTouchHumanoid } from "server/Collections/OnTouch_Humanoid";

// import { StartCollectingResourceDrains } from "../shared/Collections/ResourceDrain";
// import { StartZoneDetection } from "../shared/Collections/ZoneCollector";

// /* Types */
// import { TGameCharacter } from "shared/_Types/TGameCharacter";
// import { StartCollectingAntigravity } from "../shared/Collections/AntigravityCollector";


// class GameServer {
// 	private static _instance: GameServer;
// 	private static _wcsServerStarted: boolean = false;

// 	/* Constructor */
// 	constructor() {
// 		Logger.Log("MAIN SERVER", "Server Singleton: Instantiated");
// 	}

// 	public static Start() {
// 		if (this._instance === undefined) {
// 			this._instance = new GameServer();
// 			StorageManager.Start();
// 			ServerNetManager.Start();
// 			/* Start WCS */
// 			GameServer.StartWCS();
// 			wait(1.5); // Wait for the WCS Server and DataManager to start and register the directories

// 			PCController.Start();
// 			TargetingController.Start();
// 		}
// 	}

// 	public static StartWCS() {
// 		if (!this._wcsServerStarted) {
// 			// Create the WCS Server
// 			const WCSServer = CreateServer();

// 			// Reference the Parent WCS Directory
// 			const ParentWCSDirectory = ReplicatedStorage.WaitForChild("TS").WaitForChild("Skills");

// 			// WCS Directories
// 			const SkillsDirectorory = ParentWCSDirectory.WaitForChild("WCSSkills");
// 			const StatusDirectory = ParentWCSDirectory.WaitForChild("WCSStatus");

// 			// Register the WCS Directories
// 			WCSServer.RegisterDirectory(SkillsDirectorory);
// 			WCSServer.RegisterDirectory(StatusDirectory);

// 			// Start the WCS Server
// 			WCSServer.Start();
// 			this._wcsServerStarted = true;
// 		}
// 	}
// }

// /* Start the Game Server */
// GameServer.Start();
// const _playerConnections: Map<Player, RBXScriptConnection> = new Map();
// const _destroyConnections: Map<Player, RBXScriptConnection> = new Map();

// /* Start the Collections */
// StartCollectingNPCs();
// StartCollectingLava();
// StartCollectingResourceDrains();
// StartZoneDetection();
// StartCollectingAntigravity();
// StartCollectingOnTouchHumanoid();

// /* Notify Collections Loaded */
// warn("Server: Collections Loaded");

// /* Handle Character Added */
// function HandleCharacterAdded(player: Player, character: TGameCharacter | undefined): boolean {
// 	/* Check if the character exists */
// 	if (character === undefined) return false;
// 	if (player === undefined) return false;

// 	/* Create the Player Character */
// 	const playerCharacter = PCController.CreatePlayerCharacter(player, character);

// 	if (playerCharacter === undefined) return false;

// 	/* Handle Player Death */
// 	const humanoid = character.Humanoid;
// 	if (humanoid === undefined) return false;

// 	/* Destroy the Player Character */
// 	_destroyConnections.get(player)?.Disconnect();
// 	_destroyConnections.set(
// 		player,
// 		humanoid.Died.Connect(() => {
// 			PCController.RemovePlayerCharacter(player);
// 		}),
// 	);

// 	return true;
// }

// /* Handle Player Added */
// function HandlePlayerAdded(player: Player) {
// 	/* Add Character Handler */
// 	const _topSuccess = HandleCharacterAdded(player, player.Character as TGameCharacter);
// 	if (!_topSuccess) {
// 		warn("Error: Failed to handle character added");
// 	}
// 	_playerConnections.get(player)?.Disconnect();
// 	_playerConnections.set(
// 		player,
// 		player.CharacterAdded.Connect((character) => {
// 			const success = HandleCharacterAdded(player, character as TGameCharacter);
// 			if (!success) {
// 				warn("Error: Failed to handle character added");
// 			}
// 		}),
// 	);
// }

// /* Player Added Event */
// Players.PlayerAdded.Connect((player) => {
// 	warn("Server: Player Added", player.Name);
// 	HandlePlayerAdded(player);
// });

// /* Get Existing Players: When the player joins before the server listens */
// Players.GetPlayers().forEach((player) => {
// 	warn("Server: Existing Player", player.Name);
// 	player.LoadCharacterWithHumanoidDescription(new Instance("HumanoidDescription"));
// 	HandlePlayerAdded(player);
// });

// /* Log Server Loaded */
// warn("Server: Loaded");
