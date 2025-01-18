// GameCharacter.ts: Game Character Classes
// BaseGameCharacter: Base Class for Game Characters
// PlayerGameCharacter: Player Character
import { Players, RunService } from "@rbxts/services";
import { Character, DamageContainer, GetRegisteredSkillConstructor, UnknownSkill, UnknownStatus } from "@rbxts/wcs";
import { CharacterResource, EResourceBarNames, EResourceTypes, GetResourceBarFrameByName } from "./CharacterResource";

import { CharacterStats, getDefaultCharacterStats } from "shared/_References/CharacterStats";
import { CharacterState } from "shared/_References/CharacterStates";
import { EAnimationID } from "shared/Animation/AnimationIndex";
import CharacterAnimator from "server/Character/CharacterAnimator";
import { generateCharacterName } from "shared/Factories/NameFactory";
import Remotes, { RemoteNames } from "shared/Remotes";

// Data
import { DataCache, DataManager } from "server/PlayerData/DataManager";

// Utility Imports
import { Logger } from "shared/Utility/Logger";
import {
	PlayerSkillsData,
	SkillId,
	SkillResource,
	assignSkillToSlot,
	getDefaultPlayerSkillsData,
	getSkillDefinition,
} from "shared/Skills/SkillIndex";

// CONSTANTS
const UI_UPDATE_RATE = 1;

// BaseGameCharacter (NPCs and Players inherit from this)
export class BaseGameCharacter {
	// Public Properties
	public Player?: Player;
	public PlayerDataCache?: DataCache;
	public SkillData: PlayerSkillsData = getDefaultPlayerSkillsData();
	//public dummyDamageContainer: DamageContainer;
	// Character Properties
	public CharacterName: string;
	public CharacterModel: Model;
	public Animator: CharacterAnimator;
	//public Animations = CharacterAnimations;
	public AnimationTracks = new Map<EAnimationID, AnimationTrack>();
	public WCS_Character: Character;
	public Target: Model | undefined;

	// Stats
	public CharacterStats: CharacterStats;

	// Resources
	public Health: CharacterResource;
	public Mana: CharacterResource;
	public Stamina: CharacterResource;

	// Protected Properties
	protected _State: CharacterState = "Idle";
	//protected _Moveset: Moveset;

	private _lastUpdateTick: number = 0;
	// Humanoid Connections
	private _connectionHumanoidDied: RBXScriptConnection | undefined;

	// WCS Character Connections
	// Character Connections
	private _connectionCharacterTakeDamage: RBXScriptConnection | undefined;
	private _connectionCharacterDealtDamage: RBXScriptConnection | undefined;

	// Skill Connections
	private _connectionSkillStarted: RBXScriptConnection | undefined;
	private _connectionSkillEnded: RBXScriptConnection | undefined;
	private _connectionSkillAdded: RBXScriptConnection | undefined;

	// Skill Remote Connections
	private _connectionSkillRemoteUnlock: RBXScriptConnection | undefined;
	private _connectionSkillRemoteAssign: RBXScriptConnection | undefined;
	private _connectionSkillRemoteUnassign: RBXScriptConnection | undefined;

	// Status Effect Connections
	private _connectionStatusEffectAdded: RBXScriptConnection | undefined;
	private _connectionStatusEffectRemoved: RBXScriptConnection | undefined;
	private _connectionStatusEffectStarted: RBXScriptConnection | undefined;
	private _connectionStatusEffectEnded: RBXScriptConnection | undefined;

	// RunService Connections
	private _connectionHeartbeat: RBXScriptConnection | undefined;

	// Game Character Created/Destroyed Remotes
	private _remoteGameCharacterCreated = Remotes.Server.GetNamespace("GameCharacter").Get(
		RemoteNames.GameCharacterCreated,
	);
	private _remoteGameCharacterDestroyed = Remotes.Server.GetNamespace("GameCharacter").Get(
		RemoteNames.GameCharacterDestroyed,
	);
	private _remoteCharacterFrameUpdate = Remotes.Server.GetNamespace("UserInterface").Get(
		RemoteNames.UIUpdateCharacterFrame,
	);
	private _remoteSkillBarUpdate = Remotes.Server.GetNamespace("UserInterface").Get(RemoteNames.UIUpdateSkillBar);
	private _remoteAssignSkills = Remotes.Server.GetNamespace("Skills").Get(RemoteNames.LoadPlayerSkills);

	// Constructor
	constructor(characterModel: Model, characterName: string = "Default Character Name") {
		// Player if applicable
		const player = Players.GetPlayerFromCharacter(characterModel);
		this.Player = player;
		this.PlayerDataCache = DataManager.GetDataCache(tostring(player?.UserId));

		// Assign Character Name
		this.CharacterName = generateCharacterName();

		// Assign Character Model
		this.CharacterModel = characterModel;

		// Assign Animator
		this.Animator = new CharacterAnimator(this.CharacterModel);

		// Character Stats
		this.CharacterStats = getDefaultCharacterStats();

		// Create WCS Character
		this.WCS_Character = new Character(characterModel);

		// Attributes
		this.updateAttributes();

		// Create Resources: Health, Mana, Stamina
		this.Health = new CharacterResource("Health");
		this.Mana = new CharacterResource("Mana");
		this.Stamina = new CharacterResource("Stamina");

		// Initialize Connections
		this.initializeConnections();

		// Assign Skills
		this._AssignSkills();

		// BillBoard GUI #TODO: Create health bar and improve display
		this._addBillboardGui();
	}

	private _addBillboardGui() {
		const billboardGui = new Instance("BillboardGui");
		billboardGui.Name = "CharacterName";
		billboardGui.Parent = this.CharacterModel;
		billboardGui.Size = new UDim2(0, 100, 0, 40);
		billboardGui.StudsOffset = new Vector3(0, 3, 0);
		billboardGui.AlwaysOnTop = true;
		billboardGui.Adornee = this.CharacterModel.FindFirstChild("Head") as BasePart;

		const textLabel = new Instance("TextLabel");
		textLabel.Parent = billboardGui;
		textLabel.Size = new UDim2(1, 0, 1, 0);
		textLabel.Text = this.CharacterName;
		textLabel.TextColor3 = Color3.fromRGB(255, 255, 255);
		textLabel.TextScaled = true;
		textLabel.BackgroundTransparency = 1;
	}

	// Assign Skills
	protected _AssignSkills() {
		// Player Skills
		if (this.PlayerDataCache) {
			// Assign Skills from PlayerDataCache
			this.SkillData = this.PlayerDataCache._playerData.Skills;

			// Send Skills to Player
			this._remoteAssignSkills.SendToPlayer(this.Player as Player, this.SkillData);

			//Logger.Log(script, "Assign Skills", this.SkillData as unknown as string);
		} else {
			Logger.Log(script, "PlayerDataCache is undefined");
		}

		// Assign Skills to Character
		assert(this.SkillData.assignedSlots, "Assigned Slots is nil");
		assert(this.WCS_Character, "WCS Character is nil");
		const skillIds = this.SkillData.assignedSlots as string[];
		for (const skillId of skillIds) {
			const skill = GetRegisteredSkillConstructor(skillId) as unknown as new (character: Character) => unknown;
			new skill(this.WCS_Character) as typeof skill;
		}
	}

	// State System Methods
	protected onStateChange(newState: string) {
		this._State = newState as CharacterState;
		this.CharacterModel.SetAttribute("State", newState);
		Logger.Log(script, "SuperClass-OnStateChange(): " + newState);
	}

	public SetState(state: string) {
		Logger.Log(script, "SuperClass-SetState(): " + state);
		this.CharacterModel.SetAttribute("State", state);
		this._State = this.CharacterModel.GetAttribute("State") as CharacterState;
	}

	// Update Attributes
	public updateAttributes() {
		// Set the Stats Attributes
		this.CharacterModel.SetAttribute("Strength", this.CharacterStats.Strength);
		this.CharacterModel.SetAttribute("Dexterity", this.CharacterStats.Dexterity);
		this.CharacterModel.SetAttribute("Intelligence", this.CharacterStats.Intelligence);
		this.CharacterModel.SetAttribute("Constitution", this.CharacterStats.Constitution);
		this.CharacterModel.SetAttribute("Speed", this.CharacterStats.Speed);
	}

	protected spendResource(skillResource: SkillResource) {
		switch (skillResource.resourceId) {
			case EResourceTypes.Health:
				this.Health.SetCurrent(this.Health._currentValue - skillResource.amount);
				break;
			case EResourceTypes.Mana:
				this.Mana.SetCurrent(this.Mana._currentValue - skillResource.amount);
				break;
			case EResourceTypes.Stamina:
				this.Stamina.SetCurrent(this.Stamina._currentValue - skillResource.amount);
				break;
		}
	}

	// Remote Handlers
	public handleCharacterFrameUpdate(forceUpdate: boolean = false) {
		// Get the Time Since Last Update
		const timeSinceLastTick = tick() - this._lastUpdateTick;

		if (timeSinceLastTick < UI_UPDATE_RATE && !forceUpdate) {
			return;
		}

		if (this.PlayerDataCache === undefined) {
			Logger.Log(script, "PlayerDataCache is undefined for: " + this.CharacterName);
			return;
		}

		if (this.Player === undefined) {
			Logger.Log(script, "Player is undefined for: " + this.CharacterName);
			return;
		}

		const level = this.PlayerDataCache._playerData.ProgressionStats.Level;

		const experience = {
			Current: this.PlayerDataCache._playerData.ProgressionStats.Experience,
			Max: this.PlayerDataCache._playerData.ProgressionStats.ExperienceToNextLevel,
		};

		const health = {
			Current: this.Health._currentValue,
			Max: this.Health._maxValue,
		};

		const mana = {
			Current: this.Mana._currentValue,
			Max: this.Mana._maxValue,
		};

		const stamina = {
			Current: this.Stamina._currentValue,
			Max: this.Stamina._maxValue,
		};

		const data = {
			CharacterName: this.CharacterName,
			Level: level,
			Experience: experience,
			Health: health,
			Mana: mana,
			Stamina: stamina,
		};

		// Send Data to Player (This Updates the Character Frame)
		this._remoteCharacterFrameUpdate.SendToPlayer(this.Player, data);

		this._regenResources();

		// Reset Last Update Tick
		this._lastUpdateTick = tick();
	}

	private _regenResources() {
		this.Health.regenStep();
		this.Mana.regenStep();
		this.Stamina.regenStep();
	}

	// Initialize Connections
	private initializeConnections() {
		// Destroy any existing connections
		this.destroyConnections();

		// Character
		this._connectionCharacterTakeDamage = this.WCS_Character.DamageTaken.Connect((damage) => {
			this.handleCharacterTakeDamage(damage);
		});
		this._connectionCharacterDealtDamage = this.WCS_Character.DamageDealt.Connect((enemy, damage) => {
			this.handleCharacterDealtDamage(enemy, damage);
		});

		// Skills
		this._connectionSkillStarted = this.WCS_Character.SkillStarted.Connect((skill) => {
			this.handleSkillStarted(skill);
		});
		this._connectionSkillEnded = this.WCS_Character.SkillEnded.Connect((skill) => {
			this.handleSkillEnded(skill);
		});
		this._connectionSkillAdded = this.WCS_Character.SkillAdded.Connect((skill) => {
			this.handleSkillAdded(skill);
		});

		// Skill Remote Connections
		this._connectionSkillRemoteUnlock = Remotes.Server.GetNamespace("Skills")
			.Get(RemoteNames.UnlockSkill)
			.Connect((player, skillId) => {
				Logger.Log(script, "Unlock Skill: " + skillId);
			});

		this._connectionSkillRemoteAssign = Remotes.Server.GetNamespace("Skills")
			.Get(RemoteNames.AssignSkillSlot)
			.Connect((player, slotId, skillId) => {
				Logger.Log(script, "Assign Skill: " + skillId + " to Slot: " + slotId);
				assignSkillToSlot(this.SkillData, skillId as SkillId, slotId);
			});

		// Status Effects
		this._connectionStatusEffectAdded = this.WCS_Character.StatusEffectAdded.Connect((statusEffect) => {
			this.handleStatusEffectAdded(statusEffect);
		});
		this._connectionStatusEffectRemoved = this.WCS_Character.StatusEffectRemoved.Connect((statusEffect) => {
			this.handleStatusEffectRemoved(statusEffect);
		});
		this._connectionStatusEffectStarted = this.WCS_Character.StatusEffectStarted.Connect((statusEffect) => {
			this.handleStatusEffectStarted(statusEffect);
		});
		this._connectionStatusEffectEnded = this.WCS_Character.StatusEffectEnded.Connect((statusEffect) => {
			this.handleStatusEffectEnded(statusEffect);
		});

		// Humanoid Died
		const humanoid = this.CharacterModel.WaitForChild("Humanoid") as Humanoid;
		this._connectionHumanoidDied = humanoid.Died.Once(() => {
			Logger.Log(script, "SuperClass-HumanoidDied()");
			this.Destroy();
		});

		// Heartbeat Connection
		this._connectionHeartbeat = RunService.Heartbeat.Connect(() => {
			this.handleCharacterFrameUpdate();
		});
	}

	/* Connection Handlers */

	// Character: Take Damage
	private handleCharacterTakeDamage(damageContainer: DamageContainer) {
		Logger.Log(script, "BaseEntity: Take Damage: " + damageContainer.Damage);
		const currentHealth = this.Health._currentValue;
		const newHealth = currentHealth - damageContainer.Damage;
		this.Health.SetCurrent(newHealth);
		this.handleCharacterFrameUpdate();

		if (newHealth <= 0) {
			this.WCS_Character.Humanoid.Health = 0;
		}
	}

	// Character: Dealt Damage
	private handleCharacterDealtDamage(enemy: Character | undefined, damageContainer: DamageContainer) {
		Logger.Log(script, "BaseEntity: Dealt Damage: ", damageContainer.Damage);
	}

	// Skills - Started
	private handleSkillStarted(skill: UnknownSkill) {
		assert(skill.GetName(), "Skill Name is nil");
		const skillDeffinition = getSkillDefinition(skill.GetName() as SkillId);
		Logger.Log(script, ("SuperClass-SkillStarted(): " + skillDeffinition) as unknown as string);
		this.Animator.Play(skillDeffinition.animation as EAnimationID);
		this.handleCharacterFrameUpdate(true);
	}

	// Skills - Ended
	private handleSkillEnded(skill: UnknownSkill) {
		assert(skill.GetName(), "Skill Name is nil");
		Logger.Log(script, "BaseEntity: Skill Ended: ", skill.GetName());
	}

	// Skills - Added
	private handleSkillAdded(skill: UnknownSkill) {
		assert(skill.GetName(), "Skill Name is nil");
		const skillId = skill.GetName() as SkillId;
		this.Animator.AddAnimationTrack(getSkillDefinition(skillId).animation as EAnimationID);
		Logger.Log(script, "BaseEntity: Skill Added: ", skill.GetName());
	}

	// Status Effects - Added
	private handleStatusEffectAdded(statusEffect: UnknownStatus) {
		Logger.Log(script, "BaseEntity: Status Effect Added: ", statusEffect.Name);
	}

	// Status Effects - Removed
	private handleStatusEffectRemoved(statusEffect: UnknownStatus) {
		Logger.Log(script, "BaseEntity: Status Effect Removed: ", statusEffect.Name);
	}

	// Status Effects - Started
	private handleStatusEffectStarted(statusEffect: UnknownStatus) {
		Logger.Log(script, "BaseEntity: Status Effect Started: ", statusEffect.Name);
	}

	// Status Effects - Ended
	private handleStatusEffectEnded(statusEffect: UnknownStatus) {
		Logger.Log(script, "BaseEntity: Status Effect Ended: ", statusEffect.Name);
	}

	// Destroy Connections
	private destroyConnections() {
		Logger.Log(script, "Destroying Connections");
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

	// Destroy Object
	public Destroy() {
		//this.Mana.Destroy();
		//this.Stamina.Destroy();
		this.destroyConnections();
		this.WCS_Character.Destroy();
	}
}
