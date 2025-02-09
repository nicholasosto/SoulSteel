import Logger from "shared/Utility/Logger";

// External Modules
import { Character, DamageContainer } from "@rbxts/wcs";

// Interfaces and Types
import { IPlayerCharacter, ISkillManager } from "shared/Game Character/CharacterIndex";
import { IPlayerData } from "shared/Data Interfaces/PlayerData";
// Classes
import GameCharacter from "./GameCharacter";
import {
	CharacterResource,
	CreateCharacterResource,
} from "shared/Game Character/Character Resources/CharacterResource";

//NET
import SkillsManager from "server/Character/Managers/SkillsManager";

export default class PlayerCharacter extends GameCharacter implements IPlayerCharacter {
	public player: Player;
	public currentExperience: number;

	/* Managers */
	public skillManager: ISkillManager;

	/* Resources */
	public HealthResource: CharacterResource;
	public ManaResource: CharacterResource;
	public StaminaResource: CharacterResource;
	public ExperienceResource: CharacterResource;

	/* Connections */
	private _characterCreated: RBXScriptConnection | undefined;
	private _characterDestroyed: RBXScriptConnection | undefined;

	constructor(player: Player, playerData: IPlayerData, wcsCharacter: Character) {

		super(wcsCharacter);
		// Set Player
		this.player = player;
		Logger.Log(script, "Player Character Created: ", this.wcsCharacter as unknown as string);
		// Initialize the Player Character
		this.level = playerData.ProgressionStats.Level;
		this.currentExperience = playerData.ProgressionStats.Experience;
		this.displayName = player.Name;

		/* Initialize Listeners */
		this._initializeListeners();

		/* Resources */
		this.HealthResource = CreateCharacterResource("Health", playerData);
		this.ManaResource = CreateCharacterResource("Mana", playerData);
		this.StaminaResource = CreateCharacterResource("Stamina", playerData);
		this.ExperienceResource = CreateCharacterResource("Experience", playerData);

		// Managers #TODO - Add Progression, Equipment, Inventory, etc.
		this.skillManager = new SkillsManager(wcsCharacter);
		this.skillManager.InitializeSkills(playerData);
	}

	private _initializeListeners() {
		/* Character Model Created */
		this._characterCreated?.Disconnect();
		this._characterCreated = this.player.CharacterAdded.Connect(() => {
			Logger.Log(script, "[PlayerCharacter] Character Created");
		});

		/* Character Model Destroyed */
		this._characterDestroyed?.Disconnect();
		this._characterDestroyed = this.player.CharacterRemoving.Connect(() => {
			Logger.Log(script, "[PlayerCharacter] Character Destroyed");
			this.Destroy();
		});
	}

	/* Died */
	public OnDeath(): void {
		Logger.Log(script, "Player Character Died");
		this.HealthResource.SetCurrent(4);
	}

	/* Take Damage */
	public OnTakeDamage(DamageContainer: DamageContainer): void {
		Logger.Log(script, "Player Character Took Damage");
		this.HealthResource.SetCurrent(this.HealthResource.Current - DamageContainer.Damage);
	}

	/* Destroy */
	public Destroy(): void {
		super.Destroy();
	}
}
