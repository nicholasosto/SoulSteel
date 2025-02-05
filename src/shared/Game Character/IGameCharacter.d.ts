import { Character } from "@rbxts/wcs";
import { TGameCharacter } from "./TGameCharacter";

export interface IGameCharacter {
	characterName: string;
	characterModel?: TGameCharacter;
	wcsCharacter: Character;
	target?: TGameCharacter;
	rewardMap: Map<string, number>;
	// Skills
	addSkill(skillId: string): void;
	removeSkill(skillId: string): void;

	takeDamage(damage: number): void;
	// Targeting
	setTarget(target: Character): void;
	clearTarget(): void;
}
