// MultiJumpTrait.ts
import { IMovementTrait } from "shared/Traits/TraitIndex";
import Logger from "shared/Utility/Logger";

export class MultiJumpTrait implements IMovementTrait {
	private currentJumps = 0;
	private jumpConn?: RBXScriptConnection;
	private stateConn?: RBXScriptConnection;

	/**
	 * @param humanoid - The character's humanoid
	 * @param maxJumps - Total jumps allowed (e.g. 2 means one jump from the ground plus one mid-air jump)
	 */
	constructor(
		private humanoid: Humanoid,
		private maxJumps: number = 2,
	) {}

	public attach(): void {
		Logger.Log(script, "Attaching MultiJumpTrait");
		// Reset jump count when the humanoid lands

		this.stateConn?.Disconnect();
		this.stateConn = this.humanoid.StateChanged.Connect((_, newState) => {
			if (newState === Enum.HumanoidStateType.Landed || newState === Enum.HumanoidStateType.Running) {
				this.currentJumps = 0;
			}
		});

		this.jumpConn?.Disconnect();
		// Listen to the Jumping event.
		// (Note: Depending on your game, you may want to use ContextActionService or UserInputService to detect jump input.)
		this.jumpConn = this.humanoid.Jumping.Connect((active) => {
			// When jump starts…
			Logger.Log(script, "Jumping");
			if (active) {
				// If we are not on the ground (i.e. in mid-air), check if we can jump again.
				const state = this.humanoid.GetState();
				Logger.Log(
					script,
					`Current jumps: ${this.currentJumps} | State: ${state} | Max jumps: ${this.maxJumps}`,
				);
				if (state !== Enum.HumanoidStateType.Landed && state !== Enum.HumanoidStateType.Running) {
					if (this.currentJumps < this.maxJumps - 1) {
						this.currentJumps++;
						// To simulate a jump mid-air, manually apply a force in the upward direction.
						const vectorForce = new Instance("VectorForce");
						vectorForce.Force = new Vector3(0, 9999, 0);
						vectorForce.Parent = this.humanoid.Parent?.FindFirstChild("HumanoidRootPart") as BasePart;
						vectorForce.ApplyAtCenterOfMass = true;
						vectorForce.Attachment0 = vectorForce.Parent.FindFirstChild("RootRigAttachment") as Attachment;
						vectorForce.RelativeTo = Enum.ActuatorRelativeTo.Attachment0;

						vectorForce.Enabled = true;

						task.delay(0.2, () => {
							vectorForce.Enabled = false;
						});
					}
				}
				// If on the ground, let the Humanoid jump normally.
			}
		});
	}

	public detach(): void {
		if (this.jumpConn) {
			this.jumpConn.Disconnect();
			this.jumpConn = undefined;
		}
		if (this.stateConn) {
			this.stateConn.Disconnect();
			this.stateConn = undefined;
		}
	}
}
