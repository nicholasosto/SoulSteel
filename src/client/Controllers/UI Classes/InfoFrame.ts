/* File: CharacterFrame.ts */
// This file is used to create the Character Frame for the players UI.
// The Character Frame consists of the following:
// - Progress Bars (Health, Mana, Stamina, Experience)
// - Character Info (Name, Level, Profile Picture)
// The Character Frame is created when the player character is added to the game and is destroyed when the player character is removed from the game.

/* Imports */

import { Players } from "@rbxts/services";
// Interfaces
import { TInfoFrame } from "shared/Epic UI/EpicInterfaces";
// Sub-Modules
import Logger from "shared/Utility/Logger";
import { ResourceId } from "shared/Game Character/Character Resources/Resources";
import { IPlayerData } from "shared/Data Interfaces/PlayerData";
import ProgressBar from "shared/Epic UI/Progress Bar/ProgressBar";

/* Main Class: CharacterFrame */
export default class InfoFrame {
	// Instance
	private _instance: TInfoFrame;
	// Character Info
	private ResourceBarMap: Map<ResourceId, ProgressBar> = new Map();

	// Constructor
	constructor(infoFrame: TInfoFrame) {
		this._instance = infoFrame;
		// Set the Parent
		Logger.Log(script, "[Instance: CharacterFrame Class]: ", this._instance as unknown as string);
	}

	public Update(playerData: IPlayerData) {
		Logger.Log(script, "Updating Character Frame");
		const level = playerData.ProgressionStats.Level;
		const name = playerData.CharacterName;

		this._instance.LevelCounter.SetAttribute("TextValue", tostring(level));
		this._instance.Name_Frame.SetAttribute("TextValue", name);
		// Update the Character Info
		const profilePic = Players.GetUserThumbnailAsync(
			Players.LocalPlayer.UserId,
			Enum.ThumbnailType.HeadShot,
			Enum.ThumbnailSize.Size420x420,
		)[0];
		this._instance.ProfilePic.Image = profilePic;
	}

}
