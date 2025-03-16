import { CollectionService, TweenService } from "@rbxts/services";

import Logger from "shared/Utility/Logger";

const PulseTweenTag = "PulseTransparency";

type TransparentTweenConfig = Configuration & {
	Parent: TweenableTransparent;
	Duration: NumberValue;
	Amount: NumberValue;
	Repeat: BoolValue;
};

type TweenableTransparent =
	| BasePart // covers Part, MeshPart, UnionOperation, etc.
	| Decal // supports tweening of the Transparency property
	| Texture; // for SurfaceTexture objects

// | CanvasGroup; // tween GroupTransparency to affect all child UI elements at once

function OnPulseTweenAdd(configObject: TransparentTweenConfig) {
	if (configObject.FindFirstAncestor("ReplicatedStorage")) {
		Logger.Log("TransparentTween", "Skipping", configObject.Name);
		return;
	}

	Logger.Log("TransparentTween", "Transparent" + configObject.Parent.Name);
	const instance = configObject.Parent as Part;
	const duration = configObject.Duration.Value;
	const transparency = configObject.Amount.Value;
	const repeating = configObject.Repeat.Value;
	const tweenInfo = new TweenInfo(duration, Enum.EasingStyle.Linear, Enum.EasingDirection.Out, -1, repeating);
	const pulseTween = TweenService.Create(instance, tweenInfo, { Transparency: transparency });


	pulseTween.Play();
}

function CollectTransparencyTweens() {
	CollectionService.GetTagged(PulseTweenTag).forEach((configChild) => {
		OnPulseTweenAdd(configChild as TransparentTweenConfig);
	});
	CollectionService.GetInstanceAddedSignal(PulseTweenTag).Connect((configChild) => {
		OnPulseTweenAdd(configChild as TransparentTweenConfig);
	});

	CollectionService.GetInstanceRemovedSignal(PulseTweenTag).Connect((configChild) => {
		Logger.Log("TransparentTween", "Removed", configChild.Name);
	});
}

export { CollectTransparencyTweens };
