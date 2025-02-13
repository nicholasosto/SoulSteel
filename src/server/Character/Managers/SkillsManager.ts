import Logger from "shared/Utility/Logger";
import { ISkillManager } from "server/Character/Index/CharacterIndex";
import { IPlayerData } from "shared/_Functions/DataFunctions";
import { SkillId } from "shared/_Types/SkillTypes";
import { GetSkillSlotMap } from "shared/_Functions/DataFunctions";
import { CreateSkillFromId } from "shared/_Functions/SkillFunctions";
import { Character, UnknownSkill } from "@rbxts/wcs";

/* Skills Manager */
export default class SkillsManager implements ISkillManager {
	// Skills
	SkillMap: Map<number, SkillId> = new Map<number, SkillId>();
	UnlockedSkills: SkillId[] = [];

	/* Private Variables */
	public wcsCharacter: Character;

	/* Constructor */
	constructor(playerData: IPlayerData, wcsCharacter: Character) {
		/* Set WCS Character */
		this.wcsCharacter = wcsCharacter;
		assert(wcsCharacter, "Character is nil");
	}

	/* Load Skills from List */
	LoadSkillsFromList(skillList: SkillId[]): void {
		skillList.forEach((skillId) => {
			this._registerSkill(skillId);
		});
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
			this.AssignSkillToSlot(slot, skillId);
		});
	}

	/* Remove Skill from Slot */
	RemoveSkillFromSlot(slot: number): void {
		/* Remove Skill from Slot */
		this.SkillMap.delete(slot);
		this.AssignSkillToSlot(slot, "None");
	}

	/* Assign Skill to Slot */
	AssignSkillToSlot(slot: number, skillId: SkillId): void {
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
}
