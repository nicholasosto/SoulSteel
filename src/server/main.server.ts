// Roblox Services
import { Players, ReplicatedStorage } from "@rbxts/services";

// Manager Imports
import { StorageManager } from "shared/_References/Managers/StorageManager";
import { DataManager } from "./PlayerData/DataManager";

// WCS Imports
import { CreateServer, Character } from "@rbxts/wcs";
import { BaseGameCharacter } from "./Character/GameCharacter";

// Utility Imports
import { Logger } from "shared/Utility/Logger";

// Create the WCS Server
const WCSServer = CreateServer();
WCSServer.RegisterDirectory(ReplicatedStorage.WaitForChild("TS").WaitForChild("Skills"));
WCSServer.Start();

// Start the Managers
DataManager.Start();
StorageManager.Start();

// Player Added Connection
Players.PlayerAdded.Connect((player) => {
	player.CharacterAdded.Connect((character) => {
		new BaseGameCharacter(character as Model);
	});
});

// Character Created Connection
Character.CharacterCreated.Connect((character) => {
	Logger.Log(script, "WCS Character Created: ", character as unknown as string);
});
