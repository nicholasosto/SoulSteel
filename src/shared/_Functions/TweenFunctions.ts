import { TweenService } from "@rbxts/services";
import INPCCharacter from "shared/_Interfaces/INPCCharacter";
import IPlayerCharacter from "shared/_Interfaces/IPlayerCharacter";
import BaseProjectile from "shared/Factories/Projectile Factory/Projectiles/BaseProjectile";
import Logger from "shared/Utility/Logger";

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

function TweenRotate(model: Model, rotationDegX: number = 0, rotationDegY: number = 0, rotationDegZ: number = 0) {
	if (model === undefined || model.PrimaryPart === undefined) {
		Logger.Log("TweenError", "TweenRotate", "Model or PrimaryPart is undefined");
		return;
	}
	const _tweenInfo = new TweenInfo(0.5, Enum.EasingStyle.Linear, Enum.EasingDirection.Out, 0, false);
	const tween = TweenService.Create(model.PrimaryPart, _tweenInfo, {
		CFrame: model.PrimaryPart.CFrame.mul(
			CFrame.Angles(math.rad(rotationDegX), math.rad(rotationDegY), math.rad(rotationDegZ)),
		),
	});
	tween.Play();

	//const tween = TweenService.Create(model, DEFAULT_TWEEN_INFO, { : rotation });
}

function TweenShoot(basePart: BasePart, target: CFrame, velocitySPS: number) {
	/* Check if the basePart is valid */
	if (basePart === undefined) {
		Logger.Log("TweenError", "TweenShoot", "BasePart is undefined");
		return;
	}

	/* Calculate the distance between the two parts */
	const distance = basePart.Position.sub(target.Position);

	/* Calculate the duration of the tween */
	const duration = distance.Magnitude / velocitySPS;

	/* Tween Info */
	const tInfo = new TweenInfo(duration, Enum.EasingStyle.Linear, Enum.EasingDirection.Out, 0, false);

	/* Create the Tween */
	const tween = TweenService.Create(basePart, tInfo, { CFrame: target });

	/* Play the Tween */
	tween.Play();
}

function TweenCollide(basePart1: BasePart, basePart2: BasePart, velocitySPS: number) {
	/* Check if both parts are valid */
	if (basePart1 === undefined || basePart2 === undefined) {
		return;
	}

	/* Calculate the distance of the tween */
	const distance = basePart1.Position.sub(basePart2.Position);
	const duration = distance.Magnitude / velocitySPS;

	/* Tween Info */
	const _info = new TweenInfo(duration, Enum.EasingStyle.Linear, Enum.EasingDirection.Out, 0, false);

	/* Goal Position */
	const goalPosition = basePart1.Position.add(distance);

	/* Create the Tweens */
	const tween1 = TweenService.Create(basePart1, _info, { Position: goalPosition.mul(-1) });
	const tween2 = TweenService.Create(basePart2, _info, { Position: goalPosition });

	/* Play the Tweens */
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
