// Begin: KeyboardController.ts
import { UserInputService } from "@rbxts/services";
import { Character, Skill } from "@rbxts/wcs";
import { Logger } from "shared/Utility/Logger";
import Remotes, {RemoteNames} from "shared/Remotes";
import { ItemId } from "shared/_References/Inventory";

import { AnimationIndex } from "shared/_References/Indexes/MasterIndex";
import { SkillId } from "shared/_References/Skills";

// Set the skills here
const Skills: Map<Enum.KeyCode, SkillId> = new Map<Enum.KeyCode, SkillId>();
Skills.set(Enum.KeyCode.Q, "SpiritOrb");
Skills.set(Enum.KeyCode.E, "BasicRanged");
Skills.set(Enum.KeyCode.R, "BasicHold");

// Set Animations Here
const Animations: Map<Enum.KeyCode, AnimationIndex.AnimationIds> = new Map<Enum.KeyCode, AnimationIndex.AnimationIds>();

export class KeyboardController {
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
	constructor() {
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

		const wcsCharacter = Character.GetLocalCharacter() as Character;

		// Input Began Connection
		KeyboardController.inputBeganConnection = UserInputService.InputBegan.Connect(
			(input: InputObject, isProcessed: boolean) => {
				switch (input.KeyCode) {
					case Enum.KeyCode.Q:
						print("Q Pressed");
						this.toggleSkillOnKeyPress(input.KeyCode, true);
						break;
					case Enum.KeyCode.E:
						print("E Pressed");
						this.toggleSkillOnKeyPress(input.KeyCode, true);
						break;
					case Enum.KeyCode.R:
						print("R Pressed");
						this.toggleSkillOnKeyPress(input.KeyCode, true);
						break;
					case Enum.KeyCode.H:
						Remotes.Client.GetNamespace("Equipment").Get(RemoteNames.EquipItemRequest).SendToServer(ItemId.ShortSword);
						break
					case Enum.KeyCode.I:
						Remotes.Client.GetNamespace("Inventory").Get(RemoteNames.RequestInventory).SendToServer();
						break;
					default:
						KeyboardController.InputBegan(input, isProcessed);
						break;
				}
			},
		);

		// Input Ended Connection
		KeyboardController.inputEndedConnection = UserInputService.InputEnded.Connect(
			(input: InputObject, isProcessed: boolean) => {
				switch (input.KeyCode) {
					case Enum.KeyCode.Q:
						print("Q Pressed");
						this.toggleSkillOnKeyPress(input.KeyCode, false);
						break;
					case Enum.KeyCode.E:
						print("E Pressed");
						this.toggleSkillOnKeyPress(input.KeyCode, false);
						break;
					case Enum.KeyCode.R:
						print("R Pressed");
						this.toggleSkillOnKeyPress(input.KeyCode, false);

						break;
					default:
						KeyboardController.InputEnded(input, isProcessed);
						break;
				}
			},
		);
	}

	private static InputBegan(input: InputObject, isProcessed: boolean) {
		KeyboardController.toggleSkillOnKeyPress(input.KeyCode, true);
	}

	private static InputEnded(input: InputObject, isProcessed: boolean) {
		KeyboardController.toggleSkillOnKeyPress(input.KeyCode, false);
	}

	// Helper: Skill Toggle
	private static SkillToggle(skillName: string, begin: boolean): void {
		const character = Character.GetLocalCharacter() as Character;

		if (!character) {
			return;
		}

		const skill = character.GetSkillFromString(skillName) as Skill;

		if (skill) {
			if (begin) {
				skill.Start();
			} else {
				skill.Stop();
			}
		}
	}

	// Main Function: onKeyPress
	private static toggleSkillOnKeyPress(key: Enum.KeyCode, begin: boolean): void {
		const skillName = Skills.get(key);
		this.SkillToggle(skillName as string, begin);
	}
}
// End: KeyboardController.ts
