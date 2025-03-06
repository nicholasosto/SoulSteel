import UIController from "server/Controllers/UIController";
import { GetPlayerCharacter } from "shared/_Registry/EntityRegistration";
import PCController from "server/Controllers/PlayerCharacterController";
import { Remotes } from "shared/net/Remotes";

let _connection_UIReady: RBXScriptConnection | undefined;
let _progressionStatsConnection: RBXScriptConnection | undefined;

export function StartUIListeners() {
	_connection_UIReady?.Disconnect();
	_connection_UIReady = Remotes.Server.Get("PlayerUIReady").Connect((player: Player) => {
		let PC = GetPlayerCharacter(player);
		while (PC === undefined) {
			const character = player.Character;
			if (character) {
				PCController.CreatePlayerCharacter(player, character);
				PC = GetPlayerCharacter(player);
			}
			wait(0.5);
		}
		UIController.NotifyPlayer(player, true, "Welcome", "Welcome to the game!");
		UIController.SendProgressionStats(player);
	});
}
