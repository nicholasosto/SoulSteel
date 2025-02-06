// server/net/remotes.server.ts
import * as ServerRemotes from "shared/Remotes/ServerRemotes";
import GameCharacterController from "server/Controllers/GameCharacterController";
import { Players } from "@rbxts/services";
import Logger from "shared/Utility/Logger";
import PlayerCharacter from "server/Character/PlayerCharacter";
import GameCharacter from "server/Character/GameCharacter";

// Target Selected
ServerRemotes.PlayerCharacterRemotes.TargetSelected.Connect((player, target) => {
	Logger.Log(script, "Player selected target", target);
	const playerCharacter = GameCharacterController.GetGameCharacter(tostring(player.UserId));
	const targetCharacter = GameCharacterController.GetGameCharacter(target);
	Logger.Log(script, "Target Character", targetCharacter as unknown as string);
	playerCharacter?.SetTarget(targetCharacter as GameCharacter);
	if (playerCharacter === undefined) {
		Logger.Log(script, "Player Character is nil");
	}
	Logger.Log(script, "Player target selected", target);
});
