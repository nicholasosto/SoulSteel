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
import { StartSkillBar } from "client/RemoteHandlers/SkillBarHandler";
import CharacterFrame from "shared/Epic UI/Character Frame/CharacterFrame";
import { StartCharacterFrame } from "client/RemoteHandlers/CharacterFrameHandler";

// WCS Imports
import { Character } from "@rbxts/wcs";

let SkillBarInstance: SkillBar | undefined;
let CharacterFrameInstance: CharacterFrame | undefined;

let connectionCharacterCreated: RBXScriptConnection | undefined;
let connectionCharacterDestroyed: RBXScriptConnection | undefined;

function HandleCharacterCreated(wcsCharacter: Character) {
	SkillBarInstance = new SkillBar(wcsCharacter);
	CharacterFrameInstance = new CharacterFrame(Players.LocalPlayer);
	StartCharacterFrame(CharacterFrameInstance);
	StartSkillBar(SkillBarInstance);

	SkillBarInstance.SetSlot(1, "SpiritOrb");
}

function StarUI() {
	Logger.Log(script, "Starting UI");

	SkillBarInstance?.Destroy();
	CharacterFrameInstance?.Destroy();

	const localCharacter = Character.GetLocalCharacter();
	if (localCharacter !== undefined) {
		HandleCharacterCreated(localCharacter);
	}

	connectionCharacterCreated = Character.CharacterCreated.Connect((wcsCharacter) => {
		HandleCharacterCreated(wcsCharacter);
	});

	connectionCharacterDestroyed = Character.CharacterDestroyed.Connect(() => {
		Logger.Log(script, "Character Destroyed");
		SkillBarInstance?.Destroy();
		CharacterFrameInstance?.Destroy();
	});
}

export { StarUI };
