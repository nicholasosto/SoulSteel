/* File: CharacterFrame.ts */
// This file is used to create the Character Frame for the players UI.
// The Character Frame consists of the following:
// - Progress Bars (Health, Mana, Stamina, Experience)
// - Character Info (Name, Level, Profile Picture)
// The Character Frame is created when the player character is added to the game and is destroyed when the player character is removed from the game.

/* Imports */

import { Players } from "@rbxts/services";
// Interfaces
import { TCharacterFrame, ICharacterInfo, IProgressBar, ICharacterFrame } from "./iCharacterFrame";

// Utility
import StorageManager from "shared/Storage Manager/StorageManager";

// Sub-Modules
import ProgressBar from "shared/Epic UI/Progress Bar/ProgressBar";
import CharacterInfo from "shared/Epic UI/Character Frame/CharacterInfo";
import Logger from "shared/Utility/Logger";
import { ResourceId } from "shared/Game Character/Character Resources/Resources";
import { IPlayerData } from "shared/Data Interfaces/PlayerData";
import { CharacterResource } from "shared/Game Character/Character Resources/CharacterResource";

/* Main Class: CharacterFrame */
export default class CharacterFrame implements ICharacterFrame {
	// Instance
	instance: TCharacterFrame = StorageManager.CloneFromStorage("CharacterFrame_Template") as TCharacterFrame;

	// Progress Bars
	bars: {
		stamina: IProgressBar;
		health: IProgressBar;
		mana: IProgressBar;
		experience: IProgressBar;
	};

	// Character Info
	info: ICharacterInfo;

	// Constructor
	constructor() {
		// Set the Parent
		this.instance.Parent = Players.LocalPlayer.WaitForChild("PlayerGui").WaitForChild("HUD");

		// Create the Resource Bars
		this.bars = {
			stamina: new ProgressBar(this.instance.Bars.Progress["Stamina Bar"]),
			health: new ProgressBar(this.instance.Bars.Progress["Health Bar"]),
			mana: new ProgressBar(this.instance.Bars.Progress["Mana Bar"]),
			experience: new ProgressBar(this.instance.Bars.Progress["Experience Bar"]),
		};

		// Create the Character Info
		this.info = new CharacterInfo(this.instance.Info);
	}

	public Update(playerData: IPlayerData) {
		Logger.Log(script, "Updating Character Frame");
		const level = playerData.ProgressionStats.Level;
		const name = playerData.CharacterName;
		// Update the Character Info
		this.info.setLevel(level);
		this.info.setName(name);
		const profilePic = Players.GetUserThumbnailAsync(
			Players.LocalPlayer.UserId,
			Enum.ThumbnailType.HeadShot,
			Enum.ThumbnailSize.Size420x420,
		)[0];
		this.info.setProfilePic(profilePic);
	}

	UpdateResource(characterResource: CharacterResource) {
		switch (characterResource.ResourceName) {
			case "Health":
				this.bars.health.update(characterResource);
				break;
			case "Mana":
				this.bars.mana.update(characterResource);
				break;
			case "Stamina":
				this.bars.stamina.update(characterResource);
				break;
			case "Experience":
				this.bars.experience.update(characterResource);
				break;
		}
	}

	// Destroy the Character Frame instance
	public Destroy() {
		// Destroy the Character Frame
		this.instance.Destroy();
	}
}
