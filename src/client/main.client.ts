import { ReplicatedStorage } from "@rbxts/services";
import { KeyboardController } from "./Keyboard";
import { CreateClient } from "@rbxts/wcs";

const Client = CreateClient();
Client.RegisterDirectory(ReplicatedStorage.WaitForChild("TS").WaitForChild("Skills"));
Client.Start();

KeyboardController.Start(); // Start listening for keyboard input