//Types

import { Logger } from "shared/Utility/Logger";

// Animation
export type TAnimation = {
	[key: string]: Animation;
};

// Enums
export enum AnimationIds {
	MoonPartAnimation = "rbxassetid://82713683056632",
	SKILL_WCS_Slash = "rbxassetid://77799116860007",
	SKILL_BasicMelee = "rbxassetid://137879818226309",
	SKILL_BasicRanged = "rbxassetid://83501648864535",
	SKILL_BasicHold = "rbxassetid://105644658587176",
	MELEE_Backflip = "rbxassetid://96927531461522",
	MELEE_FastKick = "rbxassetid://126544239907410",
	MELEE_Dodge = "rbxassetid://15547507943",
	COMBAT_Damage = "rbxassetid://16158676664",
	FLIGHT_Backward = "rbxassetid://16467432682",
	FLIGHT_Left = "rbxassetid://16467350572",
	FLIGHT_Right = "rbxassetid://16467400519",
	FLIGHT_Up = "rbxassetid://16466802431",
	CHARACTER_Charging = "rbxassetid://16425019906",
	NPC_Idle = "rbxassetid://16579917477",
	NPC_Patrol = "rbxassetid://16579917495",
	NPC_Chase = "rbxassetid://94119052222051",
	NPC_Attack = "rbxassetid://16579917486",
}

// Helpers
export function CreateAnimation(animationId: AnimationIds): Animation {
	const animation = new Instance("Animation");
	Logger.Log(script, `AnimationId: ${animationId}`);
	animation.AnimationId = animationId;
	return animation;
}

export const CharacterAnimations: TAnimation = {
	// Basic Skills
	[AnimationIds.COMBAT_Damage]: CreateAnimation(AnimationIds.COMBAT_Damage),

	// Melee Animations
	[AnimationIds.MELEE_Backflip]: CreateAnimation(AnimationIds.MELEE_Backflip),
	[AnimationIds.MELEE_FastKick]: CreateAnimation(AnimationIds.MELEE_FastKick),
	[AnimationIds.MELEE_Dodge]: CreateAnimation(AnimationIds.MELEE_Dodge),

	// Character Animations
	[AnimationIds.CHARACTER_Charging]: CreateAnimation(AnimationIds.CHARACTER_Charging),

	// Flight Animations
	[AnimationIds.FLIGHT_Up]: CreateAnimation(AnimationIds.FLIGHT_Up),
	[AnimationIds.FLIGHT_Left]: CreateAnimation(AnimationIds.FLIGHT_Left),
	[AnimationIds.FLIGHT_Right]: CreateAnimation(AnimationIds.FLIGHT_Right),
	[AnimationIds.FLIGHT_Backward]: CreateAnimation(AnimationIds.FLIGHT_Backward),
};

export function CreateAnimationTrack(character: Model, animationId: AnimationIds): AnimationTrack {
	const animation = CreateAnimation(animationId);
	const Humanoid = character.FindFirstChild("Humanoid");
	const characterAnimator = Humanoid?.FindFirstChild("Animator") as Animator;
	assert(characterAnimator, "Animator not found");
	const animationTrack = characterAnimator.LoadAnimation(animation);
	animationTrack.Looped = false;
	return animationTrack;
}
