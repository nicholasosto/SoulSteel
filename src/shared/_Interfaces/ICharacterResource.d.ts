import { CharacterStatId } from "shared/_IDs/IDs_CharacterStat";
import { ResourceId } from "shared/_IDs/IDs_Resource";

/* Character Resource */
export default interface ICharacterResource {
	ResourceId: ResourceId;
	readonly Current: number;
	readonly MaxValue: number;
	GetPercentage(): number;
	GetPayload(): { resourceId: ResourceId; current: number; max: number };
	SetMax(value: number): void;
	SetCurrent(value: number): void;

}
