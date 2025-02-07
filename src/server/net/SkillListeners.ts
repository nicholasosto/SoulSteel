// server/net/remotes.server.ts
import Logger from "shared/Utility/Logger";
import { Requests, Responses } from "shared/Remotes/ServerRemotes";
import GameCharacterController from "server/Controllers/GameCharacterController";
import { IGameCharacter, IPlayerCharacter } from "shared/Game Character/ICharacter";
import PlayerCharacter from "server/Character/PlayerCharacter";

GameCharacterController.Start();
export default function StartSkillListeners() {
	/* Skill Bar Created */
	Requests.SkillMapRequest.Connect((player) => {
		// Get the player character
		const playerCharacter = GameCharacterController.GetGameCharacter<PlayerCharacter>(tostring(player.UserId));
		const skillManager = playerCharacter?.skillManager;
		assert(skillManager?.SkillMap, "Skill Slot Map is nil");

		// Send the skill slot map to the player
		Responses.SkillMapResponse.SendToPlayer(player, skillManager.SkillMap);
	});

	/* Assign Skill Slot */
	Requests.SkillSlotAssignmentRequest.Connect((player, slot, skillId) => {
		// Get the skill manager
		const playerCharacter = GameCharacterController.GetGameCharacter(tostring(player.UserId)) as PlayerCharacter;
		const skillManager = playerCharacter?.skillManager;

		// Validate the parameters
		assert(skillManager, "Player Character is nil");
		assert(slot >= 1 && slot <= 6, "Invalid slot");
		assert(skillId, "Invalid skillId");

		// Assign the skill to the slot
		skillManager.AssignSkillToSlot(slot, skillId);
	});

	/* Unassign Skill Slot */
	Requests.UnAssignSkillSlotRequest.Connect((player, slot) => {
		// Get the player character
		const playerCharacter = GameCharacterController.GetGameCharacter(tostring(player.UserId)) as PlayerCharacter;
		const skillManager = playerCharacter?.skillManager;

		// Validate the parameters
		assert(playerCharacter, "Player Character is nil");
		assert(slot >= 1 && slot <= 6, "Invalid slot");

		// Remove the skill from the slot
		skillManager.RemoveSkillFromSlot(slot);
	});
}

/* Send Character Frame Update */
// export function SendCharacterFrameUpdate(player: Player): void {
// 	// Get the player character
// 	const playerCharacter = GameCharacterController.GetGameCharacter<IGameCharacter>(
// 		tostring(player.UserId),
// 	) as IPlayerCharacter;
// 	// Update the character frame
// 	Responses.PlayerInfoResponse.SendToPlayer(
// 		player,
// 		playerCharacter.displayName,
// 		playerCharacter.level,
// 		"ProfilePicId",
// 	);
// 	// Update the health resource
// 	Responses.PlayerResourceResponse.SendToPlayer(
// 		player,
// 		"Health",
// 		playerCharacter.HealthResource.Current,
// 		playerCharacter.HealthResource.MaxValue,
// 	);
// }

// export function SendSkillBarMap(player: Player): void {
// 	// Get the player character
// 	const playerCharacter = GameCharacterController.GetGameCharacter<IGameCharacter>(
// 		tostring(player.UserId),
// 	) as IPlayerCharacter;
// 	// Update the skill bar
// 	Responses.SkillMapResponse.SendToPlayer(player, playerCharacter.skillManager.SkillMap);
// }
