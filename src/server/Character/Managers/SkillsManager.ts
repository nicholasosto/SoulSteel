import Logger from "shared/Utility/Logger";
import { ISkillManager } from "shared/Game Character/CharacterIndex";
import { IPlayerData } from "shared/Data Interfaces/PlayerData";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";
import { GetSkillSlotMap } from "shared/Data Interfaces/PlayerData";
import { CreateSkillFromId } from "shared/Skills/WCSHelper";
import { Character } from "@rbxts/wcs";


export default class SkillsManager implements ISkillManager {
	// Skills
	SkillMap: Map<number, SkillId> = new Map<number, SkillId>();
	UnlockedSkills: SkillId[] = [];

	/* Private Variables */
	private wcsCharacter: Character;

	/* Constructor */
	constructor(wcsCharacter: Character) {
		/* Set WCS Character */
		this.wcsCharacter = wcsCharacter;
		assert(wcsCharacter, "Character is nil");
	}

	/* Initialize Skills */
	InitializeSkills(playerData: IPlayerData): void {
		/* Get Skill Slot Map */
		this.SkillMap = GetSkillSlotMap(playerData) as Map<number, SkillId>;

		/* Load Skills */
		this.SkillMap.forEach((skillId, slot) => {
			this.AssignSkillToSlot(slot, skillId);
		});
		Logger.Log(script, `[SkillsManager]: Initializing Skills`);
	}

	/* Remove Skill from Slot */
	RemoveSkillFromSlot(slot: number): void {
		/* Remove Skill from Slot */
		this.SkillMap.delete(slot);
		this.AssignSkillToSlot(slot, "None");

		/* Send Skill Map to Player */
		// const player = this.wcsCharacter.Player;
		// if (player) {
		// 	Responses.SkillMapResponse.SendToPlayer(player, this.SkillMap);
		// }
	}

	/* Assign Skill to Slot */
	AssignSkillToSlot(slot: number, skillId: SkillId): void {
		/* Register Skill if needed */
		if (this.wcsCharacter.GetSkillFromString(skillId) === undefined) this._registerSkill(skillId);

		/* Assign Skill to Slot */
		this.SkillMap.set(slot, skillId);
		const player = this.wcsCharacter.Player;

		// /* Send Skill Map to Player */
		// if (player) {
		// 	Responses.SkillMapResponse.SendToPlayer(player, this.SkillMap);
		// }
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
