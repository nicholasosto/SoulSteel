import IGameCharacter from "./IGameCharacter";
import ISkillManager from "./ISkillManager";
import IResourceManager from "shared/_Interfaces/IResourceManager";
import IAnimationManager from "shared/_Interfaces/IAnimationManager";
import { DamageContainer } from "@rbxts/wcs";
import IPlayerData from "./IPlayerData";
import { TGameCharacter } from "shared/_Types/TGameCharacter";

/* IPlayerCharacter */
export default interface IPlayerCharacter extends IGameCharacter {
	// Player
	player: Player;
	characterModel: TGameCharacter;
	humanoid: Humanoid;

	// // Resources
	CharacterInfo: IPlayerData["CharacterInfo"];
	ProgressionStats: IPlayerData["ProgressionStats"];
	CharacterStats: IPlayerData["CharacterStats"];

	// Managers
	skillManager: ISkillManager;
	resourceManager: IResourceManager;
	animationManager: IAnimationManager;

	/* Event Handlers */
	OnDeath(): void;
	OnTakeDamage(DamageContainer: DamageContainer): void;

	// Destroy
	Destroy(): void;
}
