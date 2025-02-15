import { CharacterStatId } from "shared/_IDs/IDs_CharacterStat";
import { ResourceId } from "shared/_IDs/IDs_Resource";

/* Character Resource */
export default interface ICharacterResource {
	ResourceId: ResourceId;
	GetCurrent(): number;
	GetMax(): number;
	GetValues(): [current: number, max: number];
	GetPercentage(): number;
	SetMax(value: number): void;
	SetCurrent(value: number): void;
}
