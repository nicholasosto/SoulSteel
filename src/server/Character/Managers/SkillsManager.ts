import Logger from "shared/Utility/Logger";
import { ISkillManager } from "shared/Game Character/CharacterIndex";
import { IPlayerData } from "shared/_References/PlayerData";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";
import { GetSkillSlotMap } from "shared/_References/PlayerData";
import { CreateSkillFromId } from "shared/Skills/WCSHelper";
import { Character } from "@rbxts/wcs";
import { Responses } from "shared/Remotes/ServerRemotes";

export default class SkillsManager implements ISkillManager {
	// Skills
	SkillMap: Map<number, SkillId> = new Map<number, SkillId>();
	UnlockedSkills: SkillId[] = [];

	private wcsCharacter: Character;

	constructor(wcsCharacter: Character) {
		this.wcsCharacter = wcsCharacter;
		assert(wcsCharacter, "Character is nil");
		Logger.Log(script, `[SkillsManager]: Created`);
	}

	InitializeSkills(playerData: IPlayerData): void {
		// Get the Skill Map
		this.SkillMap = GetSkillSlotMap(playerData) as Map<number, SkillId>;

		this.SkillMap.forEach((skillId, slot) => {
			this.AssignSkillToSlot(slot, skillId);
		});
		Logger.Log(script, `[SkillsManager]: Initializing Skills`);
	}

	RemoveSkillFromSlot(slot: number): void {
		Logger.Log(script, `[SkillsManager]: Removing Skill from Slot ${slot}`);
		this.SkillMap.delete(slot);
		this.SkillMap.set(slot, "None");

		const player = this.wcsCharacter.Player;

		// Send Skill Map to Player
		if (player) {
			Responses.SkillMapResponse.SendToPlayer(player, this.SkillMap);
		}
	}

	AssignSkillToSlot(slot: number, skillId: SkillId): void {
		Logger.Log(script, `[ AssignSkillToSlot() ]: Assigning Skill ${skillId} to Slot ${slot}`);

		/* Register Skill if needed */
		if (this.wcsCharacter.GetSkillFromString(skillId) === undefined) this._registerSkill(skillId);

		/* Assign Skill to Slot */
		this.SkillMap.set(slot, skillId);
		const player = this.wcsCharacter.Player;

		/* Send Skill Map to Player */
		if (player) {
			Responses.SkillMapResponse.SendToPlayer(player, this.SkillMap);
		}
	}

	private _registerSkill(skillId: SkillId): void {
		Logger.Log(script, `[SkillsManager]: Registering Skill ${skillId}`);
		// Register Skill to the Character
		if (this.wcsCharacter.GetSkillFromString(skillId)) {
			Logger.Log(script, `[SkillsManager]: Skill ${skillId} already registered`);
			return;
		}
		CreateSkillFromId(skillId, this.wcsCharacter);
	}
}
