import Logger from "shared/Utility/Logger";

// External Modules
import { Character, DamageContainer } from "@rbxts/wcs";

// Interfaces and Types
import { IPlayerCharacter, ISkillManager } from "shared/Game Character/CharacterIndex";
import { IPlayerData } from "shared/Data Interfaces/PlayerData";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";

// Classes
import GameCharacter from "./GameCharacter";
import { CharacterResource } from "shared/Game Character/Character Resources/CharacterResource";

//NET
import SkillsManager from "server/Character/Managers/SkillsManager";

export default class PlayerCharacter extends GameCharacter implements IPlayerCharacter {
	public player: Player;
	public currentExperience: number;

	/* Managers */
	public skillManager: ISkillManager;

	/* Resources */
	public HealthResource: CharacterResource = new CharacterResource("Health");

	constructor(player: Player, wcsCharacter: Character, playerData: IPlayerData) {
		super(wcsCharacter);
		// Set Player
		this.player = player;

		// Initialize the Player Character
		this.level = playerData.ProgressionStats.Level;
		this.currentExperience = playerData.ProgressionStats.Experience;
		this.displayName = player.Name;

		// Managers #TODO - Add Progression, Equipment, Inventory, etc.
		this.skillManager = new SkillsManager(wcsCharacter);
		this.skillManager.InitializeSkills(playerData);
	}

	/* Died */
	public OnDeath(): void {
		Logger.Log(script, "Player Character Died");
	}

	/* Take Damage */
	public OnTakeDamage(DamageContainer: DamageContainer): void {
		Logger.Log(script, "Player Character Took Damage");
		this.HealthResource.SetCurrent(this.HealthResource.Current - DamageContainer.Damage);
	}

	/* Destroy */
	public Destroy(): void {
		Logger.Log(script, "Destroying Player Character");
		super.Destroy();
	}
}
