import Logger from "shared/Utility/Logger";

/* WCS Modules */
import { Character, DamageContainer } from "@rbxts/wcs";

/* Character Index */
import IPlayerCharacter from "shared/_Interfaces/IPlayerCharacter";

/* Player Data */
import IPlayerData from "shared/_Interfaces/IPlayerData";

/* Managers */
import SkillsManager from "server/Character/Managers/SkillsManager";
import AnimationManager from "server/Character/Managers/AnimationManager";
import ResourceManager from "server/Character/Managers/ResourceManager";

/* Types */
import GameCharacter from "./GameCharacter";
import { QuestId } from "shared/_IDs/IDs_Quest";
import DataManager from "server/Controllers/DataManager";

/* Classes */
/* Player Character */
export default class PlayerCharacter extends GameCharacter implements IPlayerCharacter {
	public player: Player;
	private humanoid: Humanoid;
	private playerData: IPlayerData;
	public currentExperience: number;

	private _completedQuests: QuestId[] = [];

	/* Managers */
	public skillManager: SkillsManager;
	public animationManager: AnimationManager;
	public resourceManager: ResourceManager;

	/* Character Data */
	public CharacterInfo: IPlayerData["CharacterInfo"];

	/* Progression */
	public ProgressionStats: IPlayerData["ProgressionStats"];

	/* Character Stats */
	public CharacterStats: IPlayerData["CharacterStats"];

	/* Connections */
	/*WCS */
	private _connectionSkillStarted: RBXScriptConnection | undefined;
	private _connectionSkillEnded: RBXScriptConnection | undefined;
	private _connectionTakeDamage: RBXScriptConnection | undefined;
	private _connectionDealDamage: RBXScriptConnection | undefined;

	/* Heartbeat */
	private _heartbeatConnection: RBXScriptConnection | undefined;
	private _lastUpdate = tick();

	constructor(player: Player, playerData: IPlayerData, wcsCharacter: Character) {
		super(wcsCharacter);
		// Set Player
		this.player = player;
		this.playerData = playerData;
		this.humanoid = this.characterModel.Humanoid;
		//this.playerData = playerData;

		/* Set Player Data */
		this.level = playerData.ProgressionStats.Level;
		this.currentExperience = playerData.ProgressionStats.Experience;
		this.displayName = player.Name;

		/* Set Progression Data */
		this.ProgressionStats = playerData.ProgressionStats;

		/* Set Core Stats */
		this.CharacterStats = playerData.CharacterStats;

		/* Set Character Info */
		this.CharacterInfo = playerData.CharacterInfo;

		/* Resource Manager */
		this.resourceManager = new ResourceManager(this);

		/* Skills Manager */
		this.skillManager = new SkillsManager(playerData, wcsCharacter);
		this.skillManager.InitializeSkillMap(playerData);

		/* Animation Manager */
		assert(this.characterModel, "Character Model is nil");
		this.animationManager = new AnimationManager(this.characterModel, playerData["Skills"]["unlockedSkills"]);

		/* Initialize Connections */
		this._initializeConnections();
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
			this.resourceManager.OnSkillStarted(skill);
		});

		/* Skill Ended */
		this._connectionSkillEnded?.Disconnect();
		this._connectionSkillEnded = this.wcsCharacter.SkillEnded.Connect((skill) => {
			Logger.Log(script, "Player Character Skill Ended");
			this.skillManager.OnSkillEnded(skill);
		});

		/* Heartbeat */
		this._heartbeatConnection?.Disconnect();
		this._heartbeatConnection = game.GetService("RunService").Heartbeat.Connect(() => {
			const deltaTime = tick() - this._lastUpdate;
			if (deltaTime < 1) {
				return;
			} else {
				this.resourceManager.OnHeartBeat();
				this._lastUpdate = tick();
			}
		});
	}

	public OnAssignQuest(questId: QuestId): boolean {
		if (this._completedQuests.includes(questId)) {
			return false;
		}
		Logger.Log(script, "Quest Assigned", this.player.Name, questId);
		return true;
	}

	public OnQuestCompleted(questId: QuestId): boolean {
		if (this._completedQuests.includes(questId)) {
			return false;
		}
		Logger.Log(script, "Quest Completed", this.player.Name, questId);
		this._completedQuests.push(questId);
		return true;
	}

	/* Dealt Damage */
	public OnDamageDealt(enemy: Character | undefined, damageContainer: DamageContainer): void {
		Logger.Log(script, "Player Character Dealt Damage");
	}

	public UpdateExperience(amount: number): void {
		Logger.Log(script, "Player Character Experience Updated");
		const newExperience = this.ProgressionStats.Experience + amount;
		if(newExperience >= this.ProgressionStats.ExperienceToNextLevel) {
			this.ProgressionStats.Experience = newExperience - this.ProgressionStats.ExperienceToNextLevel;
			this.ProgressionStats.Level += 1;
			this.ProgressionStats.ExperienceToNextLevel = this.ProgressionStats.Level * 100;
		} else {
			this.ProgressionStats.Experience = newExperience;
		}
	}

	/* Died */
	public OnDeath(): void {
		Logger.Log("Flow - On Death", this.player.Name);
		this.humanoid.Health = 0;
		this.skillManager.Destroy();
		this.animationManager.Destroy();
		this.resourceManager.Destroy();
		this._heartbeatConnection?.Disconnect();
	}

	/* Take Damage */
	public OnTakeDamage(damageContainer: DamageContainer): void {
		this.resourceManager.OnDamageTaken(damageContainer.Damage);
		this.skillManager.OnDamageTaken();
		this.animationManager.OnDamageTaken();

		if (this.resourceManager.HealthResource.GetCurrent() <= 0) {
			Logger.LogFlow("[Player Character Flow][Death][OnTakeDamage]", 1, script);
			this.OnDeath();
		}
	}
}
