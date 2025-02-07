import Logger from "shared/Utility/Logger";
import { Players } from "@rbxts/services";
import { TGameCharacter } from "shared/Game Character/TGameCharacter";
import DataManager from "server/Controllers/DataManager";
import GameCharacterController from "server/Controllers/GameCharacterController";

export default function StartPlayerListeners() {
	// Player Added Connection
	Players.PlayerAdded.Connect((player) => {
		GameCharacterController.Start();
		player.CharacterAdded.Connect((character) => {
			//Create the WCS Character
			const tGameCharacter = character as TGameCharacter;

			const playerData = DataManager.GetDataCache(tostring(player.UserId));
			GameCharacterController.CreatePlayerCharacter(tGameCharacter, playerData._playerData);
		});
	});
}
