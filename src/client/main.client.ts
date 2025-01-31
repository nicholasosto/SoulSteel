// Utility Imports
import Logger from "shared/Utility/Logger";

// Handlers
import { StartCharacterFrame } from "./RemoteHandlers/CharacterFrameHandler";

// WCS Imports
import { Character } from "@rbxts/wcs";
import WcsClient from "./WCS Helpers/WCSClient";

// Controllers
import KeyboardController from "client/Keyboard/Keyboard";
import { StartSkillBar } from "client/RemoteHandlers/SkillBarHandler";

//WcsClient.Start();

// Character Created Connection
Character.CharacterCreated.Connect((character) => {
	Logger.Log(script, "Character Created");
});

// Start the Keyboard Controller
KeyboardController.Start();
StartCharacterFrame();
StartSkillBar();
