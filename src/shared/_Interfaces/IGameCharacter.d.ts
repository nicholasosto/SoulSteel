import { Character, DamageContainer } from "@rbxts/wcs";
import { TGameCharacter } from "shared/_Types/TGameCharacter";
/* IGameCharacter */
export default interface IGameCharacter {
	level: number;
	characterId: string;
	displayName: string;
	characterModel?: TGameCharacter;
	wcsCharacter: Character;
	target?: IGameCharacter;

	// Constructor
	// Skills
	//RegisterSkill(skillId: SkillId): void;
	TakeDamage(damage: DamageContainer): void;
	SetTarget(target: IGameCharacter): void;
	ClearTarget(): void;
	Destroy(): void;
}