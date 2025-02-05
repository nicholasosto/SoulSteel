// Example: CharacterController.ts
import { Players } from "@rbxts/services";
import { MovementComponent } from "shared/Traits/MovementComponent";
import { MultiJumpTrait } from "shared/Traits/MultiJumpTrait";
import Logger from "shared/Utility/Logger";


Logger.Log("Character controller script started.");
const player = Players.LocalPlayer;
const character = player.Character || player.CharacterAdded.Wait()[0];
const humanoid = character.WaitForChild("Humanoid") as Humanoid;

// Create the movement component for this character.
const movementComponent = new MovementComponent(humanoid);

// Add a multi jump trait that allows 3 total jumps (1 ground jump + 2 extra mid-air jumps).
const multiJump = new MultiJumpTrait(humanoid, 3);
movementComponent.addTrait(multiJump);

// Later, if you want to remove the multi jump ability:
// movementComponent.removeTrait(multiJump);
