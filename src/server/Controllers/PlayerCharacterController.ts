/* 
  Filename: PlayerCharacterController.ts
  Location: src/server/Controllers
  Project: SoulSteel
  Author: TrembusTech
  Date: March 06 2025
  Instructions: This singleton should be started in the main server script.
  Description: Controller for managing player characters on the server.
               Handles creation, registration, removal, and cleanup of player characters.

  Custom Events / Remotes: None
  Other Events: 
  	- WcsCharacterDestroyed
  Revision History:
    - Initial implementation.
*/

import Logger from "shared/Utility/Logger";
import { Players } from "@rbxts/services";
import { Character } from "@rbxts/wcs";
import PlayerCharacter from "server/Character/PlayerCharacter";
import IPlayerCharacter from "shared/_Interfaces/IPlayerCharacter";
import {
	RegisterPlayerCharacter,
	GetPlayerCharacter,
	RemovePlayerCharacter,
} from "shared/_Registry/EntityRegistration";

/* Player Character Controller */
export default class PCController {
	/* Singleton Instance */
	private static _instance: PCController;

	/* Constructor */
	private constructor() {
		Logger.Log(script, "Starting PC Controller");
	}

	/* Start */
	public static Start() {
		if (this._instance === undefined) {
			this._instance = new PCController();
		}
	}

	/* On Character Added */
	public static CreatePlayerCharacter(player: Player, character: Model): IPlayerCharacter {
		/* Create the WCS Character */
		const wcsCharacter = new Character(character);

		/* WCS Character Destroyed */
		wcsCharacter.Destroyed.Connect(() => {
			this.RemovePlayerCharacter(player);
		});

		/* Create Player Character */
		const playerCharacter = new PlayerCharacter(player, wcsCharacter);

		/* Add to Registry */
		RegisterPlayerCharacter(playerCharacter);

		/* Return Player Character */
		return playerCharacter;
	}

	/* On Character Removed */
	public static RemovePlayerCharacter(player: Player) {
		/* Get Player Character */
		const playerCharacter = GetPlayerCharacter(player) as PlayerCharacter;

		playerCharacter?.OnDeath();

		/* Remove from Registry */
		RemovePlayerCharacter(player);
	}

	/* Get Game Character */
	public static GetPlayerCharacter(player: Player): PlayerCharacter | undefined {
		return GetPlayerCharacter(player) as PlayerCharacter;
	}

	/* Get Player Character from Character */
	public static GetPlayerCharacterFromCharacter(character: Model): PlayerCharacter | undefined {
		/* Get Player */
		const player = Players.GetPlayerFromCharacter(character);
		assert(player, "Player is nil");

		/* Get Player Character */
		const playerCharacter = GetPlayerCharacter(player) as PlayerCharacter;

		/* Return Player Character */
		return playerCharacter;
	}
}
