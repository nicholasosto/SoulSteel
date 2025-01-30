import Remotes, { RemoteNames } from "shared/Remotes/Remotes";
import { Logger } from "shared/Utility/Logger";

/* Namespaces */
const nsPlayer = Remotes.Client.GetNamespace("Player");
const nsPlayerCharacter = Remotes.Client.GetNamespace("PlayerCharacter");
const nsInventory = Remotes.Client.GetNamespace("Inventory");
const nsSkills = Remotes.Client.GetNamespace("Skills");
const nsUI = Remotes.Client.GetNamespace("UserInterface");
const nsEquipment = Remotes.Client.GetNamespace("Equipment");

/* Player Remotes */
export const PlayerLevelUp = nsPlayer.Get(RemoteNames.PlayerLevelUp);
export const PlayerResourceUpdate = nsPlayer.Get(RemoteNames.PlayerResourceUpdate);
export const PlayerStatUpdate = nsPlayer.Get(RemoteNames.PlayerStatUpdate);
export const PlayerInfoUpdate = nsPlayer.Get(RemoteNames.PlayerInfoUpdate);

/* Player Character Remotes */
export const PlayerCharacterCreated = nsPlayerCharacter.Get(RemoteNames.PlayerCharacterCreated);
export const PlayerCharacterDestroyed = nsPlayerCharacter.Get(RemoteNames.PlayerCharacterDestroyed);

/* Inventory Remotes */
export const GetInventory = nsInventory.Get(RemoteNames.GetInventory);
export const RequestInventory = nsInventory.Get(RemoteNames.RequestInventory);

/* Skills Remotes */
export const LoadPlayerSkills = nsSkills.Get(RemoteNames.LoadPlayerSkills);
export const RequestPlayerSkills = nsSkills.Get(RemoteNames.RequestPlayerSkills);
export const UnlockSkill = nsSkills.Get(RemoteNames.UnlockSkill);

/* Equipment Remotes */
export const EquipItemRequest = nsEquipment.Get(RemoteNames.EquipItemRequest);

/* User Interface Remotes */
export const UIUpdateSkillBar = nsUI.Get(RemoteNames.UIUpdateSkillBar);
export const UIUpdateInventory = nsUI.Get(RemoteNames.UIUpdateInventory);
export const UINotifyPlayer = nsUI.Get(RemoteNames.UINotifyPlayer);
