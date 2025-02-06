import { Character, DamageContainer, Skill } from "@rbxts/wcs";
import { TGameCharacter } from "./TGameCharacter";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";
import { EquipmentId, EquipmentSlotId } from "shared/_References/Inventory";
import { CharacterStatId } from "shared/Character Resources/iCharacterResource";

/* IGameCharacter */
export interface IGameCharacter {
	characterId: string;
	displayName: string;
	characterModel?: TGameCharacter;
	wcsCharacter: Character;
	target?: IGameCharacter;
	rewardMap: Map<IGameCharacter, number>;
	// Constructor
	// Skills
	RegisterSkill(skillId: SkillId): void;
	RemoveSkills(): void;
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

	/* Holds the equipped skills for the player */
	skillSlotMap: Map<number, SkillId>;

	/* Holds the equipped equipment for the player */
	equipmentSlotMap: Map<EquipmentSlotId, EquipmentId>;

	/* Holds the player's core stats/character attributes */
	statsMap: Map<CharacterStatId, number>;

	// Skills
	AssignSkillToSlot(slot: number, skillId: SkillId): void;
	RemoveSkillFromSlot(slot: number): void;
	GetSkillSlotMap(): Map<number, SkillId>;
	GetUnlockedSkills(): Array<SkillId>;

	// Equipment
	EquipItem(equipmentId: EquipmentId): void;
	UnequipItem(equipmentSlot: EquipmentSlotId): void;
	//GetEquippedItems(): Array<Item>;

	// Combat
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
