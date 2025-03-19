/** Data Value Objects for Game Data
 * Value Object Exports for import in other Modules like ClientNetManager
 *
 * */

import Fusion, { Computed } from "@rbxts/fusion";

const { Value } = Fusion;

/* Values */
/* Basic Information */
const playerDisplayName = Value("Player");

/* ==== Currency Information ===== */
const playerSoulChips = Value(0);
const playerSoulShards = Value(0);
const playerSoulGems = Value(0);
const PlayerCurrency = {
	playerSoulChips,
	playerSoulShards,
	playerSoulGems,
};

/* ===== Player Stats ====== */
/* Basic Stats */
const playerStrength = Value(10);
const playerDexteriy = Value(10);
const playerIntelligence = Value(10);
const playerConstitution = Value(10);
const PlayerSpeed = Value(10);
/* Attribute Points */
const playerAttributePoints = Value(0);
const playerSpentAttributePoints = Value(0);

const PlayerStats = {
	playerStrength,
	playerDexteriy,
	playerIntelligence,
	playerConstitution,
	PlayerSpeed,

	playerAttributePoints,
	playerSpentAttributePoints,
};

/* Computed Stats */

/* Leveling Information */
const playerLevel = Value(1);
const playerExperience = Value(0);
const experienceToNextLevel = Computed(() => {
	return playerLevel.get() * 100; // Example: each level requires 100 more experience
});
const PlayerProgression = {
	playerLevel,
	playerExperience,
	experienceToNextLevel,
};

/*====== Resource Bars =======*/
/* Health Property*/
const playerMaxHealth = Computed(() => {
	return playerConstitution.get() * 10; // Example: each constitution point gives 10 health
});
const playerCurrentHealth = Value(playerMaxHealth.get());
const PlayerHealth = {
	playerMaxHealth,
	playerCurrentHealth,
};

/* Stamina Property*/
const playerMaxStamina = Computed(() => {
	return playerDexteriy.get() * 5; // Example: each dexterity point gives 5 stamina
});
const playerCurrentStamina = Value(playerMaxStamina.get());
const PlayerStamina = {
	playerMaxStamina,
	playerCurrentStamina,
};

/* Soul Power Property*/
const playerMaxSoulPower = Computed(() => {
	return playerIntelligence.get() * playerDexteriy.get() * playerConstitution.get(); // Example: each intelligence point gives 2 soul power
});
const playerCurrentSoulPower = Value(playerMaxSoulPower.get());
const PlayerSoulPower = {
	playerMaxSoulPower,
	playerCurrentSoulPower,
};

/* Domain Resource */
const playerDomainResourceMax = Computed(() => {
	return playerMaxSoulPower.get() + playerMaxStamina.get() + playerMaxHealth.get();
});
const playerDomainResourceCurrent = Computed(() => {
	return playerMaxSoulPower.get() + playerMaxHealth.get() + playerCurrentHealth.get();
});
const PlayerDomainResource = {
	playerDomainResourceMax,
	playerDomainResourceCurrent,
};

const ResourceBars = {
	PlayerProgression,
	PlayerHealth,
	PlayerStamina,
	PlayerSoulPower,
	PlayerDomainResource,
};

export { PlayerProgression, ResourceBars, PlayerCurrency, PlayerStats };
