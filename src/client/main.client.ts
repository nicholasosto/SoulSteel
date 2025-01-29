// Roblox Services
import { ReplicatedStorage } from "@rbxts/services";

// WCS Imports
import { CreateClient, Character } from "@rbxts/wcs";

// Controllers
import { KeyboardController } from "./Keyboard";
import { SkillController } from "./Remotes/Controllers/SkillController";

// UI Components
import CharacterFrame from "./CharacterFrame";

// Utility Imports
import Remotes, { RemoteNames, CharacterFrameData } from "shared/Remotes/Remotes";
import { Logger } from "shared/Utility/Logger";

//import { RegisterEntity, GetEntity } from "shared/Factories/NameFactory";

// WCS Client
const Client = CreateClient();
const ParentWCSDirectory = ReplicatedStorage.WaitForChild("TS").WaitForChild("Skills");
const SkillsDirectorory = ParentWCSDirectory.WaitForChild("WCSSkills");
const StatusDirectory = ParentWCSDirectory.WaitForChild("WCSStatus");
Client.RegisterDirectory(SkillsDirectorory);
Client.RegisterDirectory(StatusDirectory);
Client.Start();

// Connections
let _connectionWcsSkillStart: RBXScriptConnection | undefined;

// Character Created Connection
Character.CharacterCreated.Connect((character) => {
	Logger.Log(script, "Character Created");

	// Initialize the Skill Controller
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
