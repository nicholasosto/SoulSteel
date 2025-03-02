// MovementController.ts
import { UserInputService, RunService, Players, Workspace } from "@rbxts/services";
import { addVectorForceToCharacter } from "shared/_Functions/ForceGeneration";
import { TGameCharacter } from "shared/_Types/TGameCharacter";
import Logger from "shared/Utility/Logger";

export default class MovementController {
	private humanoid: Humanoid;
	private maxJumps: number;
	private jumpsLeft: number;
	private isJumping: boolean;
	private lastJumpTime: number = 0;
	private jumpCooldown: number = 0.2; // Cooldown in seconds

	constructor(maxJumps: number = 200) {
		const character = Players.LocalPlayer.Character || (Players.LocalPlayer.CharacterAdded.Wait()[0] as Model);
		this.humanoid = character.WaitForChild("Humanoid") as Humanoid;
		this.maxJumps = maxJumps;
		this.jumpsLeft = maxJumps;
		this.isJumping = false;
		this.initialize();
	}

	private initialize() {
		// Monitor landing to reset jump count
		RunService.Heartbeat.Connect(() => {
			if (this.humanoid.FloorMaterial !== Enum.Material.Air) {
				if (this.isJumping) {
					this.jumpsLeft = this.maxJumps;
					this.isJumping = false;
				}
			} else {
				this.isJumping = true;
			}
		});

		// Listen to jump input
		UserInputService.JumpRequest.Connect(() => {
			const currentJumpPower = this.humanoid.JumpPower;

			// Prevent default jump
			const currentTime = tick();
			if (this.jumpsLeft <= 0 || currentTime - this.lastJumpTime < this.jumpCooldown) {
				return; // Prevent jumping if no jumps left or cooldown is active
			}
			this.lastJumpTime = currentTime;
			if (this.jumpsLeft > 0 && this.humanoid.FreeFalling) {
				const gameChar = Players.LocalPlayer.Character as TGameCharacter
				addVectorForceToCharacter(
					gameChar,
					new Vector3(0, gameChar.HumanoidRootPart.AssemblyMass * Workspace.Gravity, 0),
					0.2,
				);
				this.humanoid.ChangeState(Enum.HumanoidStateType.Jumping);
				this.jumpsLeft--;
				Logger.Log("Jumped! Jumps left: " + this.jumpsLeft);
			}
			this.humanoid.JumpPower = currentJumpPower;
		});
	}
}
