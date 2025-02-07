// Utility Imports
import Logger from "shared/Utility/Logger";

// Roblox Services
import { Players, ReplicatedStorage } from "@rbxts/services";

// Manager Imports
import StorageManager from "shared/Storage Manager/StorageManager";
import DataManager from "server/Controllers/DataManager";

// Event Listeners
import StartSkillListeners from "server/net/SkillListeners";
import StartPlayerListeners from "server/net/PlayerListeners";

// Controllers
import GameCharacterController from "./Controllers/GameCharacterController";

// WCS Imports
import { CreateServer, Character } from "@rbxts/wcs";

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

// Start the Player Listeners
StartPlayerListeners();
StartSkillListeners();

// Start the Managers
DataManager.Start();
StorageManager.Start();
GameCharacterController.Start();
