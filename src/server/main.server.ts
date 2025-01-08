import { Players, ReplicatedStorage } from "@rbxts/services";
import { Logger } from "shared/Utility/Logger";
import { StorageManager } from "shared/_References/Managers/StorageManager";
import { PackageIds } from "shared/_References/Indexes/AssetIndex";
// WCS System
import { CreateServer, Character } from "@rbxts/wcs";
import { BaseGameCharacter } from "./Character/GameCharacter";

const WCSServer = CreateServer();
WCSServer.RegisterDirectory(ReplicatedStorage.WaitForChild("TS").WaitForChild("Skills"));
WCSServer.Start();

StorageManager.Start();

Players.PlayerAdded.Connect((player) => {
	player.CharacterAdded.Connect((character) => {
		new BaseGameCharacter(character as Model);
	});
});

Character.CharacterCreated.Connect((character) => {
	Logger.Log(script, "WCS Character Created: ", character as unknown as string);

});
