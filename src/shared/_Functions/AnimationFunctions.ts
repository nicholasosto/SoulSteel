import { Character } from "@rbxts/wcs";
import { EAnimationID } from "../Animation/Enums";
import Logger from "shared/Utility/Logger";
import { TGameCharacter } from "shared/_Types/TGameCharacter";
import { SkillId } from "shared/_IDs/SkillIndex";

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

function CreateAnimationTrack(
	characterModel: TGameCharacter,
	animationID: EAnimationID,
	looped: boolean = false,
): AnimationTrack | undefined {
	if (characterModel === undefined) return;

	const animation = CreateAnimation(animationID);
	const animator = GetAnimator(characterModel);
	const animationTrack = animator?.LoadAnimation(animation);

	if (animationTrack === undefined) {
		Logger.Log(script, "Animation Track is nil");
		return;
	}
	animationTrack.Looped = looped;
	return animationTrack;
}

function GetAnimationForSkillId(skillId: SkillId): EAnimationID {
	switch (skillId) {
		case "BasicMelee":
			return EAnimationID.BasicMelee;
		case "BasicRanged":
			return EAnimationID.BasicRanged;
		case "BasicHold":
			return EAnimationID.BasicHold;
		case "HallowHold":
			return EAnimationID.HallowHold;
		default:
			return EAnimationID.MoonPartAnimation;
	}
}

/* Create Animation Map */
function CreateAnimationMap(model: TGameCharacter, skillList: SkillId[]): Map<SkillId, AnimationTrack> {
	const animationMap = new Map<SkillId, AnimationTrack>();
	skillList.forEach((skill) => {
		const animationTrack = CreateAnimationTrack(model, GetAnimationForSkillId(skill));
		if (animationTrack) {
			animationMap.set(skill, animationTrack);
		}
	});

	return animationMap;
}

export { GetAnimator, CreateAnimation, CreateAnimationTrack, CreateAnimationMap };
