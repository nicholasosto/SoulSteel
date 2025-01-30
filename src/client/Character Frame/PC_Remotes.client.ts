import Remotes, { RemoteNames } from "shared/Remotes/Remotes";
import CharacterFrame from "./CharacterFrame";
import { Logger } from "shared/Utility/Logger";

// Player Remotes
const PlayerLevelUp = Remotes.Client.GetNamespace("Player").Get(RemoteNames.PlayerLevelUp);
const PlayerExperienceUpdate = Remotes.Client.GetNamespace("Player").Get(RemoteNames.PlayerExperienceUpdate);
const PlayerResourceUpdate = Remotes.Client.GetNamespace("Player").Get(RemoteNames.PlayerResourceUpdate);
const PlayerStatUpdate = Remotes.Client.GetNamespace("Player").Get(RemoteNames.PlayerStatUpdate);

// Player Character Remotes
const PlayerCharacterCreated = Remotes.Client.GetNamespace("PlayerCharacter").Get(RemoteNames.PlayerCharacterCreated);
const PlayerCharacterDestroyed = Remotes.Client.GetNamespace("PlayerCharacter").Get(
	RemoteNames.PlayerCharacterDestroyed,
);

PlayerResourceUpdate.Connect((resourceId: string, value: number) => {
	Logger.Log(script, "Player Resource Update");
	CharacterFrame.Update({ resourceId, value });
});
