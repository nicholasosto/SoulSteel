import Logger from "shared/Utility/Logger";

/* WCS Modules */
import { Character, DamageContainer } from "@rbxts/wcs";

/* Character Index */
import IPlayerCharacter from "shared/_Interfaces/IPlayerCharacter";

/* Player Data */
import IPlayerData from "shared/_Interfaces/Player Data/IPlayerData";

/* Managers */
import SkillsManager from "server/Character/Managers/SkillsManager";
import AnimationManager from "server/Character/Managers/AnimationManager";
import ResourceManager from "server/Character/Managers/ResourceManager";
import PlayerDataManager from "server/Character/Managers/PlayerDataManager";
import ProgressionManager from "./Managers/ProgressionManager";

/* Types */
import GameCharacter from "./GameCharacter";
import { QuestId } from "shared/_IDs/IDs_Quest";
import TargetManager from "./Managers/TargetManager";
import { TGameCharacter } from "shared/_Types/TGameCharacter";

/* Classes */
/* Player Character */
export default class PlayerCharacter extends GameCharacter implements IPlayerCharacter {
	public player: Player;
	public gameCharacterModel: TGameCharacter;
	public humanoid: Humanoid;

	private _completedQuests: QuestId[] = [];

	/* Managers */

	public animationManager: AnimationManager;
	public dataManager: PlayerDataManager;
	public progressionManager: ProgressionManager;
	public resourceManager: ResourceManager;
	public skillManager: SkillsManager;
	public targetManager: TargetManager;

	/* Connections */
	/* Humanoid */
	private _humanoidDied: RBXScriptConnection | undefined;

	/* Equipment Connections */
	private _connectionEquip: RBXScriptConnection | undefined;
	private _connectionUnequip: RBXScriptConnection | undefined;

	/*WCS */
	private _connectionSkillStarted: RBXScriptConnection | undefined;
	private _connectionSkillEnded: RBXScriptConnection | undefined;
	private _connectionTakeDamage: RBXScriptConnection | undefined;
	private _connectionDealDamage: RBXScriptConnection | undefined;

	/* Heartbeat */
	private _heartbeatConnection: RBXScriptConnection | undefined;
	private _lastUpdate = tick();

	constructor(player: Player, wcsCharacter: Character) {
		super(wcsCharacter);
		// Set Player
		this.player = player;
		this.gameCharacterModel = player.Character as TGameCharacter;
		this.humanoid = this.characterModel.Humanoid;
		this.displayName = player.Name;
		/* Data Manager */
		this.dataManager = new PlayerDataManager(this);
		const playerData = this.dataManager.GetData();
		this.dataManager.UpdateCharacterName(player.Name + "Bugga Boo");

		/* Resource Manager */
		this.resourceManager = new ResourceManager(this, playerData);

		/* Skills Manager */
		this.skillManager = new SkillsManager(this);
		this.skillManager.InitializeSkillMap(playerData);

		/* Target Manager */
		this.targetManager = new TargetManager(this);

		/* Progression Manager */
		this.progressionManager = new ProgressionManager(player, this.dataManager);

		/* Animation Manager */
		assert(this.characterModel, "Character Model is nil");
		this.animationManager = new AnimationManager(this, playerData);

		/* Initialize Connections */
		this._initializeConnections();
	}

	/*Connections */
	protected _initializeConnections(): void {
		/* Humanoid */
		this._humanoidDied?.Disconnect();
		this._humanoidDied = this.humanoid.Died.Connect(() => {
			Logger.Log(script, "Flow - Player Character Died");
			this.OnDeath();
		});
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

	/* Died */
	public OnDeath(): void {
		Logger.Log("Flow - On Death", this.player.Name);
		this.dataManager.OnDeath();
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
