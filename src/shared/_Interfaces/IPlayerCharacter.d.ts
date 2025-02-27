/*Entity*/
import IGameCharacter from "./IGameCharacter";
/* Managers */
import IAnimationManager from "shared/_Interfaces/Character Managers/IAnimationManager";
import IProgressionManager from "./Character Managers/IProgressionManager";
import IResourceManager from "shared/_Interfaces/Character Managers/IResourceManager";
import ISkillManager from "./Character Managers/ISkillManager";
import ITargetManager from "shared/_Interfaces/Character Managers/ITargetManager";

/* Package Imports */
import { DamageContainer } from "@rbxts/wcs";
import IPlayerData from "./IPlayerData";
import { TGameCharacter } from "shared/_Types/TGameCharacter";
import IDataManager from "./Character Managers/IDataManager";

/* IPlayerCharacter */
export default interface IPlayerCharacter extends IGameCharacter {
	// Player
	player: Player;
	playerData: IPlayerData;
	characterModel: TGameCharacter;
	humanoid: Humanoid;

	// // Resources
	CharacterInfo: IPlayerData["CharacterInfo"];
	ProgressionStats: IPlayerData["ProgressionStats"];
	CharacterStats: IPlayerData["CharacterStats"];

	// Managers
	dataManager: IDataManager;
	animationManager: IAnimationManager;
	progressionManager: IProgressionManager;
	resourceManager: IResourceManager;
	skillManager: ISkillManager;
	targetManager: ITargetManager;

	/* Event Handlers */
	OnDeath(): void;
	OnTakeDamage(DamageContainer: DamageContainer): void;

	// Destroy
	Destroy(): void;
}
