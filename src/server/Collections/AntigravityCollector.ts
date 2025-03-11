import { CollectionService, Workspace } from "@rbxts/services";
import Logger from "shared/Utility/Logger";

const CollectionTag = "Antigravity";

function OnAntigravityAdded(part: BasePart) {
	/* Create the fire */
	const fire = new Instance("Fire");
	fire.Parent = part;
	fire.Size = 5;
	fire.Heat = 10;
	fire.Color = Color3.fromRGB(0, 255, 255);
	fire.SecondaryColor = Color3.fromRGB(0, 0, 255);
	fire.Enabled = true;

	/* Create the Vector Force */
	const vectorForce = new Instance("VectorForce");
	vectorForce.Name = "AntigravityForce";
	vectorForce.Parent = part;

	/* Get the Mass of the Assembly */
	const mass = part.AssemblyMass;

	/* Multiply the Vector Force by the Mass */
	vectorForce.Force = new Vector3(0, mass * 196.2 + 3, 0);
	vectorForce.Attachment0 = part.FindFirstChildWhichIsA("Attachment") as Attachment;
	vectorForce.RelativeTo = Enum.ActuatorRelativeTo.World;
	vectorForce.Enabled = true;
}

export function StartCollectingAntigravity() {
	CollectionService.GetInstanceAddedSignal(CollectionTag).Connect((part) => {
		const basePart = part as BasePart;
		OnAntigravityAdded(basePart);
	});

	CollectionService.GetInstanceRemovedSignal(CollectionTag).Connect((part) => {
		part.FindFirstChildOfClass("Fire")?.Destroy();
		part.FindFirstChild("AntigravityForce")?.Destroy();
	});
}
