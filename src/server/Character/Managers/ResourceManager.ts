import Logger from "shared/Utility/Logger";
import { ResourceId } from "server/Character/Index/CharacterIndex";
import { CharacterResource } from "../Classes/CharacterResource";
import { Character, UnknownSkill } from "@rbxts/wcs";
import IPlayerCharacter from "shared/_Interfaces/IPlayerCharacter";
import ICharacterStats from "shared/_Interfaces/ICharacterStats";
import IPlayerData from "shared/_Interfaces/IPlayerData";
import IResourceManager from "shared/_Interfaces/IResourceManager";

/* Responibilities */
// - Create and manage resources for the character
// - Listen for skill events and update resources accordingly
// - Listen for combat events and update resources accordingly

function calculateMaxHealth(characterStats: ICharacterStats, level: number): number {
	const baseHealth = 100;
	const healthPerConstitution = 10;
	const healthPerStrength = 5;

	const levelBonus = baseHealth * level;
	const constitutionBonus = healthPerConstitution * characterStats.Constitution;
	const strengthBonus = healthPerStrength * characterStats.Strength;

	const totalHealth = levelBonus + constitutionBonus + strengthBonus;

	return totalHealth;
}

function calculateMaxMana(characterStats: IPlayerData["CharacterStats"], level: number): number {
	const baseMana = 100;
	const manaPerIntelligence = 10;

	const levelBonus = baseMana * level;
	const intelligenceBonus = manaPerIntelligence * characterStats.Intelligence;

	const totalMana = levelBonus + intelligenceBonus;

	return totalMana;
}

function calculateMaxStamina(characterStats: ICharacterStats, level: number): number {
	const baseStamina = 100;
	const staminaPerDexterity = 10;

	const levelBonus = baseStamina * level;
	const dexterityBonus = staminaPerDexterity * characterStats.Dexterity;

	const totalStamina = levelBonus + dexterityBonus;

	return totalStamina;
}

/* Resource Manager */
export default class ResourceManager implements IResourceManager {
	/* Player Character */
	private _playerCharacter: IPlayerCharacter;

	/* Resources */
	public HealthResource: CharacterResource;
	public ManaResource: CharacterResource;
	public StaminaResource: CharacterResource;

	/* Constructor */
	constructor(PlayerCharacter: IPlayerCharacter) {
		this._playerCharacter = PlayerCharacter;
		const level = this._playerCharacter.ProgressionStats.Level;
		const characterStats = this._playerCharacter.CharacterStats;
		this.HealthResource = new CharacterResource("Health", calculateMaxHealth(characterStats, level));
		this.ManaResource = new CharacterResource("Mana", calculateMaxMana(characterStats, level));
		this.StaminaResource = new CharacterResource("Stamina", calculateMaxStamina(characterStats, level));
	}

	/* Load Skills from List */
	CreatePlayerResource(resourceId: ResourceId): void {
		Logger.Log(script, `[ResourceManager]: Creating Resource: ${resourceId}`);
	}

	public OnSkillStarted(skill: UnknownSkill): void {
		Logger.Log(script, `[ResourceManager]: Skill Started: ${skill}`);
	}

	public OnSkillEnded(skill: UnknownSkill): void {
		Logger.Log(script, `[ResourceManager]: Skill Ended: ${skill}`);
	}
}
