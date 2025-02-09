import Logger from "shared/Utility/Logger";
import { Players, CollectionService } from "@rbxts/services";
import { Character } from "@rbxts/wcs";
import DataManager from "./DataManager";
import PlayerCharacter from "server/Character/PlayerCharacter";
import GameCharacter from "server/Character/GameCharacter";
import NPCCharacter from "server/Character/NPCCharacter";
import { IPlayerData } from "shared/Data Interfaces/PlayerData";
import { TGameCharacter } from "shared/Game Character/CharacterIndex";

export default class CharacterController {
	// Static Instance
	private static _instance: CharacterController;

	/* Connections */
	private static _connectionPlayerJoined: RBXScriptConnection | undefined;

	// Registry
	private static _gameCharacters: Map<string, GameCharacter | PlayerCharacter | NPCCharacter> = new Map();

	/* Constructor */
	private constructor() {
		Logger.Log(script, "CONSTRUCTOR()");
	}

	/* Start */
	public static Start() {
		if (this._instance === undefined) {
			this._instance = new CharacterController();
			this.StartListeners();
		}
	}

	public static StartListeners() {
		/* Get Existing Players */
		const currentPlayers = Players.GetPlayers();
		currentPlayers.forEach((player) => {
			Logger.Log(script, "[Existing Player] Creating: ", player);
			this.CreatePlayerCharacter(player);
		});

		/* Player Joined */
		this._connectionPlayerJoined?.Disconnect();
		this._connectionPlayerJoined = Players.PlayerAdded.Connect((player) => {
			Logger.Log(script, "[Player Joined] Creating: ", player);
			this.CreatePlayerCharacter(player);
		});
	}

	/* Create NPC Character */
	public static CreateNPCCharacter(tGameCharacter: TGameCharacter, level: number) {
		Logger.Log(script, "Create NPC Character", level);
		const wcsCharacter = new Character(tGameCharacter);
		const npcCharacter = new NPCCharacter(wcsCharacter, level);
		this._gameCharacters.set(npcCharacter.characterId, npcCharacter);
	}

	/* Create Player Character */
	public static CreatePlayerCharacter(player: Player) {
		const playerData = DataManager.GetDataCache(player)._playerData as IPlayerData;
		const playerCharacter = new PlayerCharacter(player, playerData);

		if (playerCharacter === undefined) {
			Logger.Log(script, "[WARNING] Player Character is undefined");
			return;
		}

		// Update Player Character Maps
		this._gameCharacters.set(tostring(player.UserId), playerCharacter);

		Logger.Log(script, "[83] Create Player Character", playerCharacter as unknown as string);
	}

	/* Get Game Character */
	public static GetGameCharacter<T extends GameCharacter>(characterId: string): T | undefined {
		return CharacterController._gameCharacters.get(characterId) as T;
	}

	public static StartNPCListeners() {
		CollectionService.GetInstanceAddedSignal("NPCCharacter").Connect((npcModel) => {
			const tModel = npcModel as TGameCharacter;
			const level = npcModel.GetAttribute("Level") as number | 1;
			assert(tModel.Humanoid !== undefined, "Humanoid is nil");
			CharacterController.CreateNPCCharacter(tModel, level);
		});

		const CurrentNPCModels = CollectionService.GetTagged("NPCCharacter");

		CurrentNPCModels.forEach((npcModel) => {
			const tModel = npcModel as TGameCharacter;
			const level = npcModel.GetAttribute("Level") as number | 1;
			assert(tModel.Humanoid !== undefined, "Humanoid is nil");
			CharacterController.CreateNPCCharacter(tModel, level);
		});
	}

	/* Destroy Game Character */
	public static DestroyGameCharacter(characterId: string) {
		Logger.Log(script, "Destroy Game Character", characterId);

		// Get the Game Character
		const gameCharacter = CharacterController._gameCharacters.get(characterId);
		if (gameCharacter === undefined) return;

		// Destroy the Game Character
		gameCharacter.Destroy();

		// Remove from the Registry
		CharacterController._gameCharacters.delete(characterId);
	}
}
