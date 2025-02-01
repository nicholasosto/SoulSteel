// Roblox Services
import { Players, ReplicatedStorage } from "@rbxts/services";

// Manager Imports
import { StorageManager } from "shared/Storage Manager/StorageManager";
import { DataManager } from "server/Controllers/DataManager";

// Remote Handler Imports
import "server/RemoteHandlers/PlayerRemoteHandler";
import { SkillRemoteStart } from "./RemoteHandlers/SkillRemoteHandler";
// WCS Imports
import { CreateServer, Character } from "@rbxts/wcs";

// Player Character Imports
import { CreatePlayerCharacter } from "./Character/PlayerCharacter";

// Utility Imports
import Logger from "shared/Utility/Logger";

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
SkillRemoteStart();
DataManager.Start();
StorageManager.Start();

// Player Added Connection
Players.PlayerAdded.Connect((player) => {
	player.CharacterAdded.Connect((character) => {
		// Create the WCS Character
		const wcsCharacter = new Character(character);

		// Create the Player Character
		const playerCharacter = CreatePlayerCharacter(player, wcsCharacter);

		// Humanoid Died Connection
		wcsCharacter.Humanoid.Died.Once(() => {
			Logger.Log(script, "Character Died");
			playerCharacter.Destroy();
			wcsCharacter.Destroy();
		});
	});
});
