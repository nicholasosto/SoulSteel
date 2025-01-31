/* Client Remotes */
/*
 * Purpose: To create a namespace for each remote and then export them to be used in other files.
 *
 */

/* Imports */
import Remotes, { RemoteNames } from "shared/Remotes/Remotes";

/* Namespaces */
const nsPlayer = Remotes.Client.GetNamespace("Player");
const nsPlayerCharacter = Remotes.Client.GetNamespace("PlayerCharacter");
const nsInventory = Remotes.Client.GetNamespace("Inventory");
const nsSkills = Remotes.Client.GetNamespace("Skills");
const nsUI = Remotes.Client.GetNamespace("UserInterface");
const nsEquipment = Remotes.Client.GetNamespace("Equipment");

/* Player Remotes */
const PlayerRemotes = {
	LevelUp: nsPlayer.Get(RemoteNames.PlayerLevelUp),
	ResourceUpdate: nsPlayer.Get(RemoteNames.PlayerResourceUpdate),
	InfoUpdate: nsPlayer.Get(RemoteNames.PlayerInfoUpdate),
};

/* Player Character Remotes */
const PlayerCharacterRemotes = {
	CharacterCreated: nsPlayerCharacter.Get(RemoteNames.PlayerCharacterCreated),
	CharacterDestroyed: nsPlayerCharacter.Get(RemoteNames.PlayerCharacterDestroyed),
};

/* Inventory Remotes */
const InventoryRemotes = {
	GetInventory: nsInventory.Get(RemoteNames.GetInventory),
	RequestInventory: nsInventory.Get(RemoteNames.RequestInventory),
};

/* Skills Signals and Remotes */
const SkillSignals = {
	LoadPlayerSkills: nsSkills.Get(RemoteNames.LoadPlayerSkills),
	RequestPlayerSkills: nsSkills.Get(RemoteNames.RequestPlayerSkills),
	UnlockSkill: nsSkills.Get(RemoteNames.UnlockSkill),
};
const SkillRemotes = {
	GetUnlockedSkills: nsSkills.Get(RemoteNames.crfGetUnlockedSkills),
};

/* User Interface Remotes */
const UIRemotes = {
	UpdateInventory: nsUI.Get(RemoteNames.UIUpdateInventory),
	NotifyPlayer: nsUI.Get(RemoteNames.UINotifyPlayer),
};

export { PlayerRemotes, PlayerCharacterRemotes, InventoryRemotes, SkillSignals, SkillRemotes, UIRemotes };
