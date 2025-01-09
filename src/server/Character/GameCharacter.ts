// GameCharacter.ts: Game Character Classes
// BaseGameCharacter: Base Class for Game Characters
// PlayerGameCharacter: Player Character
import { Players } from "@rbxts/services";
import { Character, DamageContainer, GetMovesetObjectByName, UnknownStatus } from "@rbxts/wcs";
import { CharacterResource } from "./CharacterResource";
import { CharacterAnimations } from "shared/_References/Animations";
import { CharacterStats, getDefaultCharacterStats } from "shared/_References/Character/CharacterStats";
import { AnimationIds } from "shared/_References/Indexes/AssetIndex";
import Remotes, { RemoteNames } from "shared/Remotes";

// Utility Imports
import { Logger } from "shared/Utility/Logger";
import { BasicHold } from "shared/Skills/BasicHold";
import { BasicRanged } from "shared/Skills/BasicRanged";
import { BasicMelee } from "shared/Skills/BasicMelee";
import { SpiritOrb } from "shared/Skills/SpiritOrb";

export type CharacterState =
	| "Idle"
	| "Walking"
	| "Running"
	| "Jumping"
	| "Falling"
	| "Crouching"
	| "Sprinting"
	| "Dead";

// BaseGameCharacter (NPCs and Players inherit from this)
export class BaseGameCharacter {
	// Public Properties
	public Player?: Player;
	// Character Properties
	public CharacterName: string;
	public CharacterModel: Model;
	public Animator: Animator;
	public Animations = CharacterAnimations;
	public AnimationTracks = new Map<AnimationIds, AnimationTrack>();
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

	// Humanoid Connections
	private _connectionHumanoidDied: RBXScriptConnection | undefined;

	// WCS Character Connections
	private _connectionCharacterTakeDamage: RBXScriptConnection | undefined;
	private _connectionCharacterDealtDamage: RBXScriptConnection | undefined;
	private _connectionStatusEffectAdded: RBXScriptConnection | undefined;
	private _connectionStatusEffectRemoved: RBXScriptConnection | undefined;
	private _connectionStatusEffectStarted: RBXScriptConnection | undefined;
	private _connectionStatusEffectEnded: RBXScriptConnection | undefined;

	// Game Character Created/Destroyed Remotes
	private _remoteGameCharacterCreated = Remotes.Server.GetNamespace("GameCharacter").Get(RemoteNames.GameCharacterCreated);
	private _remoteGameCharacterDestroyed = Remotes.Server.GetNamespace("GameCharacter").Get(RemoteNames.GameCharacterDestroyed);
	private _remoteCharacterFrameUpdate = Remotes.Server.GetNamespace("UserInterface").Get(RemoteNames.UIUpdateCharacterFrame);

	// Constructor
	constructor(characterModel: Model, characterName: string = "Default Character Name") {

		// Player if applicable
		const player = Players.GetPlayerFromCharacter(characterModel);
		this.Player = player;

		// Assign Character Name
		this.CharacterName = characterName;

		// Assign Character Model
		this.CharacterModel = characterModel;

		this.CharacterStats = getDefaultCharacterStats();

		// Assign Animator
		this.Animator = this.CharacterModel.FindFirstChild("Animator", true) as Animator;
		assert(this.Animator, "Animator not found in Character Model");

		// Create WCS Character
		this.WCS_Character = new Character(characterModel);

		// Attributes
		this.updateAttributes();

		// Create Resources: Health, Mana, Stamina
		this.Health = new CharacterResource(this, "Health");
		this.Mana = new CharacterResource(this, "Mana");
		this.Stamina = new CharacterResource(this, "Stamina");

		this._AssignSkills();

		// Initialize Connections
		this.initializeConnections();

		// Load Animations
		this._LoadAnimations();

		// Character Frame Update
		this.handleCharacterFrameUpdate();

		this.TestResourceChange();

		this.handleCharacterFrameUpdate();

	}

	protected _AssignSkills() {
		// TODO: Assign skills via skill names

		// Assign Skills
		new BasicMelee(this.WCS_Character);
		new BasicHold(this.WCS_Character);
		new BasicRanged(this.WCS_Character);
		new SpiritOrb(this.WCS_Character);
	}

	// Animation Methods
	protected _LoadAnimations() {
		// Load Animations
		for (const [animationName, animation] of pairs(CharacterAnimations)) {
			animation.Parent = this.CharacterModel;
			animation.Name = animationName as string;
			const animationTrack = this.Animator.LoadAnimation(animation);
			this.AnimationTracks.set(animationName as AnimationIds, animationTrack);
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

	// Remote Handlers
	public handleCharacterFrameUpdate() {
		assert(this.Player, "Player is undefined");
		this._remoteCharacterFrameUpdate.SendToPlayer(this.Player, {
			CharacterName: this.CharacterName,
			Level: 1,
			Experience: {
				Current: 0,
				Max: 100,
			},
			Health: {
				Current: this.Health._currentValue,
				Max: this.Health._maxValue,
			},
			Mana: {
				Current: this.Mana._currentValue,
				Max: this.Mana._maxValue,
			},
			Stamina: {
				Current: this.Stamina._currentValue,
				Max: this.Stamina._maxValue,
			},
		});
	}

	// Initialize Connections
	private initializeConnections() {
		this.destroyConnections();
		this._connectionCharacterTakeDamage = this.WCS_Character.DamageTaken.Connect((damage) => {
			Logger.Log(script, "SuperClass-TakeDamage(): " + damage);
			this.handleCharacterTakeDamage(damage);
		});

		this._connectionCharacterDealtDamage = this.WCS_Character.DamageDealt.Connect((enemy, damage) => {
			Logger.Log(script, "SuperClass-DealDamage(): " + damage);
			this.handleCharacterDealtDamage(enemy, damage);
		});

		this._connectionStatusEffectAdded = this.WCS_Character.StatusEffectAdded.Connect((statusEffect) => {
			Logger.Log(script, "SuperClass-StatusEffectAdded(): " + statusEffect);
			this.handleStatusEffectAdded(statusEffect);
		});

		this._connectionStatusEffectRemoved = this.WCS_Character.StatusEffectRemoved.Connect((statusEffect) => {
			Logger.Log(script, "SuperClass-StatusEffectRemoved(): " + statusEffect);
			this.handleStatusEffectRemoved(statusEffect);
		});

		this._connectionStatusEffectStarted = this.WCS_Character.StatusEffectStarted.Connect((statusEffect) => {
			Logger.Log(script, "SuperClass-StatusEffectStarted(): " + statusEffect);
			this.handleStatusEffectStarted(statusEffect);
		});

		this._connectionStatusEffectEnded = this.WCS_Character.StatusEffectEnded.Connect((statusEffect) => {
			Logger.Log(script, "SuperClass-StatusEffectEnded(): " + statusEffect);
			this.handleStatusEffectEnded(statusEffect);
		});

		const humanoid = this.CharacterModel.WaitForChild("Humanoid") as Humanoid;
		this._connectionHumanoidDied = humanoid.Died.Once(() => {
			Logger.Log(script, "SuperClass-HumanoidDied()");
			this.SetState("Dead");
		});
	}

	// Connection Handlers
	private handleCharacterTakeDamage(damageContainer: DamageContainer) {
		Logger.Log(script, "BaseEntity: Take Damage: " + damageContainer.Damage);
		const currentHealth = this.CharacterModel.GetAttribute("HealthCurrent") as number;
		const newHealth = currentHealth - damageContainer.Damage;
		this.Health.SetCurrent(newHealth);
	}

	// Dealt Damage
	private handleCharacterDealtDamage(enemy: Character | undefined, damageContainer: DamageContainer) {
		Logger.Log(script, "BaseEntity: Dealt Damage: ", damageContainer.Damage);
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
		this._connectionCharacterTakeDamage?.Disconnect();
		this._connectionCharacterDealtDamage?.Disconnect();
		this._connectionStatusEffectAdded?.Disconnect();
		this._connectionStatusEffectRemoved?.Disconnect();
		this._connectionStatusEffectStarted?.Disconnect();
		this._connectionStatusEffectEnded?.Disconnect();
	}

	// Destroy Object
	public Destroy() {
		this.Health.Destroy();
		this.Mana.Destroy();
		this.Stamina.Destroy();
		this.destroyConnections();
		this.WCS_Character.Destroy();
	}

	// Dummy Method to test resource changes
	public TestResourceChange() {
		this.Health.SetCurrent(this.Health._currentValue - 10);
		this.Mana.SetCurrent(this.Mana._currentValue - 10);
		this.Stamina.SetCurrent(this.Stamina._currentValue - 10);
	}
}
