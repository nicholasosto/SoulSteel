/* Client Remotes */
/*
 * Purpose: To create a namespace for each remote and then export them to be used in other files.
 *
 */

/* Imports */
import Remotes, { SignalNames } from "shared/Remotes/Remotes";

/* Namespaces */
const nsPlayerCharacter = Remotes.Client.GetNamespace("PlayerCharacter");
const nsSkills = Remotes.Client.GetNamespace("Skills");

/* Skill Responses */
const Responses = {
	/* Skills */
	SkillMapResponse: nsSkills.Get(SignalNames.SkillMapResponse),
	SkillSlotAssignmentResponse: nsSkills.Get(SignalNames.SkillSlotAssignmentResponse),

	/* Player Info */
	PlayerInfoResponse: nsPlayerCharacter.Get(SignalNames.PlayerInfoResponse),
	PlayerLevelUpResponse: nsPlayerCharacter.Get(SignalNames.PlayerLevelUpResponse),
	PlayerResourceResponse: nsPlayerCharacter.Get(SignalNames.PlayerResourceResponse),
};

/* Skill Requests */
const Requests = {
	/* Player Character */
	TargetSelectionRequest: nsPlayerCharacter.Get(SignalNames.PlayerCharacterTargetSelected),

	/* Skills */
	SkillMapRequest: nsSkills.Get(SignalNames.SkillMapRequest),
	UnlockSkillRequest: nsSkills.Get(SignalNames.UnlockSkillRequest),
	SkillSlotAssignmentRequest: nsSkills.Get(SignalNames.SkillSlotAssignmentRequest),
	UnAssignSkillSlotRequest: nsSkills.Get(SignalNames.UnAssignSkillSlotRequest),
};

export { Responses, Requests };
