import { Character, DamageContainer, Skill } from "@rbxts/wcs";
import { TGameCharacter } from "./TGameCharacter";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";
import { CharacterResource } from "./Character Resources/CharacterResource";
import { IPlayerData } from "shared/Data Interfaces/PlayerData";

/* Test Interface for SkillManager */
export interface ISkillManager {
	// Skills
	SkillMap: Map<number, SkillId>;
	UnlockedSkills: Array<SkillId>;
	InitializeSkills(playerData: IPlayerData): void;
	AssignSkillToSlot(slot: number, skillId: SkillId): void;
	RemoveSkillFromSlot(slot: number): void;
}

/* IGameCharacter */
export interface IGameCharacter {
	level: number;
	characterId: string;
	displayName: string;
	characterModel?: TGameCharacter;
	wcsCharacter: Character;
	target?: IGameCharacter;
	rewardMap: Map<IGameCharacter, number>;
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
	level: number;
	currentExperience: number;

	// Resources
	HealthResource: CharacterResource;

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
