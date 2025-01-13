// Roblox Services
import { ReplicatedStorage } from "@rbxts/services";

// WCS Imports
import { CreateClient, Character, SkillData, Skill } from "@rbxts/wcs";

// Controllers
import { KeyboardController } from "./Keyboard";

// UI Components
import CharacterFrame from "./CharacterFrame";
import { SkillController } from "client/Classes/SkillController";
import { SkillButton } from "client/Classes/SkillButton";

// Utility Imports
import Remotes, { RemoteNames, CharacterFrameData } from "shared/Remotes";
import { Logger } from "shared/Utility/Logger";
import { PlayerSkillsData } from "shared/_References/Skills";

// Player and PlayerGui
const player = game.GetService("Players").LocalPlayer;
const playerGui = player.WaitForChild("PlayerGui");
const HUD = playerGui.WaitForChild("HUD");

SkillController.Initialize();

//import { RegisterEntity, GetEntity } from "shared/Factories/NameFactory";

// WCS Client
const Client = CreateClient();
Client.RegisterDirectory(ReplicatedStorage.WaitForChild("TS").WaitForChild("Skills"));
Client.Start();

let skillsConnection: RBXScriptConnection | undefined;

// Character Created Connection
Character.CharacterCreated.Connect((character) => {

	Logger.Log(script, "Character Created");

	skillsConnection?.Disconnect();
	skillsConnection = Remotes.Client.GetNamespace("Skills").Get(RemoteNames.SkillAssignment).Connect((playerSkillData: PlayerSkillsData) => {
		Logger.Log(script, "Skill Assignment", playerSkillData as unknown as string);
		SkillController.AssignSkillData(character,playerSkillData);
	});

	

	character.Humanoid.Died.Connect(() => {
		skillsConnection?.Disconnect();
	});
});

Character.CharacterDestroyed.Connect((character) => {
	Logger.Log(script, "Character Destroyed");
});

// Start the Keyboard Controller
KeyboardController.Start();

// Start the Character Frame
CharacterFrame.Start();

Remotes.Client.GetNamespace("UserInterface").OnEvent(RemoteNames.UIUpdateCharacterFrame, (data: CharacterFrameData) => {
	//Logger.Log(script, "UpdateCharacterFrame", data as unknown as string);
	CharacterFrame.Update(data);
});
