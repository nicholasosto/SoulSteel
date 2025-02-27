/* File: CharacterFrame.ts */
// This file is used to create the Character Frame for the players UI.
// The Character Frame consists of the following:
// - Progress Bars (Health, Mana, Stamina, Experience)
// - Character Info (Name, Level, Profile Picture)
// The Character Frame is created when the player character is added to the game and is destroyed when the player character is removed from the game.

/* Module Imports */
import { Players } from "@rbxts/services";

/* Shared Imports */
import { IProgressBar, TInfoFrame } from "shared/Epic UI/EpicIndex";
import { IPlayerData } from "shared/_Functions/DataFunctions";
import ProgressBar from "./ProgressBar";

/* Main Class: CharacterFrame */
export default class InfoFrame {
	/* instance */
	private _instance: TInfoFrame;

	/* Constructor */
	constructor(infoFrame: TInfoFrame) {
		this._instance = infoFrame;
	}

	/* Update */
	public Update(playerData: IPlayerData) {
		const level = playerData.ProgressionStats.Level;
		const name = playerData.CharacterInfo.CharacterName;

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

	public OnProgressionStats(progressionStats: IPlayerData["ProgressionStats"]) {
		this._instance.LevelCounter.SetAttribute("TextValue", tostring(progressionStats.Level));
	}
}
