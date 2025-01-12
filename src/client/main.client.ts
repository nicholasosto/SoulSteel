// Roblox Services
import { ReplicatedStorage } from "@rbxts/services";

// WCS Imports
import { CreateClient, Character, SkillData } from "@rbxts/wcs";

// Controllers
import { KeyboardController } from "./Keyboard";

// UI Components
import CharacterFrame from "./CharacterFrame";
import { SkillBar } from "client/Classes/SkillBar";
import { SkillButton } from "client/Classes/SkillButton";

// Utility Imports
import Remotes, { RemoteNames, CharacterFrameData } from "shared/Remotes";
import { Logger } from "shared/Utility/Logger";
import { PlayerSkillsData } from "shared/_References/Skills";

// Player and PlayerGui
const player = game.GetService("Players").LocalPlayer;
const playerGui = player.WaitForChild("PlayerGui");
const HUD = playerGui.WaitForChild("HUD");

// WCS Client
const Client = CreateClient();
Client.RegisterDirectory(ReplicatedStorage.WaitForChild("TS").WaitForChild("Skills"));
Client.Start();

// Character Created Connection
Character.CharacterCreated.Connect((character) => {
	Logger.Log(script, "Character Created");

	// Create the SkillBar
	const skillBar = new SkillBar(character, HUD);

	character.SkillAdded.Connect((skill) => {
		Logger.Log(script, "Skill Added Connection", skill.GetName());
		// const skillButton = new SkillButton(skill, HUD);
	});
});

Remotes.Client.GetNamespace("Skills").OnEvent(RemoteNames.SkillAssignment, (skill: PlayerSkillsData) => {
	Logger.Log(script, "Skill Assignment", skill as unknown as string);
});


// Start the Keyboard Controller
KeyboardController.Start();

// Start the Character Frame
CharacterFrame.Start();


Remotes.Client.GetNamespace("UserInterface").OnEvent(RemoteNames.UIUpdateCharacterFrame, (data: CharacterFrameData) => {
	Logger.Log(script, "UpdateCharacterFrame", data as unknown as string);
	CharacterFrame.Update(data);
});