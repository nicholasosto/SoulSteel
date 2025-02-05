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
	/*
	  Purpose: Assigns a target to the target property in the game character
	  @param target: The target to assign to the game character

	  @return void
	*/

	setTarget(target: Character): void;
	clearTarget(): void;
}

export interface IGameCharacterController {
	gameCharacters: Map<string, IGameCharacter>;
	getGameCharacter(characterName: string): IGameCharacter;
	onWCSCharacterAdded(character: Character): void;
	onWCSCharacterRemoving(character: Character): void;
}
