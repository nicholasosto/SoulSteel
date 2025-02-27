import { TweenService } from "@rbxts/services";

const DEFAULT_TWEEN_INFO = new TweenInfo(0.5, Enum.EasingStyle.Linear, Enum.EasingDirection.Out, 0, false);

function TweenScale(basePart: BasePart, scale: number, tweenInfo?: TweenInfo) {
	let _tweenInfo = tweenInfo;
	if (_tweenInfo === undefined) {
		_tweenInfo = DEFAULT_TWEEN_INFO;
	}
	if (basePart !== undefined) {
		const tween = TweenService.Create(basePart, _tweenInfo, { Size: basePart.Size.mul(scale) });
		tween.Play();
		return;
	}
}

function TweenRotate(model: Model, rotation: Vector3) {
	if (model === undefined) {
		return;
	}

	//const tween = TweenService.Create(model, DEFAULT_TWEEN_INFO, { : rotation });
}

function TweenShoot(basePart: BasePart, speed: number) {
	if (basePart !== undefined) {
		basePart.Velocity = basePart.CFrame.LookVector.mul(speed);
		return;
	}
}

export { TweenScale, TweenShoot, TweenRotate };
