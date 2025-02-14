import { CharacterStatId } from "shared/_IDs/IDs_CharacterStat";

/* Character Resource */
export default interface ICharacterResource {
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
