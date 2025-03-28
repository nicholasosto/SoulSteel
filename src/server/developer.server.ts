import { StartCollectingOnTouchHumanoid } from "server/Collections/OnTouch_Humanoid";
import { Players } from "@rbxts/services";

import ServerNetManager from "./Net/ServerNetManager";

StartCollectingOnTouchHumanoid();

ServerNetManager.Start();

const _playerConnections = new Map<Player, RBXScriptConnection>();

/* Handle Character Added */
function HandleCharacterAdded(player: Player, character: Model): boolean {
	/* Check if the character exists */
	if (character === undefined) return false;
	if (player === undefined) return false;
	warn("Server: Character Added", player.Name, character.Name);

	return true;
}

/* Handle Player Added */
function HandlePlayerAdded(player: Player) {
	/* Add Character Handler */
	_playerConnections.get(player)?.Disconnect();
	_playerConnections.set(
		player,
		player.CharacterAdded.Connect((character) => {
			const success = HandleCharacterAdded(player, character);
			if (!success) {
				warn("Error: Failed to handle character added");
			}
		}),
	);
	player.LoadCharacterWithHumanoidDescription(new Instance("HumanoidDescription"));
	if (player.Character !== undefined) {
		warn("Server: Existing Character", player.Name, player.Character.Name);
	}
}

/* Player Added Event */
Players.PlayerAdded.Connect((player) => {
	warn("Server: Player Added", player.Name);
	HandlePlayerAdded(player);
});

/* Get Existing Players: When the player joins before the server listens */
Players.GetPlayers().forEach((player) => {
	warn("Server: Existing Player", player.Name);
	HandlePlayerAdded(player);
});
