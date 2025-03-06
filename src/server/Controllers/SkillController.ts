// server/net/remotes.server.ts
import Logger from "shared/Utility/Logger";
import PCController from "server/Controllers/PlayerCharacterController";
import PlayerCharacter from "server/Character/PlayerCharacter";
import { Remotes, SendNotification, Payloads } from "shared/net/Remotes";
import { SkillId } from "shared/_IDs/IDs_Skill";

export default class SkillController {
	// Singleton
	private static _instance: SkillController;
	/* Connections */
	private static _skillSlotAssignmentConnection: RBXScriptConnection | undefined;
	// Constructor
	private constructor() {
		Logger.Log(script, "CONSTRUCTOR()");
	}

	public static Start() {
		if (this._instance === undefined) {
			this._instance = new SkillController();
			SkillController._initializeListeners();
		}
	}

	private static _initializeListeners() {
		/* Assign Skill Slot */
		this._skillSlotAssignmentConnection?.Disconnect();
		this._skillSlotAssignmentConnection = Remotes.Server.Get("AssignSkill").Connect((player, payload) => {
			/* Get the player character */
			const playerCharacter = PCController.GetPlayerCharacter(player) as PlayerCharacter;
			const skillId = payload[1] as SkillId;
			const slot = payload[0] as number;

			/* Assign or Unassign Skill */
			if (skillId === undefined) {
				playerCharacter.skillManager.OnUnequipSkillSlot(slot);
			} else {
				/* Validate the skill assignment */
				if (!this._validateSkillAssignment(playerCharacter, slot, skillId)) return;
				/* Assign the skill to the slot */
				playerCharacter.skillManager.OnEquipSkillSlot(slot, skillId);
			}

			/* Update the skill bar */
			Remotes.Server.Get("SkillBarUpdate").SendToPlayer(player, [playerCharacter.skillManager.SkillMap]);
		});
	}

	private static _validateSkillAssignment(playerCharacter: PlayerCharacter, slot: number, skillId: SkillId): boolean {
		// Ensure slot is valid
		assert(slot >= 1 && slot <= 5, "Invalid slot");
		// Ensure skillManager exists
		assert(playerCharacter.skillManager, "Missing skill manager");
		// Check if the skill is unlocked
		assert(playerCharacter.skillManager.UnlockedSkills.includes(skillId), "Skill not unlocked");

		/* Check if the skill is unlocked */
		if (!playerCharacter.skillManager.UnlockedSkills.includes(skillId)) {
			SendNotification(playerCharacter.player, false, "Skill Assignment", "Skill not unlocked");
			return false;
		}

		return true;
	}
}
