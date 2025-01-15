import { Logger } from "shared/Utility/Logger";
import { CreateAnimation, GetAnimator, EAnimationID } from "shared/Animation/AnimationIndex";

export default class WCSCharacterAnimator {
	private _animator: Animator;
	private _animationTracks: Map<EAnimationID, AnimationTrack> = new Map();

	constructor(character: Model) {
		this._animator = GetAnimator(character) as Animator;
	}

	// Add Animation Track
	public AddAnimationTrack(animationID: EAnimationID): void {
		const animationTrack = this._animator.LoadAnimation(CreateAnimation(animationID));
		this._animationTracks.set(animationID, animationTrack);
	}

	// Play Animation
	public Play(animationID: EAnimationID): void {
		this.StopAll();
		const animationTrack = this._animationTracks.get(animationID);
		assert(animationTrack, "Animation Track not found");
		animationTrack.Play();
	}

	// Stop Animation
	public Stop(animationID: EAnimationID): void {
		const animationTrack = this._animationTracks.get(animationID);
		assert(animationTrack, "Animation Track not found");
		animationTrack.Stop();
	}

	// Stop All Animations
	public StopAll(): void {
		this._animationTracks.forEach((track) => {
			track.Stop();
		});
	}

	// Destroy
	public Destroy() {
		this._animationTracks.forEach((animationTrack, animationID) => {
			animationTrack.Destroy();
			this._animationTracks.delete(animationID);
		});
	}
}
