/**
 * -----------------------------------------------------------------------------
 * @file        ClientUI.ts
 * @description This file implements [describe the purpose and functionality
 *              of the module]. It is responsible for [briefly explain core tasks,
 *              logic, or responsibilities].
 *
 * -----------------------------------------------------------------------------
 * @remarks
 * - **Overview:**
 *   Handles the instantiation and management of the client-side UI components.
 *   When a player character is created, the UI components are created and
 *  attached to the player's GUI. When the player character is destroyed, the
 *  UI components are destroyed.
 *
 * - **Usage:**
 *   The Server creates a new instance of the PlayerCharacter class when a player
 *  joins the game. This file listens for the CharacterCreated and CharacterDestroyed
 *  events and creates or destroys the UI components accordingly.
 *
 * - **Dependencies:**
 *   List any major dependencies or modules that this file relies on.
 *     - SkillBar class
 *     - CharacterFrame class
 *
 * - **Notes:**
 *   wcsCharacter is needed to actiavte the SkillBar and CharacterFrame classes.
 *
 * -----------------------------------------------------------------------------
 * @example
 * // Importing and using the module:
 * import "client/UI Controller/ClientUI";
 *
 */
// Roblox Services
import { Players } from "@rbxts/services";

// Utility Imports
import Logger from "shared/Utility/Logger";

// GUI Components
import SkillBar from "shared/Epic UI/Skill Bar/SkillBar";
//import { StartSkillBar } from "client/UI Controller/SkillBarHandler";
import CharacterFrame from "shared/Epic UI/Character Frame/CharacterFrame";
import { StartCharacterFrame } from "client/UI Controller/CharacterFrameHandler";

// WCS Imports
import { Character } from "@rbxts/wcs";

// Instances
let SkillBarInstance: SkillBar | undefined;
let CharacterFrameInstance: CharacterFrame | undefined;

// Connections
let connectionCharacterCreated: RBXScriptConnection | undefined;
let connectionCharacterDestroyed: RBXScriptConnection | undefined;

// Character Created Event Handler
function HandleCharacterCreated(wcsCharacter: Character) {
	CharacterFrameInstance = new CharacterFrame(Players.LocalPlayer);
	StartCharacterFrame(CharacterFrameInstance);
}

function StarUI() {
	Logger.Log(script, "Starting UI");

	// Destroy the UI Components if they exist
	SkillBarInstance?.Destroy();
	CharacterFrameInstance?.Destroy();

	// Check if the local character exists
	const localCharacter = Character.GetLocalCharacter();
	if (localCharacter !== undefined) {
		HandleCharacterCreated(localCharacter);
	}

	// Character Created Connection
	connectionCharacterCreated = Character.CharacterCreated.Connect((wcsCharacter) => {
		HandleCharacterCreated(wcsCharacter);
	});

	// Character Destroyed Connection
	connectionCharacterDestroyed = Character.CharacterDestroyed.Connect(() => {
		Logger.Log(script, "Character Destroyed");
		SkillBarInstance?.Destroy();
		CharacterFrameInstance?.Destroy();
	});
}

export { StarUI };
