import Logger from "shared/Utility/Logger";

// External Modules
import { Character, DamageContainer } from "@rbxts/wcs";

// Interfaces and Types
import { EquipmentId, EquipmentSlotId } from "shared/_References/Inventory";
import { CharacterStatId } from "shared/Character Resources/iCharacterResource";
import { IPlayerCharacter } from "shared/Game Character/Interfaces";
import { IPlayerData, GetSkillSlotMap } from "shared/_References/PlayerData";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";

// Classes
import GameCharacter from "./GameCharacter";
import { CharacterResource } from "shared/Character Resources/CharacterResource";

//NET
import { Responses } from "shared/Remotes/ServerRemotes";

export default class PlayerCharacter extends GameCharacter implements IPlayerCharacter {
	public player: Player;
	public level: number = 1;
	public currentExperience: number = 0;

	public skillSlotMap = new Map<number, SkillId>();
	public unlockedSkills: SkillId[] = [];
	public equipmentSlotMap = new Map<EquipmentSlotId, EquipmentId>();
	public statsMap = new Map<CharacterStatId, number>();

	public HealthResource: CharacterResource = new CharacterResource("Health");

	constructor(player: Player, wcsCharacter: Character, playerData: IPlayerData) {
		super(wcsCharacter);
		this.player = player;
		this.skillSlotMap = GetSkillSlotMap(playerData) as Map<number, SkillId>;
		this.equipmentSlotMap = new Map<EquipmentSlotId, EquipmentId>();
		this.statsMap = new Map<CharacterStatId, number>();

		this.displayName = player.Name;

		// Load Skills
		this.skillSlotMap.forEach((skillId, slot) => {
			this.RegisterSkill(skillId);
		});

		Logger.Log(script, `Player Character ${this.displayName} Created`);

		Responses.PlayerInfoResponse.SendToPlayer(this.player, this.displayName, this.level, "ProfilePicId");
	}

	public SetTarget(target: GameCharacter): void {
		super.SetTarget(target);

		Logger.Log(script, `[Player]: Setting Target ${target}`);
	}

	public AssignSkillToSlot(slot: number, skillId: SkillId): void {
		Logger.Log(script, `[NEW STYLE]: Assigning Skill ${skillId} to Slot ${slot}`);
		this.RegisterSkill(skillId);
		this.skillSlotMap.set(slot, skillId);
		Responses.SkillSlotAssignmentResponse.SendToPlayer(this.player, slot, skillId);
	}

	public RemoveSkillFromSlot(slot: number): void {
		Logger.Log(script, `Removing Skill from Slot ${slot}`);
		this.skillSlotMap.delete(slot);
		this.AssignSkillToSlot(slot, "None");
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
		this.HealthResource.SetCurrent(this.HealthResource.Current - DamageContainer.Damage);
		Responses.PlayerResourceResponse.SendToPlayer(
			this.player,
			"Health",
			this.HealthResource.Current,
			this.HealthResource.MaxValue,
		);
	}

	public Destroy(): void {
		Logger.Log(script, "Destroying Player Character");
		super.Destroy();
	}
}
