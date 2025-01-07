import { ReplicatedStorage } from "@rbxts/services";
import { CharacterFrame } from "./CharacterFrame/CharacterFrame";
import { KeyboardController } from "./Keyboard";
import { CreateClient } from "@rbxts/wcs";
import { Logger } from "shared/Utility/Logger";

const player = game.GetService("Players").LocalPlayer;

Logger.Log(player, "Client started");

const Client = CreateClient();
Client.RegisterDirectory(ReplicatedStorage.WaitForChild("TS").WaitForChild("Skills"));
Client.Start();

KeyboardController.Start(); // Start listening for keyboard input