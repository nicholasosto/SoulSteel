import Remotes, { RemoteNames } from "shared/Remotes";
import { Logger } from "shared/Utility/Logger";

export const RSkillAssignment = Remotes.Client.GetNamespace("Skills").Get(RemoteNames.SkillAssignment);
export const RInventoryRequest = Remotes.Client.GetNamespace("Inventory").Get(RemoteNames.RequestInventory);
export const REquipItemRequest = Remotes.Client.GetNamespace("Equipment").Get(RemoteNames.EquipItemRequest);
export const RGameCharacterCreated = Remotes.Client.GetNamespace("GameCharacter").Get(RemoteNames.GameCharacterCreated);
export const RGameCharacterDestroyed = Remotes.Client.GetNamespace("GameCharacter").Get(
	RemoteNames.GameCharacterDestroyed,
);
