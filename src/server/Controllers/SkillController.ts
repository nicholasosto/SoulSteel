// server/net/remotes.server.ts
import Logger from "shared/Utility/Logger";
import { SkillEvent } from "server/net/ServerEvents";
//import { Requests, Responses } from "shared/Remotes/ServerRemotes";
import CharacterController from "server/Controllers/CharacterController";

import PlayerCharacter from "server/Character/PlayerCharacter";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";

export default class SkillController {
	// Singleton
	private static _instance: SkillController;
	/* Connections */
	//private static _skillMapConnection: RBXScriptConnection | undefined;
	private static _skillSlotAssignmentConnection: RBXScriptConnection | undefined;
	private static _unAssignSkillSlotConnection: RBXScriptConnection | undefined;
	private static _skillBarCreated: RBXScriptConnection | undefined;

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
		this._skillSlotAssignmentConnection = SkillEvent.SkillSlotAssignment.Connect((player, slot, skillId) => {
			// Get the skill manager
			const playerCharacter = CharacterController.GetGameCharacter(tostring(player.UserId)) as PlayerCharacter;
			const skillManager = playerCharacter?.skillManager;

			// Validate the parameters
			assert(skillManager, "Player Character is nil");
			assert(slot >= 1 && slot <= 6, "Invalid slot");
			assert(skillId, "Invalid skillId");

			// Assign the skill to the slot
			skillManager.AssignSkillToSlot(slot, skillId);
		});

		/* Unassign Skill Slot */
		this._unAssignSkillSlotConnection?.Disconnect();
		this._unAssignSkillSlotConnection = SkillEvent.UnassignSkillSlot.Connect((player: Player, slot: number) => {
			// Get the player character
			const playerCharacter = CharacterController.GetGameCharacter(tostring(player.UserId)) as PlayerCharacter;
			const skillManager = playerCharacter?.skillManager;

			// Validate the parameters
			assert(playerCharacter, "Player Character is nil");
			assert(slot >= 1 && slot <= 6, "Invalid slot");

			// Remove the skill from the slot
			skillManager.RemoveSkillFromSlot(slot);
		});
	}
}
