import { GameCycleEvents } from "server/net/_Server_Events";
import UIController from "server/Controllers/UIController";
import PCController from "server/Controllers/PlayerCharacterController";
import { CharacterResource } from "server/Character/Classes/CharacterResource";
import Logger from "shared/Utility/Logger";
import { ResourceId } from "shared/_IDs/IDs_Resource";

let _connection_UIReady: RBXScriptConnection | undefined;

function CreateResourcePayload(CharacterResource: CharacterResource) {
	return {
		resourceId: CharacterResource.ResourceId as ResourceId,
		current: CharacterResource.GetCurrent(),
		max: CharacterResource.GetMax(),
	};
}

export function StartUIListeners() {
	_connection_UIReady?.Disconnect();
	_connection_UIReady = GameCycleEvents.PlayerUIReady.Connect((player: Player) => {
		let PC = PCController.GetPlayerCharacter(player);
		while (PC === undefined) {
			const character = player.Character;
			if (character) {
				PCController.OnCharacterAdded(player, character);
				PC = PCController.GetPlayerCharacter(player);
			}
			wait(0.5);
			Logger.Log("UI LISTENERS", "Waiting for Player Character to be created...");
		}
		Logger.Log("UI LISTENERS", "Player Character has been created!", PC.player.Name);

		// const playerHealth = PC.HealthResource;
		// const playerMana = PC.ManaResource;
		// const playerStamina = PC.StaminaResource;
		// const playerExperience = PC.ExperienceResource;

		// UIController.UpdatePlayerUI(player);
		// UIController.UpdateResourceBar(player, CreateResourcePayload(playerHealth));
		// UIController.UpdateResourceBar(player, CreateResourcePayload(playerMana));
		// UIController.UpdateResourceBar(player, CreateResourcePayload(playerStamina));
		// UIController.UpdateResourceBar(player, CreateResourcePayload(playerExperience));

		wait(2);
		UIController.NotifyPlayer(player, "Welcome to the game!", false);
	});
}
