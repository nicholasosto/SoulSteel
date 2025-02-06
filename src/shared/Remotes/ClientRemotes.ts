/* Client Remotes */
/*
 * Purpose: To create a namespace for each remote and then export them to be used in other files.
 *
 */

/* Imports */
import Remotes, { SignalNames, RemoteNames } from "shared/Remotes/Remotes";

/* Namespaces */
const nsPlayer = Remotes.Client.GetNamespace("Player");
const nsPlayerCharacter = Remotes.Client.GetNamespace("PlayerCharacter");
const nsSkills = Remotes.Client.GetNamespace("Skills");

/* Player Remotes */
const PlayerRemotes = {
	LevelUp: nsPlayer.Get(SignalNames.PlayerLevelUp),
	ResourceUpdate: nsPlayer.Get(SignalNames.PlayerResourceUpdate),
	InfoUpdate: nsPlayer.Get(SignalNames.PlayerInfoUpdate),
};

/* Player Character Remotes */
const PlayerCharacterRemotes = {
	CharacterCreated: nsPlayerCharacter.Get(SignalNames.PlayerCharacterCreated),
	CharacterDestroyed: nsPlayerCharacter.Get(SignalNames.PlayerCharacterDestroyed),
	TargetSelected: nsPlayerCharacter.Get(SignalNames.PlayerCharacterTargetSelected),
};

/* Skill Remotes */
const SkillRemotes = {
	SkillBarCreated: nsSkills.Get(SignalNames.SkillBarCreated),
	SendSkillAssignment: nsSkills.Get(SignalNames.SendSkillAssignment),

	AssignSkillSlot: nsSkills.Get(SignalNames.AssignSkillSlot),
	UnassignSkillSlot: nsSkills.Get(SignalNames.UnAssignSkillSlot),
};


export { PlayerRemotes, PlayerCharacterRemotes, SkillRemotes };
