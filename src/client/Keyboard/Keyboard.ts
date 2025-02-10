// Begin: KeyboardController.ts
import { UserInputService } from "@rbxts/services";
import { Character, Skill } from "@rbxts/wcs";
import { SkillEvent } from "client/net/_Client_Events";
import { SkillKeyMap } from "./KeyboardMaps";
import Logger from "shared/Utility/Logger";
// Set the skills here
export default class KeyboardController {
	private static instance: KeyboardController;
	private static inputBeganConnection: RBXScriptConnection;
	private static inputEndedConnection: RBXScriptConnection;
	private static characterAddedConnection: RBXScriptConnection;

	public static Start() {
		if (this.instance === undefined) {
			this.instance = new KeyboardController();
		}
	}
	// Constructor
	private constructor() {
		const Player = game.GetService("Players").LocalPlayer as Player;
		const character = Player.Character;
		KeyboardController.OnCharacterAdded(character as Model);
		// CHARACTER ADDED
		KeyboardController.characterAddedConnection = Player.CharacterAdded.Connect((character: Model) => {
			//Logger.Log(script,"KeyboardController", "Character Added");
			KeyboardController.OnCharacterAdded(character);
		});
	}

	private static OnCharacterAdded(character: Model) {
		// Disconnect the previous connections
		KeyboardController.inputBeganConnection?.Disconnect();
		KeyboardController.inputEndedConnection?.Disconnect();

		// Input Began Connection
		KeyboardController.inputBeganConnection = UserInputService.InputBegan.Connect(
			(input: InputObject, isProcessed: boolean) => {
				KeyboardController.InputBegan(input, isProcessed);
			},
		);

		// Input Ended Connection
		KeyboardController.inputEndedConnection = UserInputService.InputEnded.Connect(
			(input: InputObject, isProcessed: boolean) => {
				KeyboardController.InputEnded(input, isProcessed);
			},
		);
	}

	// Input Began
	private static InputBegan(input: InputObject, isProcessed: boolean) {
		if (isProcessed) return; // If the input is processed by another UI, return;

		switch (input.KeyCode) {
			case Enum.KeyCode.KeypadOne:
				SkillEvent.SkillSlotAssignment.SendToServer(1, "Meditate");
				break;
			case Enum.KeyCode.KeypadTwo:
				SkillEvent.SkillSlotAssignment.SendToServer(2, "Charge");
				break;

			case Enum.KeyCode.KeypadThree:
				SkillEvent.SkillSlotAssignment.SendToServer(3, "Fly");
				break;
			case Enum.KeyCode.KeypadZero:
				SkillEvent.UnassignSkillSlot.SendToServer(2);
				break;
			case Enum.KeyCode.R:
				Logger.Log(script, "R Pressed");
				break;
			default:
				break;
		}
		KeyboardController.toggleSkillOnKeyPress(input.KeyCode, true);
	}

	// Input Ended
	private static InputEnded(input: InputObject, isProcessed: boolean) {
		if (isProcessed) return; // If the input is processed by another UI, return;
		KeyboardController.toggleSkillOnKeyPress(input.KeyCode, false);
	}

	// Main Function: onKeyPress
	private static toggleSkillOnKeyPress(key: Enum.KeyCode, begin: boolean): void {
		const skillName = SkillKeyMap.get(key) as string;
		if (skillName === undefined) return;
		const character = Character.GetLocalCharacter() as Character;

		// Gets the skill from the character
		const skill = character?.GetSkillFromString(skillName) as Skill;
		if (skill === undefined) {
			Logger.Log(script, "Character or Skill is not assigned to Character");
			return;
		}

		if (begin) {
			skill.Start();
		}
	}
}
// End: KeyboardController.ts
