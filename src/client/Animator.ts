import { Players } from "@rbxts/services";
import { AnimationIds } from "shared/_References/Indexes/AssetIndex";

export class CharacterAnimator {
	private _player: Player = Players.LocalPlayer;
	private _character: Model = this._player.Character || this._player.CharacterAdded.Wait()[0];
	private _humanoid: Humanoid = this._character.WaitForChild("Humanoid") as Humanoid;
	private _animator: Animator = this._humanoid.WaitForChild("Animator") as Animator;

	private _animationTracks: Map<string, AnimationTrack> = new Map<string, AnimationTrack>();

	constructor() {
		//this._initialize();
	}

	public PlayAnimation(animation: Animation) {
		//this._animator.PlayAnimation(animation);
	}

	public StartAnimation(animationName: string) {
		//this._animator.PlayAnimation(animation);
	}
}
