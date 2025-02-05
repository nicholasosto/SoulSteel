import { Character } from "@rbxts/wcs";
import { TGameCharacter } from "./TGameCharacter";
import { IGameCharacter } from "./IGameCharacter";

export default class GameCharacter implements IGameCharacter {
	characterName: string;
	characterModel?: TGameCharacter;
	wcsCharacter: Character;
	target?: TGameCharacter;
	rewardMap: Map<string, number> = new Map<string, number>();

	constructor(wcsCharacter: Character) {
		this.characterName = "GameCharacter";
		this.wcsCharacter = wcsCharacter;
		this.characterModel = this.wcsCharacter.Instance as TGameCharacter;
	}

	addSkill(skillId: string): void {
		// Add Skill to the Character
	}

	removeSkill(skillId: string): void {
		// Remove Skill from the Character
	}

	takeDamage(damage: number): void {
		// Take Damage
	}

	setTarget(target: Character): void {
		// Set Target
	}

	clearTarget(): void {
		// Clear Target
	}
}
