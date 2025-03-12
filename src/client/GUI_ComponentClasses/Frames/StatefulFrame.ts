import { TweenService } from "@rbxts/services";
import { Remotes } from "shared/net/Remotes";
import Logger from "shared/Utility/Logger";

export enum ButtonState {
	Default,
	Hovered,
	Pressed,
	Disabled,
}

const HoverTweenInfo = new TweenInfo(0.1, Enum.EasingStyle.Quad, Enum.EasingDirection.Out);

export default class StatefulFrame {
	private statefulFrame: Frame;
	private currentState: ButtonState;
	private hoverTween?: Tween;

	constructor(button: Frame) {
		this.statefulFrame = button;
		this.currentState = ButtonState.Default;

		this.setupListeners();
		this.updateVisualState();
	}

	private setupListeners() {
		this.statefulFrame.MouseEnter.Connect(() => this.setState(ButtonState.Hovered));
		this.statefulFrame.MouseLeave.Connect(() => this.setState(ButtonState.Default));
		this.statefulFrame.InputBegan.Connect(() => this.setState(ButtonState.Pressed));
		this.statefulFrame.InputEnded.Connect(() => this.setState(ButtonState.Hovered));
	}

	public setState(newState: ButtonState) {
		if (this.currentState === ButtonState.Disabled) return;

		this.currentState = newState;
		this.updateVisualState();
	}

	public disable() {
		this.currentState = ButtonState.Disabled;
		this.updateVisualState();
	}

	public enable() {
		this.currentState = ButtonState.Default;
		this.updateVisualState();
	}

	private updateVisualState() {
		switch (this.currentState) {
			case ButtonState.Default:
				this.statefulFrame.BackgroundColor3 = new Color3(50, 50, 50);
				this.statefulFrame.Transparency = 0;
				this.statefulFrame.Active = true;

				this.resetSize();
				break;

			case ButtonState.Hovered:
				this.statefulFrame.BackgroundColor3 = new Color3(70, 70, 70);
				this.animateSize(new UDim2(1.05, 0, 1.05, 0));
				break;

			case ButtonState.Pressed:
				this.statefulFrame.BackgroundColor3 = new Color3(30, 30, 30);
				this.animateSize(new UDim2(0.95, 0, 0.95, 0));
				break;

			case ButtonState.Disabled:
				this.statefulFrame.BackgroundColor3 = new Color3(40, 40, 40);
				this.statefulFrame.Transparency = 0.5;
				this.statefulFrame.Active = false;

				this.resetSize();
				break;
		}
	}

	private animateSize(targetSize: UDim2) {
		this.hoverTween?.Cancel(); // Stop previous tween if running
		this.hoverTween = TweenService.Create(this.statefulFrame, HoverTweenInfo, { Size: targetSize });
		this.hoverTween.Play();
	}

	private resetSize() {
		this.animateSize(new UDim2(1, 0, 1, 0));
	}
}
