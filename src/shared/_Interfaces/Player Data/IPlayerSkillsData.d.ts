import { SkillId } from "shared/_IDs/SkillIndex";

/* Player Skills Data */
export default interface IPlayerSkillsData {
	/**
	 * All the skill IDs that this player has unlocked.
	 * Could be an array or a Set-like structure.
	 */
	unlockedSkills: SkillId[];

	/**
	 * Which skill is assigned to each of the 5 slots in the action bar.
	 * If a slot isn’t assigned, store `undefined`.
	 */
	assignedSlots: Array<SkillId | undefined>;
}
