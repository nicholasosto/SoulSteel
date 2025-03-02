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

function TweenCollide(basePart1: BasePart, basePart2: BasePart, duration: number) {
	/* Check if both parts are valid */
	if (basePart1 === undefined || basePart2 === undefined) {
		return;
	}

	const _info = new TweenInfo(duration, Enum.EasingStyle.Linear, Enum.EasingDirection.Out, 0, false);

	/* Calculate the distance between the two parts */
	const distance = basePart1.Position.sub(basePart2.Position).div(2);
	const tween1 = TweenService.Create(basePart1, _info, { Position: basePart1.Position.sub(distance) });
	const tween2 = TweenService.Create(basePart2, _info, { Position: basePart1.Position.sub(distance) });
	tween1.Play();
	tween2.Play();
}

export { TweenScale, TweenRotate, TweenCollide };
