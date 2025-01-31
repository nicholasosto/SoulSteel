import { Players } from "@rbxts/services";
import Logger from "shared/Utility/Logger";
import CharacterFrame from "shared/Epic UI/Character Frame/CharacterFrame";
import { ResourceId } from "shared/_References/Resources";
import { PlayerRemotes } from "shared/Remotes/ClientRemotes";

const CharacterFrameInstance = new CharacterFrame(Players.LocalPlayer);
let _connectionResourceUpdate: RBXScriptConnection | undefined;
let _connectionInfoUpdate: RBXScriptConnection | undefined;

function StartCharacterFrame() {
	// Character Info Updated
	_connectionInfoUpdate?.Disconnect();
	_connectionInfoUpdate = PlayerRemotes.InfoUpdate.Connect((name: string, level: number, profilePicId: string) => {
		Logger.Log(script, "Updating info");
		CharacterFrameInstance?.info.setName(name);
		CharacterFrameInstance?.info.setLevel(level);
		CharacterFrameInstance?.info.setProfilePic(profilePicId);
	});

	// Resource Updated Connection
	_connectionResourceUpdate?.Disconnect();
	_connectionResourceUpdate = PlayerRemotes.ResourceUpdate.Connect(
		(resourceId: ResourceId, current: number, max: number) => {
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
		},
	);
}

export { StartCharacterFrame };
