import Logger from "shared/Utility/Logger";
import { CollectionService } from "@rbxts/services";
import { Character } from "@rbxts/wcs";
import PlayerCharacter from "server/Character/PlayerCharacter";
import GameCharacter from "server/Character/GameCharacter";
import NPCCharacter from "server/Character/NPCCharacter";
import { IPlayerData, GetSkillSlotMap } from "shared/_References/PlayerData";
import { EquipmentId, EquipmentSlotId } from "shared/_References/Inventory";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";
import { CharacterStatId } from "shared/Character Resources/iCharacterResource";

export default class GameCharacterController {
	// Static Instance
	private static _instance: GameCharacterController;

	// Registry
	private static _gameCharacters: Map<string, GameCharacter | PlayerCharacter | NPCCharacter> = new Map();

	// Constructor
	private constructor() {
		Logger.Log(script, "GameCharacterController Constructor");
		const NPCModels = CollectionService.GetTagged("NPCCharacter");
		Logger.Log(script, "NPC Models", NPCModels);
		NPCModels.forEach((npcModel) => {
			const humanoid = npcModel.WaitForChild("Humanoid");
			assert(humanoid !== undefined, "Humanoid is nil");
			const wcsCharacter = new Character(npcModel);
			GameCharacterController.CreateNPCCharacter(wcsCharacter, 1);
		});
	}

	// Start
	public static Start() {
		if (this._instance === undefined) {
			this._instance = new GameCharacterController();
		}
	}

	// Create Character (Player or NPC)
	public static CreateGameCharacter(wcsCharacter: Character, playerData?: IPlayerData) {
		Logger.Log(script, "[EVENT]: On WCS Character Created", playerData as unknown as string);
		// Check if the character is a player character
		if (wcsCharacter.Player !== undefined) {
			// Create a new PlayerCharacter
			assert(playerData !== undefined, "Player Data is nil");
			this.CreatePlayerCharacter(wcsCharacter, playerData);
			Logger.Log(script, "CurrentCharacters", this._gameCharacters as unknown as string);
		} else {
			this.CreateNPCCharacter(wcsCharacter, 1);
		}
	}

	// Create NPC Character
	private static CreateNPCCharacter(wcsCharacter: Character, level: number) {
		Logger.Log(script, "Create NPC Character", level);
		const npcCharacter = new NPCCharacter(wcsCharacter, level);
		this._gameCharacters.set(npcCharacter.characterId, npcCharacter);
	}

	// Create Player Character
	private static CreatePlayerCharacter(wcsCharacter: Character, playerData: IPlayerData) {
		Logger.Log(script, "Create Player Character", playerData as unknown as string);
		assert(wcsCharacter.Player !== undefined, "Player is nil");

		// Setup Maps
		//const skillMap = this._createSkillMapFromData(playerData);
		const skillMap = GetSkillSlotMap(playerData) as Map<number, SkillId>;
		const equipmentMap = new Map<EquipmentSlotId, EquipmentId>();
		const statsMap = new Map<CharacterStatId, number>();

		const playerCharacter = new PlayerCharacter(
			wcsCharacter.Player,
			wcsCharacter,
			skillMap,
			equipmentMap,
			statsMap,
			playerData.ProgressionStats.Level,
		);
		this._gameCharacters.set(tostring(wcsCharacter.Player.UserId), playerCharacter);
	}

	// Get Game Character
	public static GetGameCharacter(characterId: string) {
		return GameCharacterController._gameCharacters.get(characterId);
	}

	// Get NPC Character
	public static GetNPCCharacter(characterId: string): NPCCharacter | undefined {
		return GameCharacterController._gameCharacters.get(characterId) as NPCCharacter;
	}

	// Get Player Game Character
	public static GetPlayerCharacter(player: Player): PlayerCharacter | undefined {
		const playerCharacter = GameCharacterController._gameCharacters.get(tostring(player.UserId));
		if (playerCharacter === undefined) {
			Logger.Log(script, "Player Character is nil");
			return;
		}
		return playerCharacter as PlayerCharacter;
	}

	// Destroy Game Character
	public static DestroyGameCharacter(characterId: string) {
		Logger.Log(script, "Destroy Game Character", characterId);
		const gameCharacter = GameCharacterController._gameCharacters.get(characterId);
		if (gameCharacter === undefined) {
			Logger.Log(script, "Game Character is nil");
			return;
		}
		gameCharacter.Destroy();
		GameCharacterController._gameCharacters.delete(characterId);
	}
}
