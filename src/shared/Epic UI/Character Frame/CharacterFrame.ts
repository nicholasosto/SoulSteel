/* File: CharacterFrame.ts */
// This file is used to create the Character Frame for the players UI.
// The Character Frame consists of the following:
// - Progress Bars (Health, Mana, Stamina, Experience)
// - Character Info (Name, Level, Profile Picture)
// The Character Frame is created when the player character is added to the game and is destroyed when the player character is removed from the game.

/* Imports */

// Interfaces
import { TCharacterFrame, ICharacterInfo, IProgressBar, ICharacterFrame } from "./iCharacterFrame";

// Utility
import { StorageManager } from "shared/Storage Manager/StorageManager";

// Sub-Modules
import ProgressBar from "shared/Epic UI/Progress Bar/ProgressBar";
import CharacterInfo from "shared/Epic UI/Character Frame/CharacterInfo";

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
	constructor(player: Player) {
		// Set the Parent
		this.instance.Parent = player.WaitForChild("PlayerGui").WaitForChild("HUD");

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

	// Destroy the Character Frame instance
	public Destroy() {
		// Destroy the Character Frame
		this.instance.Destroy();
	}
}
