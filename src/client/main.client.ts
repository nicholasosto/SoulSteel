import { ReplicatedStorage } from "@rbxts/services";
import { KeyboardController } from "./Keyboard";
import { CreateClient } from "@rbxts/wcs";
import CharacterFrame from "./CharacterFrame";
import { Dialog } from "shared/UI Component Classes/DialogFrame";
import { Logger } from "shared/Utility/Logger";
import { StorageManager } from "shared/_References/Managers/StorageManager";
import { DialogTemplateType } from "shared/UI Component Classes/Types/DialogTemplate";
import { SkillButton } from "shared/UI Component Classes/SkillButton";
import Remotes, { RemoteNames } from "shared/Remotes";
import { Character } from "@rbxts/wcs";

const player = game.GetService("Players").LocalPlayer;
const playerGui = player.WaitForChild("PlayerGui");
const HUD = playerGui.WaitForChild("HUD");

const Client = CreateClient();
Client.RegisterDirectory(ReplicatedStorage.WaitForChild("TS").WaitForChild("Skills"));
Client.Start();

Character.CharacterCreated.Connect((character) => {
    Logger.Log(script, "Character Created");

    character.SkillAdded.Connect((skill) => {
        Logger.Log(script, "Skill Added Connection", skill.GetName());
    });
});

// Start the Keyboard Controller
KeyboardController.Start();
CharacterFrame.Start();

const dialogTemplate = StorageManager.CloneFromStorage("Dialog_Template") as DialogTemplateType;

