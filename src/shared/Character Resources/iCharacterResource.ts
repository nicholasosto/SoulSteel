type CharacterStatId = "Strength" | "Speed" | "Dexterity" | "Intelligence" | "Constitution";

interface CharacterStats {
	Strength: number;
	Speed: number;
	Dexterity: number;
	Intelligence: number;
	Constitution: number;
}

type TCharacterResource = {
	ResourceName: string;
	PrimaryStat: CharacterStatId;
	SecondaryStat: CharacterStatId;
	GetPercentage: () => number;
	GetLabel: () => string;
	ActivateRegen: (activate: boolean) => void;
};

export { CharacterStatId, CharacterStats, TCharacterResource };
