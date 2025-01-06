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
	Logger.Log(script, `Player ${player.Name} has joined the game.`);
	const robot = StorageManager.LoadFromPackage(PackageIds.AccessoryPackage, "Scythe_Epic_Black") as Model;
    const robot2 = StorageManager.CloneFromStorage("Scythe_Epic_Black") as Model;
	Logger.Log(script, `Robot: ${robot} Robot2: ${robot2}`);

    player.CharacterAdded.Connect((character) => {
        Logger.Log(script, `Character ${character.Name} has spawned.`);
        new BaseGameCharacter(character as Model);
    });
});


Character.CharacterCreated.Connect((character) => {
    Logger.Log(script, "WCS Character Created: ", character as unknown as string);
    
});
