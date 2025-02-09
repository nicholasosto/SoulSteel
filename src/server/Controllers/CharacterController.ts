import Logger from "shared/Utility/Logger";
import { Players, CollectionService } from "@rbxts/services";
import { Character } from "@rbxts/wcs";
import DataManager from "./DataManager";
import PlayerCharacter from "server/Character/PlayerCharacter";
import GameCharacter from "server/Character/GameCharacter";
import NPCCharacter from "server/Character/NPCCharacter";
import { IPlayerData } from "shared/Data Interfaces/PlayerData";
import { TGameCharacter } from "shared/Game Character/CharacterIndex";
import { GameCycleEvents, CharacterEvent } from "server/net/ServerEvents";

export default class CharacterController {
	// Static Instance
	private static _instance: CharacterController;

	/* Connections */
	private static _connectionPlayerJoined: RBXScriptConnection | undefined;
	private static _connectionPlayerUIReady: RBXScriptConnection | undefined;
	private static _wcsCharacterCreated: RBXScriptConnection | undefined;
	private static _wcsCharacterDestroyed: RBXScriptConnection | undefined;

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

			/* Get Existing Players */
			const currentPlayers = Players.GetPlayers();
			currentPlayers.forEach((player) => {
				Logger.Log(script, "Player Found: ", player.Name);
				new Character(player.Character || player.CharacterAdded.Wait()[0]);
			});
		}
	}

	public static StartListeners() {
		/* Player Joined */
		this._connectionPlayerJoined?.Disconnect();
		this._connectionPlayerJoined = Players.PlayerAdded.Connect((player) => {
			new Character(player.Character || player.CharacterAdded.Wait()[0]);
		});

		/* Player UI Ready */
		this._connectionPlayerUIReady?.Disconnect();
		this._connectionPlayerUIReady = GameCycleEvents.PlayerUIReady.Connect((player) => {
			/* Get Player Character */
			const playerCharacter = this.GetGameCharacter<PlayerCharacter>(tostring(player.UserId));

			/* Check if Player Character is undefined */
			if (playerCharacter === undefined) {
				Logger.Log(script, "[WARNING] Player Character is undefined");
				return;
			}

			/* Send UI Updates */
			this.SendUIUpdates(player, playerCharacter);
		});

		/* WCS Character Created */
		this._wcsCharacterCreated?.Disconnect();
		this._wcsCharacterCreated = Character.CharacterCreated.Connect((wcsCharacter) => {
			const player = wcsCharacter.Player;
			if (player === undefined) return;
			const playerData = DataManager.GetDataCache(player)._playerData as IPlayerData;
			if (playerData === undefined) return;
			/* Create Player Character */
			const playerCharacter = new PlayerCharacter(player, playerData, wcsCharacter);
			/* Get Player Character */
			const existingPlayerCharacter = this.GetGameCharacter<PlayerCharacter>(tostring(player.UserId));
			if (existingPlayerCharacter !== undefined) {
				Logger.Log(script, "[WARNING] Player Character already exists");
				return;
			}
			/* Add to Registry */
			this._gameCharacters.set(tostring(player.UserId), playerCharacter);
		});

		/* WCS Character Destroyed */
		this._wcsCharacterDestroyed?.Disconnect();
		this._wcsCharacterDestroyed = Character.CharacterDestroyed.Connect((wcsCharacter) => {
			const player = wcsCharacter.Player;
			if (player === undefined) return;
			const playerCharacter = this.GetGameCharacter<PlayerCharacter>(tostring(player.UserId));
			if (playerCharacter === undefined) return;
			playerCharacter.Destroy();
			this._gameCharacters.delete(tostring(player.UserId));
		});
	}

	/* Send UI Updates */
	private static SendUIUpdates(player: Player, playerCharacter: PlayerCharacter) {
		const playerData = DataManager.GetDataCache(player)._playerData as IPlayerData;

		GameCycleEvents.PlayerDataLoaded.SendToPlayer(player, playerData);
		CharacterEvent.ResourceUpdated.SendToPlayer(player, playerCharacter.HealthResource);
		CharacterEvent.ResourceUpdated.SendToPlayer(player, playerCharacter.ManaResource);
		CharacterEvent.ResourceUpdated.SendToPlayer(player, playerCharacter.StaminaResource);
		CharacterEvent.ResourceUpdated.SendToPlayer(player, playerCharacter.ExperienceResource);
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
		/* Get Player Data */
		const playerData = DataManager.GetDataCache(player)._playerData as IPlayerData;

		/* Create WCS Character */
		const wcsCharacter = new Character(player.Character || player.CharacterAdded.Wait()[0]);

		const playerCharacter = new PlayerCharacter(player, playerData, wcsCharacter);

		if (playerCharacter === undefined) {
			Logger.Log(script, "[WARNING] Player Character is undefined");
			return;
		}

		/* Add to Registry */
		this._gameCharacters.set(tostring(player.UserId), playerCharacter);

		/* Send UI Updates */
		this.SendUIUpdates(player, playerCharacter);
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

	// /* Destroy Game Character */
	// public static DestroyGameCharacter(characterId: string) {
	// 	// Get the Game Character
	// 	const gameCharacter = CharacterController._gameCharacters.get(characterId);
	// 	if (gameCharacter === undefined) return;

	// 	// Destroy the Game Character
	// 	gameCharacter.Destroy();

	// 	// Remove from the Registry
	// 	CharacterController._gameCharacters.delete(characterId);
	// }
}
