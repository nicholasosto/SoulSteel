import { Logger } from "shared/Utility/Logger";
import { DataCache, DataManager } from "server/PlayerData/DataManager";
import { Character } from "@rbxts/wcs";
import BaseCharacter from "./BaseCharacter";
import { SkillId } from "shared/Skills/SkillIndex";
import { IPlayerData } from "shared/_References/PlayerData";

export default class PlayerCharacter extends BaseCharacter {
	// Private
	private _dataCache: DataCache;
	private _availableSkills: Map<number, SkillId> = new Map();
	// Constructor
	constructor(player: Player, wcsCharacter: Character) {
		super(wcsCharacter);
		//this._player = player;
		this._dataCache = DataManager.GetDataCache(tostring(player.UserId));

		assert(this._dataCache, "Data Cache is nil");

		this._loadUnlockedSkills();
		this._loadAssignedSkills();
	}

	private _loadAssignedSkills() {
		const assignedSkills = this._dataCache.GetDataCache().Skills.assignedSlots as SkillId[];
		// Loop through the assigned skills and add them to the skill map
		let slot: number = 0;
		assignedSkills.forEach((skillId: SkillId) => {
			this._addSkillToSlot(slot, skillId);
			slot++;
		});
	}

	private _loadUnlockedSkills() {
		const unlockedSkills = this._dataCache.GetDataCache().Skills.unlockedSkills as SkillId[];
		let slot: number = 0;

		unlockedSkills.forEach((skillId: SkillId) => {
			this._availableSkills.set(slot, skillId);
			slot++;
		});
	}

	public GetAvailableSkills(): Map<number, SkillId> {
		return this._availableSkills;
	}

	// Unlock a skill for the player
	public UnlockSkill(skillId: SkillId) {
		this._dataCache._playerData.Skills.unlockedSkills.push(skillId);
		this._dataCache.SetDataCache(this._dataCache._playerData);
		this._loadUnlockedSkills();
	}

	// Assign a skill to a slot
	public AddSkillToSlot(slot: number, skillId: SkillId) {
		// Validate the slot and skill
		if (this._validateSlot(slot, skillId)) {
			Logger.Log(script, "Assigning skill to slot", skillId, slot);
			// Update the player data
			this._dataCache._playerData.Skills.assignedSlots[slot] = skillId;

			// Update the data cache
			this._dataCache.SetDataCache(this._dataCache._playerData);

			// Update the skill map
			this._addSkillToSlot(slot, skillId);
		}
	}

	private _validateSlot(slot: number, skillId: SkillId): boolean {
		assert(slot >= 0 && slot <= 4, `Slot index must be between 0 and 4 (got ${slot}).`);
		assert(this._availableSkills.has(slot), `Player has not unlocked the skill: ${skillId}.`);
		return true;
	}

	// Unassign a skill from a slot
	public Destroy(): void {
		Logger.Log(script, "Destroying PlayerCharacter");
		super.Destroy();
	}
}
