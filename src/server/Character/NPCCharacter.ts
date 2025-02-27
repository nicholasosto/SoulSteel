import GameCharacter from "./GameCharacter";
import { TGameCharacter } from "shared/_Types/TGameCharacter";
import { Character, DamageContainer } from "@rbxts/wcs";
import INPCCharacter from "shared/_Interfaces/INPCCharacter";
import Logger from "shared/Utility/Logger";
import StorageManager from "shared/Storage Manager/StorageManager";
import { BGUI_HealthBar } from "shared/_Types/TBillboardGUI";
import AnimationManager from "server/Character/Managers/AnimationManager";

const healthBar = StorageManager.CloneFromStorage("BGUI_HealthBar") as BGUI_HealthBar;

function UpdateHealthbar(characterModel: TGameCharacter | undefined, healthBar: BGUI_HealthBar) {
	if (!characterModel) return;
	const humanoid = characterModel.Humanoid;
	const currentHealth = humanoid.Health;
	const maxHealth = humanoid.MaxHealth;
	const percent = (currentHealth / maxHealth) * 100;
	healthBar.ContainerFrame.ProgressBar.Foreground.Bar.Size = new UDim2(0, percent, 1, 0);
}

export default class NPCCharacter extends GameCharacter implements INPCCharacter {
	public level: number;

	/* Health Bar */
	private _healthBar = healthBar.Clone() as BGUI_HealthBar;

	/* Managers */
	private _animationManager: AnimationManager;

	/* Connections */
	private _connectionWCSTakeDamage: RBXScriptConnection | undefined;
	private _connectionWCSDealtDamage: RBXScriptConnection | undefined;
	private _connectionWCSSkillStarted: RBXScriptConnection | undefined;
	private _connectionWCSDied: RBXScriptConnection | undefined;

	constructor(wcsCharacter: Character, level: number = 1) {
		super(wcsCharacter);
		assert(this.characterModel, "Character Model is nil");

		this._animationManager = new AnimationManager(this.characterModel, ["BasicHold", "BasicMelee"]);

		this._healthBar.Parent = this.characterModel;
		this._healthBar.Adornee = this.characterModel.Head;

		this._healthBar.ContainerFrame.CharacterName.Text = this.displayName;
		this.level = level;

		this._initializeConnections();
		Logger.Log("Created NPC Character: ", this.displayName);
	}

	protected _initializeConnections(): void {
		/* Take Damage */
		this._connectionWCSTakeDamage?.Disconnect();
		this._connectionWCSTakeDamage = this.wcsCharacter.DamageTaken.Connect((damageContainer) => {
			this.OnTakeDamage(damageContainer);
		});

		/* Deal Damage */
		this._connectionWCSDealtDamage?.Disconnect();
		this._connectionWCSDealtDamage = this.wcsCharacter.DamageDealt.Connect((enemy, damageContainer) => {
			this.OnDamageDealt(enemy, damageContainer);
		});

		/* Skill Started */
		this._connectionWCSSkillStarted?.Disconnect();
		this._connectionWCSSkillStarted = this.wcsCharacter.SkillStarted.Connect((skill) => {
			this._animationManager.OnSkillStarted(skill);
		});

		/* Died */
		this._connectionWCSDied?.Disconnect();
		this._connectionWCSDied = this.characterModel.Humanoid.Died.Connect(() => {
			this.OnDeath();
		});
	}

	public OnSpawn(): void {
		Logger.Log(script, "NPC Character Spawned: ", this.displayName);
	}

	public OnUpdate(): void {
		Logger.Log(script, "Updating NPC Character");
	}
	public OnDeath(): void {
		Logger.Log(script, "NPC Character Died: ", this.displayName);
		this.Destroy();
	}

	public OnTakeDamage(damageContainer: DamageContainer): void {
		Logger.Log(script, "NPC Just Took: ", damageContainer.Damage);
		this.wcsCharacter.Humanoid.TakeDamage(damageContainer.Damage);
		UpdateHealthbar(this.characterModel, this._healthBar);
	}

	private OnDamageDealt(enemy: Character | undefined, DamageContainer: DamageContainer): void {
		Logger.Log(script, "NPC Dealt Damage: ", enemy?.Instance.Name);
	}

	public Destroy(): void {
		Logger.Log(script, "Destroying Player Character");
		this._healthBar.Destroy();
		super.Destroy();
	}
}
