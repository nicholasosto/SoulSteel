import { TweenService } from "@rbxts/services";
import INPCCharacter from "shared/_Interfaces/INPCCharacter";
import IPlayerCharacter from "shared/_Interfaces/IPlayerCharacter";
import BaseProjectile from "shared/Factories/Projectile Factory/Projectiles/BaseProjectile";

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

function TweenShoot(basePart: BasePart, target: CFrame, duration: number) {
	if (basePart === undefined) {
		return;
	}
	const tInfo = new TweenInfo(duration, Enum.EasingStyle.Linear, Enum.EasingDirection.Out, 0, false);
	const tween = TweenService.Create(basePart, tInfo, { CFrame: target });
	tween.Play();
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

function TweenPulseTransparency(basePart: BasePart, duration: number) {
	if (basePart === undefined) {
		return;
	}
	const _info = new TweenInfo(duration, Enum.EasingStyle.Linear, Enum.EasingDirection.Out, 0, true);
	const tween = TweenService.Create(basePart, _info, { Transparency: 1 });
	tween.Play();
}

export { TweenScale, TweenRotate, TweenCollide, TweenShoot, TweenPulseTransparency };
