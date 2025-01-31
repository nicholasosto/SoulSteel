// Roblox Services
import { Players, ReplicatedStorage } from "@rbxts/services";

// Utility Imports
import Logger from "shared/Utility/Logger";

// WCS Imports
import { Character } from "@rbxts/wcs";
import WcsClient from "./WCS Helpers/WCSClient";
WcsClient.Start();

// Controllers
import KeyboardController from "client/Keyboard/Keyboard";
import SkillController from "client/Skills Interface/SkillController";
import { GetUnlockedSkills } from "client/RemoteHandlers/SkillHandler";

// Character Created Connection
Character.CharacterCreated.Connect((character) => {
	Logger.Log(script, "Character Created");
	GetUnlockedSkills();
	// Initialize the Skill Controller
	SkillController.Initialize(character);
});

// Start the Keyboard Controller
KeyboardController.Start();
