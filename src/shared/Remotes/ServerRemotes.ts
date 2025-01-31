/* ServerRemotes.ts
 * ServerRemotes.ts is a file that contains all the server remotes that are used to communicate between the server and the client.
 *
 * The remotes are separated into namespaces and then into individual remotes.
 *
 * The remotes are then exported to be used in other files.
 */

import Remotes, { RemoteNames } from "shared/Remotes/Remotes";

// Player: Remotes
const nsPlayerRemotes = Remotes.Server.GetNamespace("Player");
const PlayerRemotes = {
	PlayerLevelUp: nsPlayerRemotes.Get(RemoteNames.PlayerLevelUp),
	PlayerResourceUpdate: nsPlayerRemotes.Get(RemoteNames.PlayerResourceUpdate),
	PlayerInfoUpdate: nsPlayerRemotes.Get(RemoteNames.PlayerInfoUpdate),
	//PlayerStatUpdate: nsPlayerRemotes.Get(RemoteNames.PlayerStatUpdate),
};

// Player Character: Remotes
const nsPlayerCharacter = Remotes.Server.GetNamespace("PlayerCharacter");
const PlayerCharacterRemotes = {
	PlayerCharacterCreated: nsPlayerCharacter.Get(RemoteNames.PlayerCharacterCreated),
	PlayerCharacterDestroyed: nsPlayerCharacter.Get(RemoteNames.PlayerCharacterDestroyed),
};

// Skills Remotes
const nsSkills = Remotes.Server.GetNamespace("Skills");
const SkillSignals = {
	LoadPlayerSkills: nsSkills.Get(RemoteNames.LoadPlayerSkills),
	RequestPlayerSkills: nsSkills.Get(RemoteNames.RequestPlayerSkills),
	UnlockSkill: nsSkills.Get(RemoteNames.UnlockSkill),
	AssignSkillSlot: nsSkills.Get(RemoteNames.AssignSkillSlot),
	UnAssignSkillSlot: nsSkills.Get(RemoteNames.UnAssignSkillSlot),
	AssignSkillResponse: nsSkills.Get(RemoteNames.AssignSkillResponse),
};
const SkillRemotes = {
	GetUnlockedSkills: nsSkills.Get(RemoteNames.crfGetUnlockedSkills),
};

// Equipment: Remotes
const nsEquipment = Remotes.Server.GetNamespace("Equipment");
const EquipmentRemotes = {
	EquipItemRequest: nsEquipment.Get(RemoteNames.EquipItemRequest),
};

// Inventory: Remotes
const nsInventory = Remotes.Server.GetNamespace("Inventory");
const InventoryRemotes = {
	GetInventory: nsInventory.Get(RemoteNames.GetInventory),
	RequestInventory: nsInventory.Get(RemoteNames.RequestInventory),
};

export { PlayerRemotes, PlayerCharacterRemotes, EquipmentRemotes, InventoryRemotes, SkillSignals, SkillRemotes };
