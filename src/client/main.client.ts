// Roblox Services
import { Players, ReplicatedStorage } from "@rbxts/services";

// WCS Imports
import { CreateClient, Character } from "@rbxts/wcs";

// Controllers
import { KeyboardController } from "./Keyboard/Keyboard";
import { SkillController } from "./Skills Interface/SkillController";

// UI Components
import CharacterFrame from "./Character Frame/CharacterFrame";

// Utility Imports
import { Logger } from "shared/Utility/Logger";

// WCS Client
const Client = CreateClient();
const ParentWCSDirectory = ReplicatedStorage.WaitForChild("TS").WaitForChild("Skills");
const SkillsDirectorory = ParentWCSDirectory.WaitForChild("WCSSkills");
const StatusDirectory = ParentWCSDirectory.WaitForChild("WCSStatus");
Client.RegisterDirectory(SkillsDirectorory);
Client.RegisterDirectory(StatusDirectory);
Client.Start();

// Character Created Connection
Character.CharacterCreated.Connect((character) => {
	Logger.Log(script, "Character Created");

	// Initialize the Skill Controller
	SkillController.Initialize(character);
});

// Start the Keyboard Controller
KeyboardController.Start();

// Start the Character Frame
CharacterFrame.Start();
