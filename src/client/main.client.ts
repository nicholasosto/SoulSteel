// Roblox Services
import { ReplicatedStorage } from "@rbxts/services";

// WCS Imports
import { CreateClient, Character, SkillData, Skill } from "@rbxts/wcs";

// Controllers
import { KeyboardController } from "./Keyboard";
import { SkillController } from "./Remotes/Controllers/SkillController";

// UI Components
import CharacterFrame from "./CharacterFrame";

// Utility Imports
import Remotes, { RemoteNames, CharacterFrameData } from "shared/Remotes";
import { Logger } from "shared/Utility/Logger";
import { PlayerSkillsData } from "shared/Skills/SkillIndex";

// Player and PlayerGui
const player = game.GetService("Players").LocalPlayer;
const playerGui = player.WaitForChild("PlayerGui");
const HUD = playerGui.WaitForChild("HUD");

//import { RegisterEntity, GetEntity } from "shared/Factories/NameFactory";

// WCS Client
const Client = CreateClient();
Client.RegisterDirectory(ReplicatedStorage.WaitForChild("TS").WaitForChild("Skills"));
Client.Start();

// Connections
let _connectionWcsSkillStart: RBXScriptConnection | undefined;

// Character Created Connection
Character.CharacterCreated.Connect((character) => {
	Logger.Log(script, "Character Created");
	SkillController.Initialize(character);

	_connectionWcsSkillStart?.Disconnect();
	_connectionWcsSkillStart = character.SkillStarted.Connect((unknownSkill) => {
		Logger.Log(script, "Skill Start", unknownSkill as unknown as string);
	});
	character.Humanoid.Died.Connect(() => {
		Logger.Log(script, "Character Died");
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
