import Logger from "shared/Utility/Logger";

/* WCS Modules */
import { Character, DamageContainer } from "@rbxts/wcs";

/* Character Index */
import IPlayerCharacter from "shared/_Interfaces/IPlayerCharacter";

/* Player Data */
import IPlayerData from "shared/_Interfaces/IPlayerData";

/* Server Events */
import { CharacterEvent } from "server/net/_Server_Events";

/* Managers */
import SkillsManager from "server/Character/Managers/SkillsManager";
import AnimationManager from "./Managers/AnimationManager";
import ResourceManager from "./Managers/ResourceManager";

/* Types */
import GameCharacter from "./GameCharacter";

/* Classes */
import { CharacterResource } from "./Classes/CharacterResource";

/* Player Character */
export default class PlayerCharacter extends GameCharacter implements IPlayerCharacter {
	public player: Player;
	public currentExperience: number;

	/* Managers */
	public skillManager: SkillsManager;
	public animationManager: AnimationManager;
	public resourceManager: ResourceManager;

	/* Progression */
	public ProgressionStats: IPlayerData["ProgressionStats"];

	/* Character Stats */
	public CharacterStats: IPlayerData["CharacterStats"];

	/* Resources */
	// public HealthResource: CharacterResource;
	// public ManaResource: CharacterResource;
	// public StaminaResource: CharacterResource;
	// public ExperienceResource: CharacterResource;

	/* WCS SkillConnections */
	private _connectionSkillStarted: RBXScriptConnection | undefined;
	private _connectionSkillEnded: RBXScriptConnection | undefined;

	constructor(player: Player, playerData: IPlayerData, wcsCharacter: Character) {
		super(wcsCharacter);
		// Set Player
		this.player = player;

		/* Set Player Data */
		this.level = playerData.ProgressionStats.Level;
		this.currentExperience = playerData.ProgressionStats.Experience;
		this.displayName = player.Name;

		/* Set Progression Data */
		this.ProgressionStats = playerData.ProgressionStats;

		/* Set Core Stats */
		this.CharacterStats = playerData.CharacterStats;

		// /* Resources */
		// this.HealthResource = new CharacterResource(
		// 	"Health",
		// 	this.CharacterStats.Constitution,
		// 	this.CharacterStats.Strength,
		// 	this.level,
		// );

		// /* Mana Resource */
		// this.ManaResource = new CharacterResource(
		// 	"Mana",
		// 	this.CharacterStats.Intelligence,
		// 	this.CharacterStats.Constitution,
		// 	this.level,
		// );

		// /* Stamina Resource */
		// this.StaminaResource = new CharacterResource(
		// 	"Stamina",
		// 	this.CharacterStats.Dexterity,
		// 	this.CharacterStats.Constitution,
		// 	this.level,
		// );

		// /* Experience Resource */
		// // #TODO: Separate implementation for Experience Resource
		// this.ExperienceResource = new CharacterResource(
		// 	"Experience",
		// 	this.CharacterStats.Intelligence,
		// 	this.CharacterStats.Constitution,
		// 	this.ProgressionStats.Level,
		// );
		/* Resource Manager */
		this.resourceManager = new ResourceManager(this);

		/* Skills Manager */
		this.skillManager = new SkillsManager(playerData, wcsCharacter);
		this.skillManager.InitializeSkillMap(playerData);

		/* Animation Manager */
		assert(this.characterModel, "Character Model is nil");
		this.animationManager = new AnimationManager(this.characterModel, playerData.Skills.unlockedSkills);

		/* Initialize Connections */
		this._initializeConnections();

		/* Resource Update */
		this._sendResourceUpdate();
	}

	/* WCS Connections */
	protected _initializeConnections(): void {
		/* Damaged */
		this._connectionTakeDamage?.Disconnect();
		this._connectionTakeDamage = this.wcsCharacter.DamageTaken.Connect((damageContainer: DamageContainer) => {
			Logger.Log(script, "Player Character Damaged");
			this.OnTakeDamage(damageContainer);
		});

		/* Dealt Damage */
		this._connectionDealDamage?.Disconnect();
		this._connectionDealDamage = this.wcsCharacter.DamageDealt.Connect((enemy, damageContainer) => {
			Logger.Log(script, ("Player Character Dealt Damage" + enemy) as unknown as string);
			this.OnDamageDealt(enemy, damageContainer);
		});

		/* Skill Started */
		this._connectionSkillStarted?.Disconnect();
		this._connectionSkillStarted = this.wcsCharacter.SkillStarted.Connect((skill) => {
			this.skillManager.OnSkillStarted(skill);
			this.animationManager.OnSkillStarted(skill);
		});

		/* Skill Ended */
		this._connectionSkillEnded?.Disconnect();
		this._connectionSkillEnded = this.wcsCharacter.SkillEnded.Connect((skill) => {
			Logger.Log(script, "Player Character Skill Ended");
			this.skillManager.OnSkillEnded(skill);
			//this.animationManager.OnSkillEnded(skill);
		});
	}

	private _sendResourceUpdate(): void {
		// CharacterEvent.ResourceUpdated.SendToPlayer(this.player, this.HealthResource.GetPayload());
		// CharacterEvent.ResourceUpdated.SendToPlayer(this.player, this.ManaResource.GetPayload());
		// CharacterEvent.ResourceUpdated.SendToPlayer(this.player, this.StaminaResource.GetPayload());
		// CharacterEvent.ResourceUpdated.SendToPlayer(this.player, this.ExperienceResource.GetPayload());
	}
	/* Dealt Damage */
	public OnDamageDealt(enemy: Character | undefined, damageContainer: DamageContainer): void {
		Logger.Log(script, "Player Character Dealt Damage");
	}

	/* Died */
	public OnDeath(): void {
		Logger.Log(script, "Player Character Died");
		this.Destroy();
	}

	/* Take Damage */
	public OnTakeDamage(damageContainer: DamageContainer): void {
		// Logger.Log(script, "Player Character Took Damage");
		// this.HealthResource.SetCurrent(this.HealthResource.GetCurrent() - damageContainer.Damage);
		// const resource = {
		// 	resourceId: this.HealthResource.ResourceId,
		// 	current: this.HealthResource.GetCurrent(),
		// 	max: this.HealthResource.GetMax(),
		// };
		// CharacterEvent.ResourceUpdated.SendToPlayer(this.player, resource);
		// if (this.HealthResource.GetCurrent() <= 0) this.characterModel?.Humanoid.TakeDamage(9999999999);
	}

	/* Destroy */
	public Destroy(): void {
		super.Destroy();
	}
}
