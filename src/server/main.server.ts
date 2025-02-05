// Utility Imports
import Logger from "shared/Utility/Logger";

// Roblox Services
import { Players, ReplicatedStorage } from "@rbxts/services";

// Manager Imports
import { StorageManager } from "shared/Storage Manager/StorageManager";
import { DataManager } from "server/Controllers/DataManager";

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

// Start the Managers
//SkillRemoteStart();

DataManager.Start();
StorageManager.Start();
GameCharacterController.Start();

// Player Added Connection
Players.PlayerAdded.Connect((player) => {
	player.CharacterAdded.Connect((character) => {
		//Create the WCS Character
		const wcsCharacter = new Character(character);

		const playerData = DataManager.GetDataCache(tostring(player.UserId));
		GameCharacterController.CreateGameCharacter(wcsCharacter, playerData._playerData);

		// Humanoid Died Connection
		wcsCharacter.Humanoid.Died.Once(() => {
			Logger.Log(script, "Character Died");
			GameCharacterController.DestroyGameCharacter(tostring(player.UserId));
		});
	});
});
