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

export default class StatefulButton {
	private button: TextButton;
	private currentState: ButtonState;
	private hoverTween?: Tween;

	private _gameStateListener?: RBXScriptConnection;

	constructor(button: TextButton) {
		this.button = button;
		this.currentState = ButtonState.Default;

		this.setupListeners();
		this.updateVisualState();
	}

	private setupListeners() {
		this.button.MouseEnter.Connect(() => this.setState(ButtonState.Hovered));
		this.button.MouseLeave.Connect(() => this.setState(ButtonState.Default));
		this.button.MouseButton1Down.Connect(() => this.setState(ButtonState.Pressed));
		this.button.MouseButton1Up.Connect(() => this.setState(ButtonState.Hovered));
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
				this.button.BackgroundColor3 = new Color3(50, 50, 50);
				this.button.TextTransparency = 0;
				this.button.Active = true;

				this.resetSize();
				break;

			case ButtonState.Hovered:
				this.button.BackgroundColor3 = new Color3(70, 70, 70);
				this.animateSize(new UDim2(1.05, 0, 1.05, 0));
				break;

			case ButtonState.Pressed:
				this.button.BackgroundColor3 = new Color3(30, 30, 30);
				this.animateSize(new UDim2(0.95, 0, 0.95, 0));
				break;

			case ButtonState.Disabled:
				this.button.BackgroundColor3 = new Color3(40, 40, 40);
				this.button.TextTransparency = 0.5;
				this.button.Active = false;

				this.resetSize();
				break;
		}
	}

	private animateSize(targetSize: UDim2) {
		this.hoverTween?.Cancel(); // Stop previous tween if running
		this.hoverTween = TweenService.Create(this.button, HoverTweenInfo, { Size: targetSize });
		this.hoverTween.Play();
	}

	private resetSize() {
		this.animateSize(new UDim2(1, 0, 1, 0));
	}
}
