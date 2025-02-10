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

	constructor(player: Player, playerData: IPlayerData, wcsCharacter: Character) {
		super(wcsCharacter);
		// Set Player
		this.player = player;
		// Initialize the Player Character
		this.level = playerData.ProgressionStats.Level;
		this.currentExperience = playerData.ProgressionStats.Experience;
		this.displayName = player.Name;

		/* Resources */
		this.HealthResource = CreateCharacterResource("Health", playerData);
		this.ManaResource = CreateCharacterResource("Mana", playerData);
		this.StaminaResource = CreateCharacterResource("Stamina", playerData);
		this.ExperienceResource = CreateCharacterResource("Experience", playerData);

		// Managers #TODO - Add Progression, Equipment, Inventory, etc.
		this.skillManager = new SkillsManager(wcsCharacter);
		this.skillManager.InitializeSkills(playerData);
	}

	/* Died */
	public OnDeath(): void {
		Logger.Log(script, "Player Character Died");
		this.HealthResource.SetCurrent(4);
	}

	/* Take Damage */
	public OnTakeDamage(DamageContainer: DamageContainer): void {
		Logger.Log(script, "Player Character Took Damage");
		this.HealthResource.SetCurrent(this.HealthResource.GetCurrent() - DamageContainer.Damage);
	}

	/* Destroy */
	public Destroy(): void {
		super.Destroy();
	}
}
