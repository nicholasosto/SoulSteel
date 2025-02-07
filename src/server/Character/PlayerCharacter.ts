import Logger from "shared/Utility/Logger";

// External Modules
import { Character, DamageContainer } from "@rbxts/wcs";

// Interfaces and Types
import { IPlayerCharacter } from "shared/Game Character/ICharacter";
import { IPlayerData } from "shared/_References/PlayerData";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";
import { ISkillManager } from "shared/Game Character/ICharacter";

// Classes
import GameCharacter from "./GameCharacter";
import { CharacterResource } from "shared/Game Character/Character Resources/CharacterResource";

//NET
import SkillsManager from "server/Character/Managers/SkillsManager";

export default class PlayerCharacter extends GameCharacter implements IPlayerCharacter {
	public player: Player;
	public level: number;
	public currentExperience: number;

	//public skillSlotMap = new Map<number, SkillId>();
	public unlockedSkills: SkillId[] = [];
	/* Managers */
	public skillManager: ISkillManager;

	/* Resources */
	public HealthResource: CharacterResource = new CharacterResource("Health");

	constructor(player: Player, wcsCharacter: Character, playerData: IPlayerData) {
		super(wcsCharacter);
		this.player = player;

		// Managers #TODO - Add Progression, Equipment, Inventory, etc.
		this.skillManager = new SkillsManager(wcsCharacter);

		// Initialize the Player Character
		this.level = playerData.ProgressionStats.Level;
		this.currentExperience = playerData.ProgressionStats.Experience;

		this.displayName = player.Name;
		// Initialize the Skills
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

	public Destroy(): void {
		Logger.Log(script, "Destroying Player Character");
		super.Destroy();
	}
}
