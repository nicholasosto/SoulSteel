import { GameCycleEvents } from "server/net/_Server_Events";
import UIController from "server/Controllers/UIController";
import PCController from "server/Controllers/PlayerCharacterController";

let _connection_UIReady: RBXScriptConnection | undefined;

export function StartUIListeners() {
	_connection_UIReady?.Disconnect();
	_connection_UIReady = GameCycleEvents.PlayerUIReady.Connect((player: Player) => {
		let PC = PCController.GetPlayerCharacter(player);
		while (PC === undefined) {
			const character = player.Character;
			if (character) {
				PCController.CreatePlayerCharacter(player, character);
				PC = PCController.GetPlayerCharacter(player);
			}
			wait(0.5);
		}
		UIController.NotifyPlayer(player, "Welcome to the game!", false);
	});
}
