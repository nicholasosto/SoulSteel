// Roblox Services
import { Players, ReplicatedStorage } from "@rbxts/services";

// Manager Imports
import { StorageManager } from "shared/_References/Managers/StorageManager";
import { DataManager } from "./PlayerData/DataManager";

// WCS Imports
import { CreateServer, Character } from "@rbxts/wcs";

//Controller Imports
import CharacterController from "./Character/CharacterController";


//import PlayerCharacter from "./Character/PlayerCharacter";

// Utility Imports
import { Logger } from "shared/Utility/Logger";

// Create the WCS Server
const WCSServer = CreateServer();
WCSServer.RegisterDirectory(ReplicatedStorage.WaitForChild("TS").WaitForChild("Skills"));
WCSServer.Start();

// Start the Managers
DataManager.Start();
StorageManager.Start();
CharacterController.Start();
Players.PlayerAdded.Connect((player) => {
	Logger.Log(script, "Player Added");
	player.CharacterAdded.Connect((character) => {
		Logger.Log(script, "Character Added");
		const wcsCharacter = new Character(character);
		wcsCharacter.Humanoid.Died.Once(() => {
			Logger.Log(script, "Character Died");
			wcsCharacter.Destroy();
		});
	});
	if (player.Character) {
		new Character(player.Character);
	}
});
