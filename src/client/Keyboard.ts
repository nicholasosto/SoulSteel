// Begin: KeyboardController.ts
import { UserInputService } from "@rbxts/services";
import { Character, Skill } from "@rbxts/wcs";
//import { SkillController } from "./Remotes/Controllers/SkillController";
import { Logger } from "shared/Utility/Logger";
import Remotes, {RemoteNames} from "shared/Remotes/Remotes";
import { ItemId } from "shared/_References/Inventory";

import { EAnimationID } from "shared/Animation/AnimationIndex";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";
// Set the skills here
const Skills: Map<Enum.KeyCode, SkillId> = new Map<Enum.KeyCode, SkillId>();
Skills.set(Enum.KeyCode.Q, "SpiritOrb");
Skills.set(Enum.KeyCode.E, "BasicRanged");
Skills.set(Enum.KeyCode.R, "BasicHold");

// Set Animations Here
const Animations: Map<Enum.KeyCode, EAnimationID> = new Map<Enum.KeyCode, EAnimationID>();
const _remoteSkillAssignment = Remotes.Client.GetNamespace("Skills").Get(RemoteNames.AssignSkillSlot);
const _remoteSkillUnAssign = Remotes.Client.GetNamespace("Skills").Get(RemoteNames.UnAssignSkillSlot);
const _requestPlayerSkills = Remotes.Client.GetNamespace("Skills").Get(RemoteNames.RequestPlayerSkills);


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
					case Enum.KeyCode.One:
						_remoteSkillAssignment.SendToServer(1, "BasicMelee");
						break;
					case Enum.KeyCode.Two:
						_remoteSkillAssignment.SendToServer(1, "BasicRanged");
						break;
					case Enum.KeyCode.Three:
						_remoteSkillAssignment.SendToServer(2, "BasicHold");
						break;
						case Enum.KeyCode.Four:
						_remoteSkillAssignment.SendToServer(3, "Charge");
						break;
						case Enum.KeyCode.Five:
						_remoteSkillAssignment.SendToServer(4, "SpiritOrb");
						break;
					case Enum.KeyCode.Q:
						print("Q Pressed");
						_remoteSkillUnAssign.SendToServer(0);
						this.toggleSkillOnKeyPress(input.KeyCode, true);
						break;
					case Enum.KeyCode.E:
						print("E Pressed");
						_remoteSkillUnAssign.SendToServer(1);
						this.toggleSkillOnKeyPress(input.KeyCode, true);
						break;
					case Enum.KeyCode.R:
						print("R Pressed");
						this.toggleSkillOnKeyPress(input.KeyCode, true);
						break;
					case Enum.KeyCode.H:
						_remoteSkillAssignment.SendToServer(0, "Charge");
						//Remotes.Client.GetNamespace("Equipment").Get(RemoteNames.EquipItemRequest).SendToServer(ItemId.ShortSword);
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
