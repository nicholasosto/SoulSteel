import Logger from "shared/Utility/Logger";

/* WCS Imports */
import { Character, UnknownSkill } from "@rbxts/wcs";

/* Interfaces */
import ISkillManager from "shared/_Interfaces/Character Managers/ISkillManager";
import IPlayerData from "shared/_Interfaces/Player Data/IPlayerData";
import IPlayerCharacter from "shared/_Interfaces/IPlayerCharacter";
import { SkillId } from "shared/_IDs/IDs_Skill";

/* Functions */
import { GetSkillSlotMap } from "shared/_Functions/DataFunctions";
import { CreateSkillFromId } from "shared/_Functions/SkillFunctions";

/* Skills Manager */
export default class SkillsManager implements ISkillManager {
	// Skills
	SkillMap: Map<number, SkillId> = new Map<number, SkillId>();
	UnlockedSkills: SkillId[] = [];

	/* Private Variables */
	public wcsCharacter: Character;
	private playerCharacter: IPlayerCharacter;

	/* Constructor */
	constructor(playerCharacter: IPlayerCharacter) {
		/* Set WCS Character */
		this.playerCharacter = playerCharacter;
		this.wcsCharacter = playerCharacter.wcsCharacter;
		this.UnlockedSkills = playerCharacter.dataManager.GetData().Skills.unlockedSkills;
		assert(this.wcsCharacter, "Character is nil");
	}

	/* Register Skill */
	private _registerSkill(skillId: SkillId): void {
		if (this.wcsCharacter.GetSkillFromString(skillId)) {
			Logger.Log(script, `[SkillsManager]: Skill ${skillId} already registered`);
			return;
		}
		CreateSkillFromId(skillId, this.wcsCharacter);
	}

	/* Initialize Skills */
	InitializeSkillMap(playerData: IPlayerData): void {
		/* Get Skill Slot Map */
		this.SkillMap = GetSkillSlotMap(playerData) as Map<number, SkillId>;

		/* Load Skills */
		this.SkillMap.forEach((skillId, slot) => {
			this.OnEquipSkillSlot(slot, skillId);
		});
	}

	/* Remove Skill from Slot */
	OnUnequipSkillSlot(slot: number): void {
		/* Remove Skill from Slot */
		this.SkillMap.delete(slot);
	}

	/* Assign Skill to Slot */
	OnEquipSkillSlot(slot: number, skillId: SkillId): void {
		/* Register Skill if needed */
		if (this.wcsCharacter.GetSkillFromString(skillId) === undefined) this._registerSkill(skillId);

		/* Assign Skill to Slot */
		this.SkillMap.set(slot, skillId);
		const player = this.wcsCharacter.Player;
	}

	public OnSkillStarted(skill: UnknownSkill): void {
		Logger.Log(script, `[SkillsManager]: Skill Started: ${skill}`);
	}

	public OnSkillEnded(skill: UnknownSkill): void {
		Logger.Log(script, `[SkillsManager]: Skill Ended: ${skill}`);
	}

	public OnDamageTaken(): void {
		Logger.Log(script, `[SkillsManager]: Damage Taken`);
	}

	/* Destroy */
	public Destroy() {
		Logger.Log("[Destroying]", "Skills Manager");
	}
}
