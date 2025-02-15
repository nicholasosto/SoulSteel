import { CollectionService, TweenService } from "@rbxts/services";
import Logger from "shared/Utility/Logger";

const CollectionTag = "Lava";
const TextureTweenInfo = new TweenInfo(1, Enum.EasingStyle.Linear, Enum.EasingDirection.InOut, -1, true, 0);

function OnLavaAdded(lava: Texture) {
	const goal = {
		OffsetStudsU: lava.OffsetStudsU + 1,
	};

	const tween = TweenService.Create(lava, TextureTweenInfo, goal);

	tween.Play();

    Logger.Log(script, "Lava Added", lava.Name);
}

export function StartCollectingLava() {
	CollectionService.GetTagged(CollectionTag).forEach((lava) => {
		OnLavaAdded(lava as Texture);
	});
	CollectionService.GetInstanceAddedSignal(CollectionTag).Connect((lava) => {
		OnLavaAdded(lava as Texture);
	});

	CollectionService.GetInstanceRemovedSignal(CollectionTag).Connect((lava) => {
		Logger.Log(script, "Lava Removed", lava.Name);
	});
}
