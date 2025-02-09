// server/net/remotes.server.ts
import Logger from "shared/Utility/Logger";
import * as ServerRemotes from "server/net/ServerRemotes";
//import { Requests, Responses } from "shared/Remotes/ServerRemotes";
import CharacterController from "server/Controllers/CharacterController";

import PlayerCharacter from "server/Character/PlayerCharacter";

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
		Logger.Log("NEW!!!!!!!!!!!!!!!", "Skill Controller Started");
		/* Skill Bar Created */
		this._skillBarCreated?.Disconnect();
		this._skillBarCreated = ServerRemotes.SkillBarCreated.Connect((player, skillBar) => {
			Logger.Log("REMOTE", "Skill Bar Created", player, skillBar as unknown as string);
			// Get the player character
			const playerCharacter = CharacterController.GetGameCharacter<PlayerCharacter>(tostring(player.UserId));
			const skillManager = playerCharacter?.skillManager;
			assert(skillManager?.SkillMap, "Skill Slot Map is nil");

			// Send the skill slot map to the player
			ServerRemotes.SkillBarCreated.SendToPlayer(player, skillBar);
		});

		/* Assign Skill Slot */
		this._skillSlotAssignmentConnection?.Disconnect();
		this._skillSlotAssignmentConnection = ServerRemotes.SkillSlotAssignment.Connect((player, slot, skillId) => {
			// Get the skill manager
			wait(1);
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
	// 	this._unAssignSkillSlotConnection?.Disconnect();
	// 	this._unAssignSkillSlotConnection = Requests.UnAssignSkillSlotRequest.Connect((player, slot) => {
	// 		// Get the player character
	// 		const playerCharacter = CharacterController.GetGameCharacter(tostring(player.UserId)) as PlayerCharacter;
	// 		const skillManager = playerCharacter?.skillManager;

	// 		// Validate the parameters
	// 		assert(playerCharacter, "Player Character is nil");
	// 		assert(slot >= 1 && slot <= 6, "Invalid slot");

	// 		// Remove the skill from the slot
	// 		skillManager.RemoveSkillFromSlot(slot);
	// 	});

	// 	/*Skill Bar Created */
	// 	this._skillBarCreated?.Disconnect();
	// 	this._skillBarCreated = ServerEvents.SkillBarCreated.Connect((player, skillBar) => {
	// 		Logger.Log("REMOTE", "Skill Controller Started", player, skillBar as unknown as string);
	// 		ServerEvents.SkillBarCreated.SendToPlayer(player, skillBar);
	// 	});
	}
}

// private static StartSkillListeners() {
// 	/* Skill Bar Created */
// 	Requests.SkillMapRequest.Connect((player) => {
// 		// Get the player character
// 		const playerCharacter = CharacterController.GetGameCharacter<PlayerCharacter>(tostring(player.UserId));
// 		const skillManager = playerCharacter?.skillManager;
// 		assert(skillManager?.SkillMap, "Skill Slot Map is nil");

// 		// Send the skill slot map to the player
// 		Responses.SkillMapResponse.SendToPlayer(player, skillManager.SkillMap);
// 	});

// 	/* Assign Skill Slot */
// 	Requests.SkillSlotAssignmentRequest.Connect((player, slot, skillId) => {
// 		// Get the skill manager
// 		const playerCharacter = CharacterController.GetGameCharacter(tostring(player.UserId)) as PlayerCharacter;
// 		const skillManager = playerCharacter?.skillManager;

// 		// Validate the parameters
// 		assert(skillManager, "Player Character is nil");
// 		assert(slot >= 1 && slot <= 6, "Invalid slot");
// 		assert(skillId, "Invalid skillId");

// 		// Assign the skill to the slot
// 		skillManager.AssignSkillToSlot(slot, skillId);
// 	});

// 	/* Unassign Skill Slot */
// 	Requests.UnAssignSkillSlotRequest.Connect((player, slot) => {
// 		// Get the player character
// 		const playerCharacter = CharacterController.GetGameCharacter(tostring(player.UserId)) as PlayerCharacter;
// 		const skillManager = playerCharacter?.skillManager;

// 		// Validate the parameters
// 		assert(playerCharacter, "Player Character is nil");
// 		assert(slot >= 1 && slot <= 6, "Invalid slot");

// 		// Remove the skill from the slot
// 		skillManager.RemoveSkillFromSlot(slot);
// 	});
// }

// 	}
// /* Send Character Frame Update */
// // export function SendCharacterFrameUpdate(player: Player): void {
// // 	// Get the player character
// // 	const playerCharacter = GameCharacterController.GetGameCharacter<IGameCharacter>(
// // 		tostring(player.UserId),
// // 	) as IPlayerCharacter;
// // 	// Update the character frame
// // 	Responses.PlayerInfoResponse.SendToPlayer(
// // 		player,
// // 		playerCharacter.displayName,
// // 		playerCharacter.level,
// // 		"ProfilePicId",
// // 	);
// // 	// Update the health resource
// // 	Responses.PlayerResourceResponse.SendToPlayer(
// // 		player,
// // 		"Health",
// // 		playerCharacter.HealthResource.Current,
// // 		playerCharacter.HealthResource.MaxValue,
// // 	);
// // }

// // export function SendSkillBarMap(player: Player): void {
// // 	// Get the player character
// // 	const playerCharacter = GameCharacterController.GetGameCharacter<IGameCharacter>(
// // 		tostring(player.UserId),
// // 	) as IPlayerCharacter;
// // 	// Update the skill bar
// // 	Responses.SkillMapResponse.SendToPlayer(player, playerCharacter.skillManager.SkillMap);
// // }
