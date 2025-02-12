import { Character, DamageContainer } from "@rbxts/wcs";
import { GameCharacterModel } from "../../../shared/_Types/GameCharacterModel";
import { SkillId } from "shared/_Types/SkillTypes";
import { CharacterResource } from "../Classes/CharacterResource";
import { IPlayerData } from "shared/_Functions/DataFunctions";

/* Test Interface for SkillManager */
export interface ISkillManager {
	// Skills
	SkillMap: Map<number, SkillId>;
	UnlockedSkills: Array<SkillId>;
	InitializeSkillMap(playerData: IPlayerData): void;
	AssignSkillToSlot(slot: number, skillId: SkillId): void;
	RemoveSkillFromSlot(slot: number): void;
}

/* IGameCharacter */
export interface IGameCharacter {
	level: number;
	characterId: string;
	displayName: string;
	characterModel?: GameCharacterModel;
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

/* IPlayerCharacter */
export interface IPlayerCharacter extends IGameCharacter {
	// Player
	player: Player;
	currentExperience: number;

	// Resources
	HealthResource: CharacterResource;
	ManaResource: CharacterResource;
	StaminaResource: CharacterResource;

	// Managers
	skillManager: ISkillManager;

	/* Event Handlers */
	OnDeath(): void;
	OnTakeDamage(DamageContainer: DamageContainer): void;

	// Destroy
	Destroy(): void;
}

/* INPCCharacter */
export interface INPCCharacter extends IGameCharacter {
	// NPC
	OnUpdate(): void;
	OnDeath(): void;
	OnSpawn(): void;
	OnTakeDamage(DamageContainer: DamageContainer): void;
	Destroy(): void;
}
