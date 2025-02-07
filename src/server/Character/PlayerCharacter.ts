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
	public level: number;
	public currentExperience: number = 0;

	public skillSlotMap = new Map<number, SkillId>();
	public unlockedSkills: SkillId[] = [];
	public equipmentSlotMap = new Map<EquipmentSlotId, EquipmentId>();
	public statsMap = new Map<CharacterStatId, number>();

	public HealthResource: CharacterResource = new CharacterResource("Health");
	public ExpericenceResource: CharacterResource = new CharacterResource("Experience");

	constructor(player: Player, wcsCharacter: Character, playerData: IPlayerData) {
		super(wcsCharacter);
		this.player = player;
		this.level = playerData.ProgressionStats.Level;
		this.currentExperience = playerData.ProgressionStats.Experience;
		this.ExpericenceResource.SetCurrent(this.currentExperience);
		this.ExpericenceResource.SetMax(playerData.ProgressionStats.ExperienceToNextLevel);
		this.HealthResource.SetCurrent(playerData.CharacterStats.Constitution * 10);
		this.HealthResource.SetMax(playerData.CharacterStats.Constitution * 10);
		this.skillSlotMap = GetSkillSlotMap(playerData) as Map<number, SkillId>;
		this.equipmentSlotMap = new Map<EquipmentSlotId, EquipmentId>();
		this.statsMap = new Map<CharacterStatId, number>();

		this.displayName = player.Name;

		// Load Skills
		this.skillSlotMap.forEach((skillId, slot) => {
			this.RegisterSkill(skillId);
		});

		Logger.Log(script, `Player Character ${this.displayName} Created`);

		this._updateSkillBar();
		this._updateCharacterFrame();
	}

	public SetTarget(target: GameCharacter): void {
		super.SetTarget(target);

		Logger.Log(script, `[Player]: Setting Target ${target}`);
	}

	public AssignSkillToSlot(slot: number, skillId: SkillId): void {
		Logger.Log(script, `[ AssignSkillToSlot() ]: Assigning Skill ${skillId} to Slot ${slot}`);

		/* Register Skill if needed */
		if (this.wcsCharacter.GetSkillFromString(skillId) === undefined) this.RegisterSkill(skillId);

		/* Assign Skill to Slot */
		this.skillSlotMap.set(slot, skillId);

		/* Update Skill Bar */
		this._updateSkillBar();
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

	private _updateSkillBar(): void {
		Responses.SkillMapResponse.SendToPlayer(this.player, this.GetSkillSlotMap());
	}

	private _updateCharacterFrame(): void {
		Responses.PlayerInfoResponse.SendToPlayer(this.player, this.displayName, this.level, "ProfilePicId");
		Responses.PlayerResourceResponse.SendToPlayer(
			this.player,
			"Health",
			this.HealthResource.Current,
			this.HealthResource.MaxValue,
		);
		Responses.PlayerResourceResponse.SendToPlayer(
			this.player,
			"Experience",
			this.ExpericenceResource.Current,
			this.ExpericenceResource.MaxValue,
		);
	}

	public Destroy(): void {
		Logger.Log(script, "Destroying Player Character");
		super.Destroy();
	}
}
