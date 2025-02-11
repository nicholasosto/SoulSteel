import { GameCycleEvents } from "server/net/_Server_Events";
import UIController from "server/Controllers/UIController";
import PCController from "server/Controllers/PlayerCharacterController";
import { CharacterResource } from "server/Character/Classes/CharacterResource";
import Logger from "shared/Utility/Logger";
import { ResourceId } from "shared/_Types/GameCharacterShared";

let _connection_UIReady: RBXScriptConnection | undefined;

function CreateResourcePayload(CharacterResource: CharacterResource) {
	return {
		resourceId: CharacterResource.ResourceName as ResourceId,
		current: CharacterResource.GetCurrent(),
		max: CharacterResource.GetMax(),
	};
}

export function StartUIListeners() {
	_connection_UIReady?.Disconnect();
	_connection_UIReady = GameCycleEvents.PlayerUIReady.Connect((player: Player) => {
		let PC = PCController.GetPlayerCharacter(player);
		while (PC === undefined) {
			wait(0.5);
			PC = PCController.GetPlayerCharacter(player);
		}

		const playerHealth = PC.HealthResource;
		const playerMana = PC.ManaResource;
		const playerStamina = PC.StaminaResource;
		const playerExperience = PC.ExperienceResource;
		Logger.Log(script, "Player Character: Exp", PC.ExperienceResource as unknown as string);
		UIController.UpdatePlayerUI(player);
		UIController.UpdateResourceBar(player, CreateResourcePayload(playerHealth));
		UIController.UpdateResourceBar(player, CreateResourcePayload(playerMana));
		UIController.UpdateResourceBar(player, CreateResourcePayload(playerStamina));
		UIController.UpdateResourceBar(player, CreateResourcePayload(playerExperience));
	});
}
