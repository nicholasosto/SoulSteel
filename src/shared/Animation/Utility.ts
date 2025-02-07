import { Character } from "@rbxts/wcs";
import { EAnimationID } from "./AnimationIndex";
import Logger from "shared/Utility/Logger";

function GetAnimator(instanceToAnimate: Model | Character, fast: boolean = false): Animator | undefined {
	const model = instanceToAnimate instanceof Character ? instanceToAnimate.Instance : instanceToAnimate;
	assert(model.IsA("Model"), "Character is not a Model");

	if (fast) {
		return model.FindFirstChild("Humanoid")?.FindFirstChild("Animator") as Animator;
	}

	const humanoid = model.WaitForChild("Humanoid") as Humanoid;
	const animator = humanoid.WaitForChild("Animator") as Animator;
	return animator;
}

function CreateAnimation(animationID: EAnimationID): Animation {
	Logger.Log(script, "Create Animation", animationID);
	const animation = new Instance("Animation");
	animation.Name = animationID;
	animation.AnimationId = animationID;
	return animation;
}

function CreateAnimationTrack(character: Character, animationID: EAnimationID): AnimationTrack | undefined {
	const characterModel = character.Instance as Model;
	if (characterModel === undefined) return;

	const animation = CreateAnimation(animationID);
	const animator = GetAnimator(characterModel);
	const animationTrack = animator?.LoadAnimation(animation);
	if (animationTrack === undefined) {
		Logger.Log(script, "Animation Track is nil");
		return;
	}

	return animationTrack;
}

export { GetAnimator, CreateAnimation, CreateAnimationTrack };
