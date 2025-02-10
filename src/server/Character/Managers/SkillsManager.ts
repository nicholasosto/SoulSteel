import Logger from "shared/Utility/Logger";
import { ISkillManager } from "shared/Game Character/CharacterIndex";
import { IPlayerData } from "shared/Data Interfaces/PlayerData";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";
import { GetSkillSlotMap } from "shared/Data Interfaces/PlayerData";
import { CreateSkillFromId } from "shared/Skills/WCSHelper";
import { Character } from "@rbxts/wcs";

const SkillManagers: Map<Character, SkillsManager> = new Map();

export default class SkillsManager implements ISkillManager {
	// Skills
	SkillMap: Map<number, SkillId> = new Map<number, SkillId>();
	UnlockedSkills: SkillId[] = [];

	/* Private Variables */
	public wcsCharacter: Character;

	/* Constructor */
	constructor(wcsCharacter: Character) {
		/* Set WCS Character */
		this.wcsCharacter = wcsCharacter;
		assert(wcsCharacter, "Character is nil");
		Logger.Log(script, `[SkillsManager]: Created for ${wcsCharacter}`);
		SkillManagers.set(wcsCharacter, this);
		Logger.Log(script, `[SkillsManager]: Skill Managers: ${SkillManagers.size()}`);
	}

	/* Initialize Skills */
	InitializeSkills(playerData: IPlayerData): void {
		/* Get Skill Slot Map */
		this.SkillMap = GetSkillSlotMap(playerData) as Map<number, SkillId>;
		Logger.Log(script, `[SkillsManager]: Initializing Skills`, this.SkillMap as unknown as string);
		/* Load Skills */
		this.SkillMap.forEach((skillId, slot) => {
			Logger.Log(script, `[SkillsManager]: Loading Skill ${skillId} into Slot ${slot}`);
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

	/* Register Skill */
	private _registerSkill(skillId: SkillId): void {
		if (this.wcsCharacter.GetSkillFromString(skillId)) {
			Logger.Log(script, `[SkillsManager]: Skill ${skillId} already registered`);
			return;
		}
		CreateSkillFromId(skillId, this.wcsCharacter);
	}
}
