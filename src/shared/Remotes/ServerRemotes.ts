/* ServerRemotes.ts
 * ServerRemotes.ts is a file that contains all the server remotes that are used to communicate between the server and the client.
 *
 * The remotes are separated into namespaces and then into individual remotes.
 *
 * The remotes are then exported to be used in other files.
 */

import Signals, { SignalNames, RemoteNames } from "shared/Remotes/Remotes";

// Player: Remotes
const nsPlayerRemotes = Signals.Server.GetNamespace("Player");
const PlayerRemotes = {
	PlayerLevelUp: nsPlayerRemotes.Get(SignalNames.PlayerLevelUp),
	PlayerResourceUpdate: nsPlayerRemotes.Get(SignalNames.PlayerResourceUpdate),
	PlayerInfoUpdate: nsPlayerRemotes.Get(SignalNames.PlayerInfoUpdate),
	//PlayerStatUpdate: nsPlayerRemotes.Get(RemoteNames.PlayerStatUpdate),
};

// Player Character: Remotes
const nsPlayerCharacter = Signals.Server.GetNamespace("PlayerCharacter");
const PlayerCharacterRemotes = {
	PlayerCharacterCreated: nsPlayerCharacter.Get(SignalNames.PlayerCharacterCreated),
	PlayerCharacterDestroyed: nsPlayerCharacter.Get(SignalNames.PlayerCharacterDestroyed),
	TargetSelected: nsPlayerCharacter.Get(SignalNames.PlayerCharacterTargetSelected),
};

// Skills Remotes
const nsSkills = Signals.Server.GetNamespace("Skills");
const SkillSignals = {
	// Skill Bar Instance Created Client and Server
	SkillBarCreated: nsSkills.Get(SignalNames.SkillBarCreated),
	SendSkillAssignment: nsSkills.Get(SignalNames.SendSkillAssignment),

	// Unlock Skill
	UnlockSkill: nsSkills.Get(SignalNames.UnlockSkill),

	// Skill Assignment Client to Server
	AssignSkillSlot: nsSkills.Get(SignalNames.AssignSkillSlot),
	UnAssignSkillSlot: nsSkills.Get(SignalNames.UnAssignSkillSlot),

	// Skill Assignment Server to Client
	AssignSkillResponse: nsSkills.Get(SignalNames.AssignSkillResponse),
};

const nsSkillRemotes = Signals.Server.GetNamespace("SkillRemotes");
const SkillRemotes = {
	GetUnlockedSkills: nsSkillRemotes.Get(RemoteNames.GetUnlockedSkills),
};

export { PlayerRemotes, PlayerCharacterRemotes, SkillSignals, SkillRemotes };
