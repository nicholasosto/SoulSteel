import Logger from "shared/Utility/Logger";
import { Character } from "@rbxts/wcs";
import PlayerCharacter, { CreatePlayerCharacter } from "./PlayerCharacter";
import Remotes, { RemoteNames } from "shared/Remotes/Remotes";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";

// Player Character Registry
const PlayerCharacterRegistry = new Map<Player, PlayerCharacter>();

export default class CharacterController {
	// Static Instance
	private static _instance: CharacterController;
	// Registry
	private static _playerCharacterRegistry: Map<Player, PlayerCharacter> = new Map();

	// Remotes
	private static _remoteAssignSkillSlot = Remotes.Server.GetNamespace("Skills").Get(RemoteNames.AssignSkillSlot);
	private static _remoteAssignSkillResponse = Remotes.Server.GetNamespace("Skills").Get(
		RemoteNames.AssignSkillResponse,
	);

	// Connections
	private static _characterCreatedConnection: RBXScriptConnection | undefined;
	private static _characterDestroyedConnection: RBXScriptConnection | undefined;
	private static _skillSlotAssignmentConnection: RBXScriptConnection | undefined;

	// Constructor
	private constructor() {
		CharacterController._initializeConnections();
	}

	// Start
	public static Start() {
		Logger.Log(script, "CharacterController Started");
		if (this._instance === undefined) {
			this._instance = new CharacterController();
		}
	}

	private static _initializeConnections() {
		CharacterController._destroyConnections();

		// Character Created
		CharacterController._characterCreatedConnection = Character.CharacterCreated.Connect((wcsCharacter) => {
			CharacterController._handleWCSCharacterCreated(wcsCharacter);
		});

		// Character Destroyed
		CharacterController._characterDestroyedConnection = Character.CharacterDestroyed.Connect((wcsCharacter) => {
			CharacterController._handleWCSCharacterDestroyed(wcsCharacter);
		});

		// Player Skill Slot Assignment
		CharacterController._skillSlotAssignmentConnection = CharacterController._remoteAssignSkillSlot.Connect(
			(player, slot, skillId) => {
				CharacterController._handleSkillSlotAssignment(player, slot, skillId);
			},
		);
	}

	// WCS Character Created
	private static _handleWCSCharacterCreated(wcsCharacter: Character) {
		Logger.Log(script, "Handle WCS Character Created");

		// Get the player from the WCS Character
		const player = wcsCharacter.Player as Player;

		// Check if the character is a player character
		if (player !== undefined) {
			// Create a new PlayerCharacter
			const _playerCharacter = CreatePlayerCharacter(player, wcsCharacter);

			// Add the PlayerCharacter to the registry
			CharacterController._playerCharacterRegistry.set(player, _playerCharacter);

			return;
		}

		// Not a player character #TODO: Create NPC Character
		Logger.Log(script, "Create NPC Character TODO");
	}

	// WCS Character Destroyed
	private static _handleWCSCharacterDestroyed(wcsCharacter: Character) {
		Logger.Log(script, "Handle WCS Character Destroyed");
		const player = wcsCharacter.Player as Player;
		if (player !== undefined) {
			CharacterController._playerCharacterRegistry.get(player)?.Destroy();
			CharacterController._playerCharacterRegistry.delete(player);
		}
	}

	// Skill Slot Assignment
	private static _handleSkillSlotAssignment(player: Player, slot: number, skillId: string) {
		Logger.Log(script, "Handle Skill Slot Assignment");
		const playerCharacter = CharacterController._playerCharacterRegistry.get(player);
		playerCharacter?.AssignSkillSlot(skillId as SkillId, slot);
	}

	// Destroy Connections
	private static _destroyConnections() {
		CharacterController._characterCreatedConnection?.Disconnect();
		CharacterController._characterDestroyedConnection?.Disconnect();
		CharacterController._skillSlotAssignmentConnection?.Disconnect();
	}

	// Get Player Character
	public static GetPlayerCharacter(player: Player) {
		return PlayerCharacterRegistry.get(player);
	}
}
