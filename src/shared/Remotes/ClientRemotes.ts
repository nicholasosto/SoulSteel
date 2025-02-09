/* Client Remotes */
/*
 * Purpose: To create a namespace for each remote and then export them to be used in other files.
 *
 */

/* Imports */
import { Skill } from "@rbxts/wcs";
import Remotes, { BiDirectionalEvents, GameCycleRemotes, SignalNames } from "shared/Remotes/Remotes";

/* Namespaces */
const nsPlayerCharacter = Remotes.Client.GetNamespace("PlayerCharacter");
const nsSkills = Remotes.Client.GetNamespace("Skills");

/* Skill Responses */
const Responses = {
	ModuleToModule: Remotes.Client.Get("ModuleToModule"),
	/* Game Cycle */
	SkillControllerStarted: GameCycleRemotes.Client.Get(SignalNames.SkillControllerStarted),
	CharacterControllerStarted: GameCycleRemotes.Client.Get(SignalNames.CharacterControllerStarted),
	DataManagerStarted: GameCycleRemotes.Client.Get(SignalNames.DataManagerStarted),
	/* Developer */
	DeveloperResponse: Remotes.Client.Get(SignalNames.DeveloperResponse),
	/* Teleport */
	TeleportResponse: Remotes.Client.Get(SignalNames.TeleportResponse),
	/* Skills */
	SkillMapResponse: nsSkills.Get(SignalNames.SkillMapResponse),
	SkillSlotAssignmentResponse: nsSkills.Get(SignalNames.SkillSlotAssignmentResponse),

	/* Player Info */
	PlayerInfoResponse: nsPlayerCharacter.Get(SignalNames.PlayerInfoResponse),
	PlayerLevelUpResponse: nsPlayerCharacter.Get(SignalNames.PlayerLevelUpResponse),
	PlayerResourceResponse: nsPlayerCharacter.Get(SignalNames.PlayerResourceResponse),
};

const BiDirectional = {
	ModuleToModule: Remotes.Client.Get("ModuleToModule"),
	SkillBarCreated: BiDirectionalEvents.Client.Get("SkillBarCreated"),
};

/* Skill Requests */
const Requests = {
	/* Developer */

	DeveloperRequest: Remotes.Client.Get(SignalNames.DeveloperRequest),
	/* Teleport */
	TeleportRequest: Remotes.Client.Get(SignalNames.TeleportRequest),
	/* Player Character */
	TargetSelectionRequest: nsPlayerCharacter.Get(SignalNames.PlayerCharacterTargetSelected),

	/* Skills */
	SkillMapRequest: nsSkills.Get(SignalNames.SkillMapRequest),
	UnlockSkillRequest: nsSkills.Get(SignalNames.UnlockSkillRequest),
	SkillSlotAssignmentRequest: nsSkills.Get(SignalNames.SkillSlotAssignmentRequest),
	UnAssignSkillSlotRequest: nsSkills.Get(SignalNames.UnAssignSkillSlotRequest),
};

export { Responses, Requests, BiDirectional };
