import { Players } from "@rbxts/services";
import { Logger } from "shared/Utility/Logger";
import CharacterFrame from "shared/Character Frame/CharacterFrame";
import { ResourceId } from "shared/_References/Resources";
import { PlayerLevelUp, PlayerResourceUpdate, PlayerInfoUpdate } from "client/Indexes/RemotesIndex";

const LocalPlayer = Players.LocalPlayer;
let CharacterFrameInstance: CharacterFrame | undefined;

// Character Added - Create CharacterFrame Instance
if (LocalPlayer.Character) {
	Logger.Log(script, "Character already exists, creating CharacterFrame instance");
	CharacterFrameInstance = new CharacterFrame(LocalPlayer);
}

LocalPlayer.CharacterAdded.Connect(() => {
	Logger.Log(script, "Character added, creating CharacterFrame instance");
	CharacterFrameInstance = new CharacterFrame(LocalPlayer);
});

// Resource Bar Update
PlayerResourceUpdate.Connect((resourceId: ResourceId, current: number, max: number) => {
	Logger.Log(script, "Updating resource");
	const percentage = (current / max) * 100;
	switch (resourceId) {
		case "Health":
			CharacterFrameInstance?.bars.health.setPercent(percentage);
			CharacterFrameInstance?.bars.health.setText(`Health ${current}/${max}`);
			break;
		case "Mana":
			CharacterFrameInstance?.bars.mana.setPercent(percentage);
			CharacterFrameInstance?.bars.mana.setText(`Mana ${current}/${max}`);
			break;
		case "Stamina":
			CharacterFrameInstance?.bars.stamina.setPercent(percentage);
			CharacterFrameInstance?.bars.stamina.setText(`Stamina ${current}/${max}`);
			break;
		default:
			Logger.Log(script, "Resource not found");
	}
});

PlayerLevelUp.Connect((level: number) => {
	Logger.Log(script, "Level up");
	CharacterFrameInstance?.info.setLevel(level);
});

PlayerInfoUpdate.Connect((name: string, level: number, profilePicId: string) => {
	Logger.Log(script, "Updating info");
	CharacterFrameInstance?.info.setName(name);
	CharacterFrameInstance?.info.setLevel(level);
	CharacterFrameInstance?.info.setProfilePic(profilePicId);
});
