import { CollectionService, Players } from "@rbxts/services";

const tagName = "OnTouch_Humanoid";

export function StartCollectingOnTouchHumanoid() {
	const collection = CollectionService.GetTagged(tagName);

	for (const part of collection) {
		if (part.IsA("BasePart")) {
			print(`Humanoid Touch Added part 1: ${part.Name}`);
			part.Touched.Connect((touchingPart: BasePart) => {
				const characterModel = touchingPart.Parent as Model;
				const player = Players.GetPlayerFromCharacter(characterModel);
				if (player === undefined) return;

				if (touchingPart.Parent?.FindFirstChildOfClass("Humanoid")) {
					const humanoid = touchingPart.Parent.FindFirstChildOfClass("Humanoid") as Humanoid;
					if (humanoid === undefined) return;
					const otherDescription = part.FindFirstChildOfClass("HumanoidDescription") as HumanoidDescription;
					if (otherDescription === undefined) return;
					player.LoadCharacterWithHumanoidDescription(otherDescription);
				}
			});
		}
	}

	CollectionService.GetInstanceAddedSignal(tagName).Connect((part) => {
		print(`Humanoid Touch Added part 2: ${part.Name}`);
		if (part.IsA("BasePart")) {
			part.Touched.Connect((touchingPart: BasePart) => {
				if (touchingPart.IsA("Humanoid")) {
					print(`Touched by humanoid: ${touchingPart.Name}`);
				}
			});
		}
	});

	CollectionService.GetInstanceRemovedSignal(tagName).Connect((part) => {
		if (part.IsA("BasePart")) {
			print(`Removed part: ${part.Name}`);
		}
	});
}
