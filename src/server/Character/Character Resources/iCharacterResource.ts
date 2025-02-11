type CharacterStatId = "Strength" | "Speed" | "Dexterity" | "Intelligence" | "Constitution";

interface iCharacterStats {
	Strength: number;
	Speed: number;
	Dexterity: number;
	Intelligence: number;
	Constitution: number;
}

interface TCharacterResource {
	ResourceName: string;
	PrimaryStat: CharacterStatId;
	SecondaryStat: CharacterStatId;
	GetCurrent: () => number;
	GetMax: () => number;
	GetValues: () => [current: number, max: number];
	GetPercentage: () => number;
	SetMax: (value: number) => void;
	SetCurrent: (value: number) => void;
	GetLabel: () => string;
	ActivateRegen: (activate: boolean) => void;
}

export { CharacterStatId, iCharacterStats as CharacterStats, TCharacterResource };
