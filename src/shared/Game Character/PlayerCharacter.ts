import GameCharacter from "./GameCharacter";
import { Character, DamageContainer } from "@rbxts/wcs";
import { IPlayerCharacter } from "./Interfaces";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";
import Logger from "shared/Utility/Logger";
import { EquipmentId, EquipmentSlotId } from "shared/_References/Inventory";
import { IPlayerData } from "shared/_References/PlayerData";
import { CharacterStatId } from "shared/Character Resources/iCharacterResource";

export default class PlayerCharacter extends GameCharacter implements IPlayerCharacter {
	public player: Player;
	public level: number = 1;
	public currentExperience: number = 0;

	public skillSlotMap = new Map<number, SkillId>();
	public unlockedSkills: SkillId[] = [];
	public equipmentSlotMap = new Map<EquipmentSlotId, EquipmentId>();
	public statsMap = new Map<CharacterStatId, number>();

	constructor(
		player: Player,
		wcsCharacter: Character,
		skillSlotMap: Map<number, SkillId>,
		equipmentSlotMap: Map<EquipmentSlotId, EquipmentId>,
		statsMap: Map<CharacterStatId, number>,
		level: number = 1,
	) {
		super(wcsCharacter);
		this.player = player;
		this.skillSlotMap = skillSlotMap;
		this.equipmentSlotMap = equipmentSlotMap;
		this.statsMap = statsMap;

		this.displayName = player.Name;

		Logger.Log(script, `Player Character ${this.displayName} Created`);
	}

	public SetTarget(target: GameCharacter): void {
		super.SetTarget(target);

		Logger.Log(script, `[Player]: Setting Target ${target}`);
	}

	public AssignSkillToSlot(slot: number, skillId: SkillId): void {
		Logger.Log(script, `Assigning Skill ${skillId} to Slot ${slot}`);
		this.skillSlotMap.set(slot, skillId);
		// TODO: Update playerUI
	}

	public RemoveSkillFromSlot(slot: number): void {
		Logger.Log(script, `Removing Skill from Slot ${slot}`);
		this.skillSlotMap.delete(slot);
	}

	public GetSkillSlotMap(): Map<number, SkillId> {
		Logger.Log(script, "Getting Skill Slot Map");
		return this.skillSlotMap;
	}

	public GetUnlockedSkills(): SkillId[] {
		Logger.Log(script, "Getting Unlocked Skills");
		return [];
	}

	public EquipItem(equipmentId: string): void {
		Logger.Log(script, `Equipping Item ${equipmentId}`);
	}

	public UnequipItem(equipmentSlot: string): void {
		Logger.Log(script, `Unequipping Item from Slot ${equipmentSlot}`);
	}

	public GetEquippedItems(): string[] {
		Logger.Log(script, "Getting Equipped Items");
		return [];
	}

	public OnDeath(): void {
		Logger.Log(script, "Player Character Died");
	}

	public OnTakeDamage(DamageContainer: DamageContainer): void {
		Logger.Log(script, "Player Character Took Damage");
	}

	public Destroy(): void {
		Logger.Log(script, "Destroying Player Character");
		super.Destroy();
	}
}
