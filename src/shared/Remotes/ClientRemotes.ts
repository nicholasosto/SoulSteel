/* Client Remotes */
/*
 * Purpose: To create a namespace for each remote and then export them to be used in other files.
 *
 */

/* Imports */
import Remotes, { SignalNames } from "shared/Remotes/Remotes";

/* Namespaces */
const nsPlayer = Remotes.Client.GetNamespace("Player");
const nsPlayerCharacter = Remotes.Client.GetNamespace("PlayerCharacter");
const nsInventory = Remotes.Client.GetNamespace("Inventory");
const nsSkills = Remotes.Client.GetNamespace("Skills");
const nsUI = Remotes.Client.GetNamespace("UserInterface");
const nsEquipment = Remotes.Client.GetNamespace("Equipment");

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
};

/* Inventory Remotes */
const InventoryRemotes = {
	GetInventory: nsInventory.Get(SignalNames.GetInventory),
	RequestInventory: nsInventory.Get(SignalNames.RequestInventory),
};

/* Skills Signals and Remotes */
const SkillSignals = {
	AssignSkillSlot: nsSkills.Get(SignalNames.AssignSkillSlot),
	LoadPlayerSkills: nsSkills.Get(SignalNames.LoadPlayerSkills),
	RequestPlayerSkills: nsSkills.Get(SignalNames.RequestPlayerSkills),
	UnlockSkill: nsSkills.Get(SignalNames.UnlockSkill),
};
const SkillRemotes = {
	GetUnlockedSkills: nsSkills.Get(SignalNames.crfGetUnlockedSkills),
};

/* User Interface Remotes */
const UIRemotes = {
	UpdateInventory: nsUI.Get(SignalNames.UIUpdateInventory),
	NotifyPlayer: nsUI.Get(SignalNames.UINotifyPlayer),
};

export { PlayerRemotes, PlayerCharacterRemotes, InventoryRemotes, SkillSignals, SkillRemotes, UIRemotes };
