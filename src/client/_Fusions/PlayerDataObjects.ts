import Fusion from "@rbxts/fusion";

const { Value } = Fusion;

/* Resources */
const PlayerResourceVO = {
	/* Current Resources */
	CurrentHealth: Value(0),
	CurrentStamina: Value(0),
	CurrentSoulPower: Value(0),
	CurrentDomainResource: Value(0),
	/* Max Resources */
	MaxHealth: Value(0),
	MaxStamina: Value(0),
	MaxSoulPower: Value(0),
	MaxDomainResource: Value(0),
};

/* Class Data */
const PlayerClassVO = {
	ClassName: Value("Vampire"),
	Domain: Value("Blood"),
};

const PlayerDisplayNameVO = Value("PlayerName");

/* Core Stats */
const PlayerCoreStatsVO = {
	Strength: Value(10),
	Dexterity: Value(10),
	Intelligence: Value(10),
	Constitution: Value(10),
	Speed: Value(10),
};

/* Level and Experience */
const PlayerProgressionVO = {
	CurrentExperience: Value(0),
	ExperienceToNextLevel: Value(0),
	PlayerLevel: Value(1),
};

export { PlayerResourceVO, PlayerClassVO, PlayerCoreStatsVO, PlayerProgressionVO, PlayerDisplayNameVO };
