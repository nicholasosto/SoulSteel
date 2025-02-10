import Logger from "shared/Utility/Logger";
import { Players, CollectionService } from "@rbxts/services";
import { Character } from "@rbxts/wcs";
import DataManager from "./DataManager";
import PlayerCharacter from "server/Character/PlayerCharacter";
import { IPlayerData } from "shared/Data Interfaces/PlayerData";
import { GameCycleEvents, CharacterEvent, Payloads } from "server/net/_Server_Events";
import { ResourceId } from "shared/Game Character/Character Resources/Resources";
import { CharacterResource } from "shared/Game Character/Character Resources/CharacterResource";

export default class PCController {
	// Static Instance
	private static _instance: PCController;

	// Registry
	private static _PlayerCharacters: Map<string, PlayerCharacter> = new Map();

	/* Constructor */
	private constructor() {
		Logger.Log(script, "CONSTRUCTOR()");
	}

	/* Start */
	public static Start() {
		if (this._instance === undefined) {
			this._instance = new PCController();
		}
	}

	/* On Character Added */
	public static OnCharacterAdded(player: Player, character: Model) {
		/* Get Player Data */
		const playerData = DataManager.GetDataCache(player)._playerData as IPlayerData;

		/* Create the WCS Character */
		const wcsCharacter = new Character(character);

		/* Create Player Character */
		const playerCharacter = new PlayerCharacter(player, playerData, wcsCharacter);

		/* Add to Registry */
		this._PlayerCharacters.set(tostring(player.UserId), playerCharacter);

		/* Send UI Updates */
		this.SendUIUpdates(player, playerCharacter);
	}

	/* On Character Removed */
	public static OnCharacterRemoved(player: Player) {
		// Get the Game Character
		const gameCharacter = this._PlayerCharacters.get(tostring(player.UserId));
		if (gameCharacter === undefined) return;

		// Destroy the Game Character
		gameCharacter.Destroy();

		// Remove from the Registry
		this._PlayerCharacters.delete(tostring(player.UserId));
	}

	/* Send UI Updates */
	private static SendUIUpdates(player: Player, playerCharacter: PlayerCharacter) {
		// const playerData = DataManager.GetDataCache(player)._playerData as IPlayerData;

		// GameCycleEvents.PlayerDataLoaded.SendToPlayer(player, playerData);
		// CharacterEvent.ResourceUpdated.SendToPlayer(player, this.ResourcePayload(playerCharacter.HealthResource));
		// CharacterEvent.ResourceUpdated.SendToPlayer(player, this.ResourcePayload(playerCharacter.ManaResource));
		// CharacterEvent.ResourceUpdated.SendToPlayer(player, this.ResourcePayload(playerCharacter.StaminaResource));
		// CharacterEvent.ResourceUpdated.SendToPlayer(player, this.ResourcePayload(playerCharacter.ExperienceResource));
	}

	private static ResourcePayload(characterResource: CharacterResource): Payloads["PlayerResourceUpdate"] {
		const payload = {
			resourceId: characterResource.ResourceName as ResourceId,
			current: characterResource.GetCurrent(),
			max: characterResource.GetMax(),
		};
		return payload;
	}

	/* Get Game Character */
	public static GetPlayerCharacter(player: Player): PlayerCharacter | undefined {
		return PCController._PlayerCharacters.get(tostring(player.UserId)) as PlayerCharacter;
	}

	// /* Destroy Game Character */
	public static DestroyPlayerCharacter(player: Player) {
		// Get the Game Character
		const playerCharacter = this._PlayerCharacters.get(tostring(player.UserId));
		if (playerCharacter === undefined) {
			Logger.Log(script, "Player Character is nil");
		}
	}
}
