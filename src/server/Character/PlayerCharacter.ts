import { Logger } from "shared/Utility/Logger";
// Remote Handlers
import { SendPlayerInfoUpdate, SendPlayerResourceUpdate } from "server/RemoteHandlers/RemoteIndex";

// Data
import { DataManager } from "server/PlayerData/DataManager";
import { DataCache } from "server/PlayerData/DataCache";

import BaseCharacter from "./BaseCharacter";
import { CharacterResource, CreateCharacterResource } from "../../shared/Character Resources/CharacterResource";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";
import { PlayerSkillsData } from "shared/Skills/Interfaces/SkillInterfaces";
import { ResourceId } from "shared/_References/Resources";

import { Character, DamageContainer, Skill } from "@rbxts/wcs";

// Player Character Map
const PlayerMap = new Map<Player, PlayerCharacter>();

// Get Player Character
function GetPlayerCharacter(player: Player): PlayerCharacter | undefined {
	return PlayerMap.get(player);
}

// Create Player Character
function CreatePlayerCharacter(player: Player, wcsCharacter: Character): PlayerCharacter {
	// Create the Player Character
	const playerCharacter = new PlayerCharacter(player, wcsCharacter);

	// Map the Player to the Player Character
	PlayerMap.set(player, playerCharacter);

	// Return the Player Character
	return playerCharacter;
}

// Destroy Player Character
function DestroyPlayerCharacter(player: Player) {
	const playerCharacter = PlayerMap.get(player);
	assert(playerCharacter, "PlayerCharacter is nil");
	playerCharacter.Destroy();
	PlayerMap.delete(player);
}

export default class PlayerCharacter extends BaseCharacter {
	// Private
	private _player: Player;
	private _dataCache: DataCache;

	// Resources
	private _HealthResource?: CharacterResource;
	private _ManaResource?: CharacterResource;
	private _EnergyResource?: CharacterResource;

	// Skill Slots Map
	private _skillSlotMap = new Map<number, Skill>();

	// WCS Connections
	private _connectionCharacterTakeDamage?: RBXScriptConnection;
	private _connectionCharacterDealtDamage?: RBXScriptConnection;

	// Constructor
	constructor(player: Player, wcsCharacter: Character) {
		// Call the super constructor
		super(wcsCharacter);

		// Assign the Player
		this._player = player;

		// Assign the Character Name
		this.characterName = player.Name;

		// Get the DataCache for the player
		this._dataCache = DataManager.GetDataCache(tostring(this._player.UserId));
		assert(this._dataCache, "Data Cache is nil");

		// Assign Initial Skills from the Player Data
		this._assignSkillSlots();

		// Create Character Resources
		this._createCharacterResources();

		// Initialize Connections
		this._initializeConnections();
	}

	// Assign Skill Slots
	private _assignSkillSlots() {
		// Get the assigned slots from the player data
		const assignedSlots = this._dataCache._playerData.Skills.assignedSlots as Array<SkillId>;
		Logger.Log(script, "Assigned Slots", assignedSlots);

		// Assign the skills to the slots
		let index = 0;
		assignedSlots.forEach((skillId) => {
			if (skillId) {
				this._assignSkillSlot(skillId, index);
				index++;
			}
		});
	}

	// Assign Skill Slot
	private _assignSkillSlot(skillId: SkillId, slot: number) {
		// Create the skill
		const skill = this._createSkill(skillId) as Skill;

		// Assign the skill to the slot
		this._skillSlotMap.set(slot, skill);
	}

	// Create Character Resource
	private _createCharacterResources() {
		//TODO: Review this
		this._HealthResource = CreateCharacterResource("Health", this._dataCache?._playerData);
		SendPlayerResourceUpdate(this._player, this._HealthResource);
		this._ManaResource = CreateCharacterResource("Mana", this._dataCache?._playerData);
		SendPlayerResourceUpdate(this._player, this._ManaResource);
		this._EnergyResource = CreateCharacterResource("Stamina", this._dataCache?._playerData);
		SendPlayerResourceUpdate(this._player, this._EnergyResource);
	}

	// Initialize Connections
	private _initializeConnections() {
		// Destroy Connections if they exist
		this._destroyConnections();

		// Damage Taken
		this._connectionCharacterTakeDamage = this.wcsCharacter?.DamageTaken.Connect(
			(damageContainer: DamageContainer) => {
				this._takeDamage(damageContainer);
			},
		);
	}

	// Take Damage
	private _takeDamage(damageContainer: DamageContainer) {
		assert(this._HealthResource, "Health Resource is nil");
		this._HealthResource.SetCurrent(this._HealthResource.GetValues()[0] - damageContainer.Damage);
		Logger.Log(script, "Health", this._HealthResource.GetValues());

		if (this._HealthResource.GetValues()[0] <= 0) {
			DestroyPlayerCharacter(this._player);
		}

		SendPlayerResourceUpdate(this._player, this._HealthResource);
		this._dataCache.Save();
	}

	// Assign Skill Slot
	public AssignSkillSlot(skillId: SkillId, slot: number) {
		this._assignSkillSlot(skillId, slot);
	}

	//UnAssign Skill Slot
	public UnAssignSkillSlot(slot: number) {
		Logger.Log(script, "UnAssignSkillSlot", slot);
		this._dataCache._playerData.Skills.assignedSlots[slot] = undefined;
	}

	// Get Player Skills Data
	public GetPlayerSkillsData(): PlayerSkillsData {
		return this._dataCache._playerData.Skills;
	}

	// Destroy Connections
	private _destroyConnections() {
		Logger.Log(script, "Destroying Connections");
		this._connectionCharacterTakeDamage?.Disconnect();
		this._connectionCharacterDealtDamage?.Disconnect();
	}

	// Destroy
	public Destroy() {
		Logger.Log(script, "Destroying PlayerCharacter");
		this._destroyConnections();
		this.wcsCharacter?.Destroy();
		const humanoid = this._player.Character?.FindFirstChildOfClass("Humanoid");
		if (humanoid) {
			humanoid.Health = 0;
		}
	}
}

export { GetPlayerCharacter, CreatePlayerCharacter, DestroyPlayerCharacter };
