import Logger from "shared/Utility/Logger";
import { CollectionService } from "@rbxts/services";
import { Character } from "@rbxts/wcs";
import PlayerCharacter from "server/Character/PlayerCharacter";
import GameCharacter from "server/Character/GameCharacter";
import NPCCharacter from "server/Character/NPCCharacter";
import { IPlayerData } from "shared/Data Interfaces/PlayerData";
import { TGameCharacter } from "shared/Game Character/CharacterIndex";

export default class GameCharacterController {
	// Static Instance
	private static _instance: GameCharacterController;

	// Registry
	private static _gameCharacters: Map<string, GameCharacter | PlayerCharacter | NPCCharacter> = new Map();

	/* Constructor */
	private constructor() {
		Logger.Log(script, "Constructor Start");
	}

	/* Start */
	public static Start() {
		if (this._instance === undefined) {
			this._instance = new GameCharacterController();
		}
	}

	/* Create NPC Character */
	public static CreateNPCCharacter(tGameCharacter: TGameCharacter, level: number) {
		Logger.Log(script, "Create NPC Character", level);
		const wcsCharacter = new Character(tGameCharacter);
		const npcCharacter = new NPCCharacter(wcsCharacter, level);
		this._gameCharacters.set(npcCharacter.characterId, npcCharacter);
	}

	/* Create Player Character */
	public static CreatePlayerCharacter(tGameCharacter: TGameCharacter, playerData: IPlayerData | undefined) {
		const wcsCharacter = new Character(tGameCharacter);
		assert(wcsCharacter.Player !== undefined, "Player is nil");
		assert(playerData !== undefined, "Player Data is nil");

		// Create Player Character
		const playerCharacter = new PlayerCharacter(wcsCharacter.Player, wcsCharacter, playerData);

		// Update Player Character Maps
		this._gameCharacters.set(tostring(wcsCharacter.Player.UserId), playerCharacter);
	}

	/* Get Game Character */
	public static GetGameCharacter<T extends GameCharacter>(characterId: string): T | undefined {
		return GameCharacterController._gameCharacters.get(characterId) as T;
	}

	public static StartNPCListeners() {
		CollectionService.GetInstanceAddedSignal("NPCCharacter").Connect((npcModel) => {
			const tModel = npcModel as TGameCharacter;
			const level = npcModel.GetAttribute("Level") as number | 1;
			assert(tModel.Humanoid !== undefined, "Humanoid is nil");
			GameCharacterController.CreateNPCCharacter(tModel, level);
		});

		const CurrentNPCModels = CollectionService.GetTagged("NPCCharacter");

		CurrentNPCModels.forEach((npcModel) => {
			const tModel = npcModel as TGameCharacter;
			const level = npcModel.GetAttribute("Level") as number | 1;
			assert(tModel.Humanoid !== undefined, "Humanoid is nil");
			GameCharacterController.CreateNPCCharacter(tModel, level);
		});
	}

	/* Destroy Game Character */
	public static DestroyGameCharacter(characterId: string) {
		Logger.Log(script, "Destroy Game Character", characterId);

		// Get the Game Character
		const gameCharacter = GameCharacterController._gameCharacters.get(characterId);
		if (gameCharacter === undefined) return;

		// Destroy the Game Character
		gameCharacter.Destroy();

		// Remove from the Registry
		GameCharacterController._gameCharacters.delete(characterId);
	}
}
