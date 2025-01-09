import { ReplicatedStorage } from "@rbxts/services";
import { KeyboardController } from "./Keyboard";
import { CreateClient } from "@rbxts/wcs";
import CharacterFrame from "./CharacterFrame";
import { Dialog } from "shared/UI Component Classes/DialogFrame";
import { Logger } from "shared/Utility/Logger";
import { StorageManager } from "shared/_References/Managers/StorageManager";
import { DialogTemplateType } from "shared/UI Component Classes/DialogTemplate";

const player = game.GetService("Players").LocalPlayer;
const playerGui = player.WaitForChild("PlayerGui");
const HUD = playerGui.WaitForChild("HUD");

const Client = CreateClient();
Client.RegisterDirectory(ReplicatedStorage.WaitForChild("TS").WaitForChild("Skills"));
Client.Start();

// Start the Keyboard Controller
KeyboardController.Start();
CharacterFrame.Start();

const dialogTemplate = StorageManager.CloneFromStorage("Dialog_Template") as DialogTemplateType;

const dialog = new Dialog(dialogTemplate, "Super Duper", HUD, "Yes", "OK", "You have no choice but to click a button.");
dialog.Show();
