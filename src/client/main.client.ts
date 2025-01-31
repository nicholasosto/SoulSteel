// Utility Imports
import Logger from "shared/Utility/Logger";

// WCS Imports
import { Character } from "@rbxts/wcs";
import WcsClient from "./WCS Helpers/WCSClient";
WcsClient.Start();

// Controllers
import KeyboardController from "client/Keyboard/Keyboard";
import { GetUnlockedSkills } from "client/RemoteHandlers/SkillHandler";

// Character Created Connection
Character.CharacterCreated.Connect((character) => {
	Logger.Log(script, "Character Created");
	GetUnlockedSkills();
});

// Start the Keyboard Controller
KeyboardController.Start();
