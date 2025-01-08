import { ReplicatedStorage } from "@rbxts/services";
import { CharacterFrame } from "./CharacterFrame/CharacterFrame";
import { KeyboardController } from "./Keyboard";
import { CreateClient } from "@rbxts/wcs";
import { Logger } from "shared/Utility/Logger";
import { FireAuraPack, mapAuraTemplate, applyAuraToCharacter } from "shared/Aura System/Auras";
const player = game.GetService("Players").LocalPlayer;
const character = player.Character || player.CharacterAdded.Wait()[0];

const fireAuraPackClone = FireAuraPack?.Clone();

if (fireAuraPackClone) {
    fireAuraPackClone.Parent = character;
    applyAuraToCharacter(character, fireAuraPackClone as Model);
}

Logger.Log(player, "Client started");

const Client = CreateClient();
Client.RegisterDirectory(ReplicatedStorage.WaitForChild("TS").WaitForChild("Skills"));
Client.Start();

KeyboardController.Start(); // Start listening for keyboard input
