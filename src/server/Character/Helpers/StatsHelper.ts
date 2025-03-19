import IPlayerData from "shared/_Interfaces/Player Data/IPlayerData";
function CalculateDerivedStats(playerData: IPlayerData) {
	const coreStats = playerData["CharacterStats"];
	const derivedStats = {
		MaxHealth: coreStats.Constitution * 10,
		MaxStamina: coreStats.Constitution * 5 + coreStats.Dexterity * 5,
		MaxSoulPower: coreStats.Intelligence * 10,
		MaxDomainResource: coreStats.Strength * 3 + coreStats.Intelligence * 3 + coreStats.Speed * 3,
		ExperienceToNextLevel: playerData.ProgressionStats.Level * 100, // Example formula for experience to next level
	};

	return derivedStats;
}

export { CalculateDerivedStats };