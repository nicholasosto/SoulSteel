type ResourceId = "Health" | "Mana" | "Stamina" | "Domain" | "Class" | "Experience";
type CharacterStatId = "Strength" | "Speed" | "Dexterity" | "Intelligence" | "Constitution";

/* ICharacterStats */
interface ICharacterStats {
	Strength: number;
	Speed: number;
	Dexterity: number;
	Intelligence: number;
	Constitution: number;
}

/* Character Resource */
interface ICharacterResource {
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

export { ResourceId, CharacterStatId, ICharacterStats, ICharacterResource };
