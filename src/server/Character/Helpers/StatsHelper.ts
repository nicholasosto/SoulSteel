import IPlayerData from "shared/_Interfaces/Player Data/IPlayerData";
import PlayerCharacter from "../PlayerCharacter";
function ReCalculateDerivedStats(playerData: IPlayerData) {
	const coreStats = playerData["CharacterStats"];
	const derivedStats = {
		/* Health */
		MaxHealth: coreStats.Constitution * 10,
		CurrentHealth: coreStats.Constitution * 10,

		/* Stamina */
		MaxStamina: coreStats.Constitution * 5 + coreStats.Dexterity * 5,
		CurrentStamina: coreStats.Constitution * 5 + coreStats.Dexterity * 5,

		/* Soul Power */
		MaxSoulPower: coreStats.Intelligence * 10,
		CurrentSoulPower: coreStats.Intelligence * 10,

		/* Domain Resource */
		MaxDomainResource: coreStats.Strength * 3 + coreStats.Intelligence * 3 + coreStats.Speed * 3,
		CurrentDomainResource: coreStats.Strength * 3 + coreStats.Intelligence * 3 + coreStats.Speed * 3,

		/* Experience */
		Experience: playerData.ProgressionStats.Experience,
		ExperienceToNextLevel: playerData.ProgressionStats.Level * 100, // Example formula for experience to next level
	};

	return derivedStats;
}

export { ReCalculateDerivedStats };
