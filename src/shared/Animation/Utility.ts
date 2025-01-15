import { Character } from "@rbxts/wcs";
import { EAnimationID } from "./AnimationIndex";
import { Logger } from "shared/Utility/Logger";

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
	const animation = new Instance("Animation");
	animation.Name = animationID;
	animation.AnimationId = animationID;
	return animation;
}

function CreateAnimationTrack(character: Model, animationID: EAnimationID): AnimationTrack {
	const animation = CreateAnimation(animationID);
	const animator = GetAnimator(character);
	const animationTrack = animator?.LoadAnimation(animation);
	assert(animationTrack, "Animation Track not found");
	animationTrack.Looped = false;
	return animationTrack;
}

export { GetAnimator, CreateAnimation, CreateAnimationTrack };
