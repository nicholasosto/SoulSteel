// server/net/remotes.server.ts
import Logger from "shared/Utility/Logger";
import { SkillEvent } from "server/net/_Server_Events";
import PCController from "server/Controllers/PlayerCharacterController";

import PlayerCharacter from "server/Character/PlayerCharacter";
import { Remotes } from "shared/net/Remotes";

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
		this._skillSlotAssignmentConnection = Remotes.Server.Get("AssignSkill").Connect((player, slot, skillId) => {
			Logger.Log("Event - SkillSlotAssignment", `Player: ${player.Name}, Slot: ${slot}, SkillId: ${skillId}`);

			/* Get the player character */
			const playerCharacter = PCController.GetPlayerCharacter(player) as PlayerCharacter;

			/* Assert Skill Manager and slot number*/
			assert(playerCharacter.skillManager);
			assert(slot >= 1 && slot <= 5, "Invalid slot");

			/* Assign the skill to the slot */
			playerCharacter.skillManager.OnEquipSkillSlot(slot, skillId);

			/* Update the skill bar */
			Remotes.Server.Get("SkillBarUpdate").SendToPlayer(player, playerCharacter.skillManager.SkillMap);
		});
	}
}
