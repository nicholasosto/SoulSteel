/* ServerRemotes.ts
 * ServerRemotes.ts is a file that contains all the server remotes that are used to communicate between the server and the client.
 *
 * The remotes are separated into namespaces and then into individual remotes.
 *
 * The remotes are then exported to be used in other files.
 */

import Remotes, { SignalNames } from "shared/Remotes/Remotes";

// Player: Remotes
const nsPlayerRemotes = Remotes.Server.GetNamespace("Player");
const PlayerRemotes = {
	PlayerLevelUp: nsPlayerRemotes.Get(SignalNames.PlayerLevelUp),
	PlayerResourceUpdate: nsPlayerRemotes.Get(SignalNames.PlayerResourceUpdate),
	PlayerInfoUpdate: nsPlayerRemotes.Get(SignalNames.PlayerInfoUpdate),
	//PlayerStatUpdate: nsPlayerRemotes.Get(RemoteNames.PlayerStatUpdate),
};

// Player Character: Remotes
const nsPlayerCharacter = Remotes.Server.GetNamespace("PlayerCharacter");
const PlayerCharacterRemotes = {
	PlayerCharacterCreated: nsPlayerCharacter.Get(SignalNames.PlayerCharacterCreated),
	PlayerCharacterDestroyed: nsPlayerCharacter.Get(SignalNames.PlayerCharacterDestroyed),
};

// Skills Remotes
const nsSkills = Remotes.Server.GetNamespace("Skills");
const SkillSignals = {
	LoadPlayerSkills: nsSkills.Get(SignalNames.LoadPlayerSkills),
	RequestPlayerSkills: nsSkills.Get(SignalNames.RequestPlayerSkills),
	UnlockSkill: nsSkills.Get(SignalNames.UnlockSkill),
	AssignSkillSlot: nsSkills.Get(SignalNames.AssignSkillSlot),
	UnAssignSkillSlot: nsSkills.Get(SignalNames.UnAssignSkillSlot),
	AssignSkillResponse: nsSkills.Get(SignalNames.AssignSkillResponse),
};
const SkillRemotes = {
	GetUnlockedSkills: nsSkills.Get(SignalNames.crfGetUnlockedSkills),
};

// Equipment: Remotes
const nsEquipment = Remotes.Server.GetNamespace("Equipment");
const EquipmentRemotes = {
	EquipItemRequest: nsEquipment.Get(SignalNames.EquipItemRequest),
};

// Inventory: Remotes
const nsInventory = Remotes.Server.GetNamespace("Inventory");
const InventoryRemotes = {
	GetInventory: nsInventory.Get(SignalNames.GetInventory),
	RequestInventory: nsInventory.Get(SignalNames.RequestInventory),
};

export { PlayerRemotes, PlayerCharacterRemotes, EquipmentRemotes, InventoryRemotes, SkillSignals, SkillRemotes };
