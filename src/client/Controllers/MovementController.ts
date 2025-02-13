import { Players, UserInputService } from "@rbxts/services";
import Logger from "shared/Utility/Logger";

enum MovementState {
	Normal,
	Dashing,
	Flying,
	MultiJump,
}

export default class MovementController {
	private player = Players.LocalPlayer;
	private character: Model | undefined;
	private humanoid: Humanoid | undefined;
	private currentState: MovementState = MovementState.Normal;
	private numJumps = 3;

	/* Constructor */
	constructor() {
		/* Character Added */
		this.player.CharacterAdded.Connect((character) => {
			Logger.Log("MovementController", "Character added");
			this.character = character;
			this.humanoid = character.WaitForChild("Humanoid") as Humanoid;
			// Optionally, reset state or bind additional events here.
			this.currentState = MovementState.Normal;
		});

		/* Listen for input */
		UserInputService.InputBegan.Connect((input, gameProcessed) => {
			if (gameProcessed) return;
			this.handleInput(input);
		});
	}

	/* Handle Input */
	private handleInput(input: InputObject) {
		// Example: dash ability when LeftShift is pressed

		switch (input.KeyCode) {
			case Enum.KeyCode.LeftShift:
				this.tryDash();
				break;
			case Enum.KeyCode.Space:
				this.tryMultiJump();
				break;
			case Enum.KeyCode.F:
				this.tryFly();
			// Add more input handlers here
		}
	}

	/* Multi Jump - Try */
	private tryMultiJump() {
		/* Validate state and remaining jumps*/
		if (this.currentState !== MovementState.Normal) return;
		if (this.numJumps <= 0) return;

		/* Decrement jump count */
		this.numJumps--;

		/* Set state */
		this.currentState = MovementState.MultiJump;

		/* Perform multi jump */
		this.performMultiJump();

		/* Reset state after dash duration or cooldown */
		task.delay(1, () => {
			this.currentState = MovementState.Normal;
		});
	}

	/* Multi Jump - Perform */
	private performMultiJump() {
		if (!this.character || !this.humanoid) return;

		Logger.Log(script, "Multi Jump: " + this.numJumps);
	}

	/* Fly - Try */
	private tryFly() {
		/* Validate state */
		if (this.currentState !== MovementState.Normal) return;
		this.currentState = MovementState.Flying;

		/* Perform fly */
		this.performFly();

		// Reset state after dash duration or cooldown
		task.delay(1, () => {
			this.currentState = MovementState.Normal;
		});
	}

	/* Fly - Perform */
	private performFly() {
		if (!this.character || !this.humanoid) return;
		this.currentState = MovementState.Flying;
		Logger.Log("MovementController", "Fly!");
	}

	/* Dash - Try */
	private tryDash() {
		if (this.currentState !== MovementState.Normal) return;
		this.currentState = MovementState.Dashing;
		this.performDash();

		// Reset state after dash duration or cooldown
		task.delay(1, () => {
			this.currentState = MovementState.Normal;
		});
	}

	/* Dash - Perform */
	private performDash() {
		if (!this.character || !this.humanoid) return;

		const hrp = this.character.WaitForChild("HumanoidRootPart") as BasePart;
		// Here you’d implement your dash logic (animation, sound, movement)
		// For example:
		print("Dashing!");
		// You can call your dash animation/sound logic here.
	}
}
