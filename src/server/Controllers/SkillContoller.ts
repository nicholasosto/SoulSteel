// Server side skill controller

import Logger from "shared/Utility/Logger";
import Remotes, { SignalNames } from "shared/Remotes/Remotes";
import PlayerCharacter, { GetPlayerCharacter } from "server/Character/PlayerCharacter";

export default class SkillController {
	private static _instance: SkillController;

	// remotes
	private static _remoteRequestPlayerSkills = Remotes.Server.GetNamespace("Skills").Get(
		SignalNames.RequestPlayerSkills,
	);
	private static _remoteLoadSkills = Remotes.Server.GetNamespace("Skills").Get(SignalNames.LoadPlayerSkills);
	private static _remoteAssignSkillSlot = Remotes.Server.GetNamespace("Skills").Get(SignalNames.AssignSkillSlot);
	private static _remoteUnAssignSkillSlot = Remotes.Server.GetNamespace("Skills").Get(SignalNames.UnAssignSkillSlot);

	// connections
	private static _requestPlayerSkills: RBXScriptConnection | undefined;
	private static _assignSkillSlot: RBXScriptConnection | undefined;
	private static _unAssignSkillSlot: RBXScriptConnection | undefined;

	private constructor() {
		SkillController._initializeConnections();
	}

	public static Start() {
		Logger.Log(script, "Skill Controller Started");
		if (SkillController._instance === undefined) {
			SkillController._instance = new SkillController();
		}
	}

	private static _initializeConnections() {
		Logger.Log(script, "Initializing Connections");
		// Request Player Skills
		this._requestPlayerSkills = this._remoteRequestPlayerSkills.Connect((player) => {
			const _playerCharacter = GetPlayerCharacter(player);

			if (!_playerCharacter) {
				Logger.Log(script, "PlayerCharacter is nil");
				return;
			}

			this._remoteLoadSkills.SendToPlayer(player, _playerCharacter.GetPlayerSkillsData());
		});

		// Assign Skill Slot
		this._assignSkillSlot = this._remoteAssignSkillSlot.Connect((player, slotIndex, skillId) => {
			const _playerCharacter = GetPlayerCharacter(player);

			if (!_playerCharacter) {
				Logger.Log(script, "PlayerCharacter is nil");
				return;
			}

			// Assign the skill to the slot
			_playerCharacter.AssignSkillSlot(skillId, slotIndex);

			// Send the updated skill data to the player
			task.wait(0.4);
			this._remoteLoadSkills.SendToPlayer(player, _playerCharacter.GetPlayerSkillsData());
		});

		// UnAssign Skill Slot
		this._unAssignSkillSlot = this._remoteUnAssignSkillSlot.Connect((player, slotIndex) => {
			const _playerCharacter = GetPlayerCharacter(player);

			if (!_playerCharacter) {
				Logger.Log(script, "PlayerCharacter is nil");
				return;
			}

			// Unassign the skill from the slot
			_playerCharacter.UnAssignSkillSlot(slotIndex);

			// Send the updated skill data to the player
			task.wait(0.4);
			this._remoteLoadSkills.SendToPlayer(player, _playerCharacter.GetPlayerSkillsData());
		});
	}
}
