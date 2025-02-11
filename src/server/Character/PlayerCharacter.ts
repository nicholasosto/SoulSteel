import Logger from "shared/Utility/Logger";

/* WCS Modules */
import { Character, DamageContainer } from "@rbxts/wcs";

/* Character Index */
import { CharacterStatId, IPlayerCharacter, ResourceId } from "server/Character/Index/CharacterIndex";

/* Player Data */
import { IPlayerData } from "shared/_Functions/DataFunctions";

/* Server Events */
import { CharacterEvent } from "server/net/_Server_Events";

/* Managers */
import SkillsManager from "server/Character/Managers/SkillsManager";
import GameCharacter from "./GameCharacter";

/* Classes */
import { CharacterResource } from "./Classes/CharacterResource";

/* Player Character */
export default class PlayerCharacter extends GameCharacter implements IPlayerCharacter {
	public player: Player;
	public currentExperience: number;

	/* Managers */
	public skillManager: SkillsManager;

	/* Progression */
	private ProgressionData: IPlayerData["ProgressionData"];

	/* Character Stats */
	private CharacterStats: IPlayerData["CharacterStats"];

	/* Resources */
	public HealthResource: CharacterResource;
	public ManaResource: CharacterResource;
	public StaminaResource: CharacterResource;
	public ExperienceResource: CharacterResource;

	constructor(player: Player, playerData: IPlayerData, wcsCharacter: Character) {
		super(wcsCharacter);
		// Set Player
		this.player = player;

		/* Set Player Data */
		this.level = playerData.ProgressionStats.Level;
		this.currentExperience = playerData.ProgressionStats.Experience;
		this.displayName = player.Name;

		/* Set Progression Data */
		this.ProgressionData = playerData.ProgressionData;

		/* Set Core Stats */
		this.CharacterStats = playerData.CharacterStats;

		/* Resources */
		this.HealthResource = new CharacterResource(
			"Health",
			this.CharacterStats.Constitution,
			this.CharacterStats.Strength,
			this.level,
		);
		this.ManaResource = new CharacterResource(
			"Mana",
			this.CharacterStats.Intelligence,
			this.CharacterStats.Constitution,
			this.level,
		);

		this.StaminaResource = new CharacterResource(
			"Stamina",
			this.CharacterStats.Dexterity,
			this.CharacterStats.Constitution,
			this.level,
		);

		this.ExperienceResource = new CharacterResource(
			"Experience",
			this.CharacterStats.Intelligence,
			this.CharacterStats.Constitution,
			this.level,
		);
		/* Skills Manager */
		this.skillManager = new SkillsManager(wcsCharacter);
		this.skillManager.InitializeSkills(playerData);
	}

	/* Died */
	public OnDeath(): void {
		Logger.Log(script, "Player Character Died");
		this.Destroy();
	}

	/* Take Damage */
	public OnTakeDamage(DamageContainer: DamageContainer): void {
		Logger.Log(script, "Player Character Took Damage");
		this.HealthResource.SetCurrent(this.HealthResource.GetCurrent() - DamageContainer.Damage);
		const resource = {
			resourceId: this.HealthResource.ResourceName as ResourceId,
			current: this.HealthResource.GetCurrent(),
			max: this.HealthResource.GetMax(),
		};
		CharacterEvent.ResourceUpdated.SendToPlayer(this.player, resource);
	}

	/* Destroy */
	public Destroy(): void {
		super.Destroy();
	}
}
