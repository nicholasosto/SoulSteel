import { Logger } from "shared/Utility/Logger";
import { DataCache, DataManager } from "server/PlayerData/DataManager";
import { Character, DamageContainer, GetRegisteredSkillConstructor, Skill, UnknownSkill } from "@rbxts/wcs";
import BaseCharacter from "./BaseCharacter";
import { CreateCharacterResource } from "./CharacterResource";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";
import { PlayerSkillsData } from "shared/Skills/Interfaces/SkillInterfaces";
import Remotes, { RemoteNames, CharacterFrameData } from "shared/Remotes/Remotes";
import { ResourceId } from "shared/_References/Resources";

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

// UI Update Character Frame: Remote #TODO: Review this for removal
const UIUpdateCharacterFrame = Remotes.Server.GetNamespace("UserInterface").Get(RemoteNames.UIUpdateCharacterFrame);

export default class PlayerCharacter extends BaseCharacter {
	// Private
	private _player: Player;
	private _dataCache: DataCache;
	private _skillSlotMap = new Map<number, Skill>();
	private _skillMap = new Map<SkillId, Skill>();

	// Connections
	private _connectionUpdateCharacterFrame?: RBXScriptConnection;

	// WCS Connections
	private _connectionCharacterTakeDamage?: RBXScriptConnection;
	private _connectionCharacterDealtDamage?: RBXScriptConnection;
	private _connectionSkillStarted?: RBXScriptConnection;
	private _connectionSkillEnded?: RBXScriptConnection;
	private _connectionSkillAdded?: RBXScriptConnection;
	private _connectionStatusEffectAdded?: RBXScriptConnection;
	private _connectionStatusEffectRemoved?: RBXScriptConnection;
	private _connectionStatusEffectStarted?: RBXScriptConnection;
	private _connectionStatusEffectEnded?: RBXScriptConnection;
	private _connectionHumanoidDied?: RBXScriptConnection;
	private _connectionHeartbeat?: RBXScriptConnection;

	// Constructor
	constructor(player: Player, wcsCharacter: Character) {
		// Call the super constructor
		super(wcsCharacter);

		// Assign the Player
		this._player = player;

		// Get the DataCache for the player
		this._dataCache = DataManager.GetDataCache(tostring(player.UserId));
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

		// Assign the skills to the slots
		let index = 0;
		assignedSlots.forEach((skillId) => {
			if (skillId) {
				const skill = this._createSkill(skillId);
				this._skillSlotMap.set(index, skill as Skill);
				index++;
			}
		});
	}

	// Get Resource
	public GetResource(resourceId: ResourceId) {
		switch (resourceId) {
			case "Health":
				return this._HealthResource;
			case "Mana":
				return this._ManaResource;
			case "Stamina":
				return this._EnergyResource;
		}
	}

	// Create Character Resource
	private _createCharacterResources() {
		//TODO: Review this
		this._HealthResource = CreateCharacterResource("Health", this._dataCache._playerData.ProgressionStats.Level);
		this._ManaResource = CreateCharacterResource("Mana", this._dataCache._playerData.ProgressionStats.Level);
		this._EnergyResource = CreateCharacterResource("Stamina", this._dataCache._playerData.ProgressionStats.Level);
	}

	// Initialize Connections
	private _initializeConnections() {
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
		Logger.Log(script, "Take Damage", damageContainer.Damage);
		this._dataCache.Save();
	}

	// Update Character Frame
	// Create Skill
	private _createSkill(skillId: SkillId): Skill | undefined {
		// Check if the skill is already created
		if (this._skillMap.has(skillId)) {
			return;
		}

		// Get the Skill Constructor
		const skillConstructor = GetRegisteredSkillConstructor(skillId);
		assert(skillConstructor, "Skill Constructor is nil");

		// Create the Skill for the character
		const newSkill = new skillConstructor(this.wcsCharacter) as Skill;
		assert(newSkill, "New Skill is nil");

		// Add the skill to the skill map
		this._skillMap.set(skillId, newSkill);

		return newSkill;
	}

	// Assign Skill Slot
	public AssignSkillSlot(skillId: SkillId, slot: number) {
		Logger.Log(script, "AssignSkillSlot", skillId, slot);

		// Assign the skill to the slot
		this._dataCache._playerData.Skills.assignedSlots[slot] = skillId;
		this._dataCache.Save();

		// Check if the skill is already created
		if (this._skillMap.has(skillId)) {
			return;
		}

		// Create the skill
		const skill = this._createSkill(skillId) as Skill;

		// Assign the skill to the slot
		this._skillSlotMap.set(slot, skill);
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

	private _destroyConnections() {
		Logger.Log(script, "Destroying Connections");
		this._connectionUpdateCharacterFrame?.Disconnect();
		this._connectionCharacterTakeDamage?.Disconnect();
		this._connectionCharacterDealtDamage?.Disconnect();
		this._connectionSkillStarted?.Disconnect();
		this._connectionSkillEnded?.Disconnect();
		this._connectionSkillAdded?.Disconnect();
		this._connectionStatusEffectAdded?.Disconnect();
		this._connectionStatusEffectRemoved?.Disconnect();
		this._connectionStatusEffectStarted?.Disconnect();
		this._connectionStatusEffectEnded?.Disconnect();
		this._connectionHumanoidDied?.Disconnect();
		this._connectionHeartbeat?.Disconnect();
	}

	public Destroy() {
		Logger.Log(script, "Destroying PlayerCharacter");
		this._destroyConnections();
		//this.wcsCharacter.Destroy();
	}
}

export { GetPlayerCharacter, CreatePlayerCharacter, DestroyPlayerCharacter };
