/* ServerRemotes.ts
 * ServerRemotes.ts is a file that contains all the server remotes that are used to communicate between the server and the client.
 *
 * The remotes are separated into namespaces and then into individual remotes.
 *
 * The remotes are then exported to be used in other files.
 */

import Signals, { GameCycleRemotes, SignalNames } from "shared/Remotes/Remotes";

/* Namespaces */

const nsPlayerCharacter = Signals.Server.GetNamespace("PlayerCharacter");
const nsSkills = Signals.Server.GetNamespace("Skills");

const BiDirectional = {
	ModuleToModule: Signals.Server.Get("ModuleToModule"),
};

/* Skill Remotes */
const Requests = {
	/* Developer */
	DeveloperRequest: Signals.Server.Get(SignalNames.DeveloperRequest),
	/* Teleport */
	TeleportRequest: Signals.Server.Get(SignalNames.TeleportRequest),
	/* Skill Map */
	SkillMapRequest: nsSkills.Get(SignalNames.SkillMapRequest),
	/* Unlock Skill */
	UnlockSkillRequest: nsSkills.Get(SignalNames.UnlockSkillRequest),
	/* Skill Slot Assignment */
	SkillSlotAssignmentRequest: nsSkills.Get(SignalNames.SkillSlotAssignmentRequest),
	UnAssignSkillSlotRequest: nsSkills.Get(SignalNames.UnAssignSkillSlotRequest),
};

/* Skill Responses */
const Responses = {
	/* Game Cycle */
	SkillControllerStarted: GameCycleRemotes.Server.Get(SignalNames.SkillControllerStarted),
	CharacterControllerStarted: GameCycleRemotes.Server.Get(SignalNames.CharacterControllerStarted),
	DataManagerStarted: GameCycleRemotes.Server.Get(SignalNames.DataManagerStarted),

	/* Developer */
	DeveloperResponse: Signals.Server.Get(SignalNames.DeveloperResponse),
	/* Teleport */
	TeleportResponse: Signals.Server.Get(SignalNames.TeleportResponse),
	/* Player Info */
	PlayerInfoResponse: nsPlayerCharacter.Get(SignalNames.PlayerInfoResponse),
	/* Player Resource */
	PlayerResourceResponse: nsPlayerCharacter.Get(SignalNames.PlayerResourceResponse),
	/* Skill Map */
	SkillMapResponse: nsSkills.Get(SignalNames.SkillMapResponse),
	/* Skill Slot Assignment */
	SkillSlotAssignmentResponse: nsSkills.Get(SignalNames.SkillSlotAssignmentResponse),
};

export { Requests, Responses };
