import Logger from "shared/Utility/Logger";
import { CollectionService } from "@rbxts/services";
import { Character } from "@rbxts/wcs";
import GameCharacter from "shared/Game Character/GameCharacter";
import PlayerCharacter from "shared/Game Character/PlayerCharacter";
import NPCCharacter from "shared/Game Character/NPCCharacter";
import { IPlayerData } from "shared/_References/PlayerData";
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
	}

	// Start
	public static Start() {
		if (this._instance === undefined) {
			this._instance = new GameCharacterController();
		}
	}

	// WCS Character Created
	public static CreateGameCharacter(wcsCharacter: Character, playerData?: IPlayerData) {
		Logger.Log(script, "[EVENT]: On WCS Character Created", playerData as unknown as string);
		// Check if the character is a player character
		if (wcsCharacter.Player !== undefined) {
			// Create a new PlayerCharacter
			assert(playerData !== undefined, "Player Data is nil");
			this.CreatePlayerCharacter(wcsCharacter, playerData);
		} else {
			Logger.Log(script, "NPC Character Created");
			const npcCharacter = new NPCCharacter(wcsCharacter, 10);
			this._gameCharacters.set(npcCharacter.characterId, npcCharacter);
		}
	}

	private static CreatePlayerCharacter(wcsCharacter: Character, playerData: IPlayerData) {
		Logger.Log(script, "Create Player Character", playerData as unknown as string);
		assert(wcsCharacter.Player !== undefined, "Player is nil");

		// Setup Maps
		const skillMap = this._createSkillMapFromData(playerData);
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

	private static _createSkillMapFromData(playerData: IPlayerData) {
		const equippedSkills = playerData.Skills.assignedSlots as SkillId[];
		assert(equippedSkills !== undefined, "Equipped Skills is nil");
		const skillMap = new Map<number, SkillId>();

		let index = 1;
		equippedSkills.forEach((skillId) => {
			skillMap.set(index, skillId);
			index++;
		});

		return skillMap;
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
