import { TGameCharacter } from "shared/_Types/TGameCharacter";
import { Debris } from "@rbxts/services";

function addVectorForceToCharacter(character: TGameCharacter, force: Vector3, duration: number): VectorForce {
	const vectorForce = character.HumanoidRootPart.FindFirstChildWhichIsA("VectorForce") || new Instance("VectorForce");
	vectorForce.Force = force;
	vectorForce.Parent = character.HumanoidRootPart;
	vectorForce.Attachment0 = character.HumanoidRootPart.RootAttachment;
	task.wait(0.1);
	vectorForce.Enabled = true;
	task.delay(duration, () => {
		vectorForce.Enabled = false;
	});

	return vectorForce;
}

export { addVectorForceToCharacter };
