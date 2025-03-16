/* File: CharacterFrame.ts */
// This file is used to create the Character Frame for the players UI.
// The Character Frame consists of the following:
// - Progress Bars (Health, Mana, Stamina, Experience)
// - Character Info (Name, Level, Profile Picture)
// The Character Frame is created when the player character is added to the game and is destroyed when the player character is removed from the game.

/* Module Imports */
import { Players } from "@rbxts/services";
import * as Payloads from "shared/net/RemoteIndex";
/* Shared Imports */
import { TInfoFrame } from "shared/User Interface Classes/Types/EpicIndex";
import { ResourceId } from "shared/_IDs/IDs_Resource";
import ProgressBar from "./ProgressBar";

/* Main Class: CharacterFrame */
export default class InfoFrame {
	/* instance */
	private _instance: TInfoFrame;
	private _payloadData: Payloads.PInfoFrame | undefined;
	private _resourceBars: Map<ResourceId, ProgressBar> = new Map();

	/* Constructor */
	constructor(tInfoFrame: TInfoFrame) {
		this._instance = tInfoFrame;
	}

	/* Update */
	public Update(playerData: Payloads.PInfoFrame) {
		this._payloadData = playerData;
		this.updateLevel();
		this.updateName();
		this._updateProfilePic();
		this._updateResourceBar(playerData.Health);
		this._updateResourceBar(playerData.SoulPower);
		this._updateResourceBar(playerData.Experience);
		this._updateResourceBar(playerData.Stamina);
	}

	/* Update Level */
	private updateLevel() {
		this._instance.InfoFrame.LevelCounter?.SetAttribute("TextValue", tostring(this._payloadData?.Level));
	}

	/* Update Name */
	private updateName() {
		this._instance.InfoFrame.Name_Frame.SetAttribute("TextValue", this._payloadData?.Name);
	}

	/* Update Profile Picture */
	private _updateProfilePic() {
		const profilePic = Players.GetUserThumbnailAsync(
			Players.LocalPlayer.UserId,
			Enum.ThumbnailType.HeadShot,
			Enum.ThumbnailSize.Size420x420,
		)[0];
		this._instance.InfoFrame.ProfilePic.Image = profilePic;
	}

	private _updateResourceBar(resourceData: Payloads.PResourceBar) {
		switch (resourceData.resourceId) {
			case "Health":
				this._instance.Bars.Progress.Health.SetAttribute(
					"TextValue",
					tostring(resourceData.resourceId) + ": " + tostring(resourceData.current),
				);
				this._instance.Bars.Progress.Health.SetAttribute(
					"BarPercent",
					tostring((resourceData.current / resourceData.max) * 100),
				);
				break;
			case "Stamina":
				this._instance.Bars.Progress.Stamina.SetAttribute(
					"TextValue",
					tostring(resourceData.resourceId) + ": " + tostring(resourceData.current),
				);
				this._instance.Bars.Progress.Stamina.SetAttribute(
					"BarPercent",
					tostring((resourceData.current / resourceData.max) * 100),
				);
				break;
			case "SoulPower":
				this._instance.Bars.Progress.SoulPower.SetAttribute(
					"TextValue",
					tostring(resourceData.resourceId) + ": " + tostring(resourceData.current),
				);
				this._instance.Bars.Progress.SoulPower.SetAttribute(
					"BarPercent",
					tostring((resourceData.current / resourceData.max) * 100),
				);
				break;
			case "Experience":
				this._instance.Bars.Progress.Experience.SetAttribute(
					"TextValue",
					tostring(resourceData.resourceId) + ": " + tostring(resourceData.current),
				);
				this._instance.Bars.Progress.Experience.SetAttribute(
					"BarPercent",
					tostring((resourceData.current / resourceData.max) * 100),
				);
				break;
			default:
				break;
		}
		print("Doing nothing");
	}
}
