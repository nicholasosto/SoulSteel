import { Logger } from "shared/Utility/Logger";
import { DataCache, DataManager } from "server/PlayerData/DataManager";
import {
	Character,
	DamageContainer,
	GetRegisteredSkillConstructor,
	Skill,
	SkillConstructor,
	UnknownSkill,
} from "@rbxts/wcs";
import BaseCharacter from "./BaseCharacter";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";
import { SkillData, PlayerSkillsData } from "shared/Skills/Interfaces/SkillInterfaces";
import { IPlayerData } from "shared/_References/PlayerData";
import { SkillButton } from "shared/UI Component Classes/SkillPanel/SkillButton";
import Remotes, { RemoteNames, CharacterFrameData } from "shared/Remotes/Remotes";
import { EResourceTypes } from "./CharacterResource";

const PlayerMap = new Map<Player, PlayerCharacter>();

function GetPlayerCharacter(player: Player): PlayerCharacter | undefined {
	const playerCharacter = PlayerMap.get(player);
	return playerCharacter;
}

function CreatePlayerCharacter(player: Player, wcsCharacter: Character): PlayerCharacter {
	//Logger.Log(script, "CreatePlayerCharacter Started", player.Name);
	const playerCharacter = new PlayerCharacter(player, wcsCharacter);
	PlayerMap.set(player, playerCharacter);
	//Logger.Log(script, "PlayerCharacter Created", playerCharacter as unknown as string);
	return playerCharacter;
}

function DestroyPlayerCharacter(player: Player) {
	const playerCharacter = PlayerMap.get(player);
	assert(playerCharacter, "PlayerCharacter is nil");
	playerCharacter.Destroy();
	PlayerMap.delete(player);
}

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

	// Create Character Resource
	private _createCharacterResources() {
		//TODO: Review this
		this._HealthResource = this._createCharacterResource(EResourceTypes.Health);
		this._ManaResource = this._createCharacterResource(EResourceTypes.Mana);
		this._EnergyResource = this._createCharacterResource(EResourceTypes.Stamina);
	}

	// Initialize Connections
	private _initializeConnections() {
		this._destroyConnections();

		// Damage Taken
		this._connectionCharacterTakeDamage = this.wcsCharacter?.DamageTaken.Connect((damage: DamageContainer) => {
			Logger.Log(script, "Damage Taken", damage.Damage);
			assert(this._HealthResource, "Health Resource is nil");
			this._HealthResource.SetCurrent(this._HealthResource._currentValue - damage.Damage);
			this._dataCache.Save();
			this.updateCharacterFrame();
		});

		// Skill Started
		this._connectionSkillStarted = this.wcsCharacter?.SkillStarted.Connect((unknownSkill: UnknownSkill) => {
			const skill = unknownSkill as Skill;
			const skillName = skill.GetName();
			assert(skillName, "Skill Name is nil");
			Logger.Log(script, "Skill Started", skillName);
			this.updateCharacterFrame();
		});
	}

	// Update Character Frame
	private updateCharacterFrame() {
		const playerData = this._dataCache._playerData;
		const characterFrameData: CharacterFrameData = {
			Health: playerData.ResourceStats.Health,
			Mana: playerData.ResourceStats.Mana,
			Stamina: playerData.ResourceStats.Stamina,
			Experience: {
				Current: playerData.ProgressionStats.Experience,
				Max: playerData.ProgressionStats.ExperienceToNextLevel,
			},
			Level: playerData.ProgressionStats.Level,
			CharacterName: playerData.CharacterName,
		};
		Logger.Log(script, "UpdateCharacterFrame", characterFrameData as unknown as string);
		UIUpdateCharacterFrame.SendToPlayer(this._player, characterFrameData);
	}

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
