import { TweenService } from "@rbxts/services";

export enum GameItemFrameState {
	Default,
	Hovered,
	Pressed,
	Disabled,
	Selected,
}

const HoverTweenInfo = new TweenInfo(0.1, Enum.EasingStyle.Quad, Enum.EasingDirection.Out);

export default class StatefulFrame {
	private statefulFrame: Frame;
	private currentState: GameItemFrameState;
	private hoverTween?: Tween;
	private defaultSize: UDim2;
	private hoverSize: UDim2;

	constructor(button: Frame) {
		this.statefulFrame = button;
		this.currentState = GameItemFrameState.Default;
		this.defaultSize = button.Size;
		this.hoverSize = button.Size.add(new UDim2(0, 3, 0, 3));

		this.setupListeners();
		this.updateVisualState();
	}

	private setupListeners() {
		this.statefulFrame.MouseEnter.Connect(() => this.setState(GameItemFrameState.Hovered));
		this.statefulFrame.MouseLeave.Connect(() => this.setState(GameItemFrameState.Default));
		this.statefulFrame.InputBegan.Connect((input) => {
			if (input.UserInputType === Enum.UserInputType.MouseButton1) {
				this.setState(GameItemFrameState.Pressed);
			}
		});
		this.statefulFrame.InputEnded.Connect((input) => {
			if (input.UserInputType === Enum.UserInputType.MouseButton1) {
				this.setState(GameItemFrameState.Selected);
			}
		});
	}

	public setState(newState: GameItemFrameState) {
		if (this.currentState === GameItemFrameState.Disabled) return;

		this.currentState = newState;
		this.updateVisualState();
	}

	public disable() {
		this.currentState = GameItemFrameState.Disabled;
		this.updateVisualState();
	}

	public enable() {
		this.currentState = GameItemFrameState.Default;
		this.updateVisualState();
	}

	private updateVisualState() {
		switch (this.currentState) {
			case GameItemFrameState.Default:
				print("Default: ", this.statefulFrame.Name);
				this.resetSize();
				break;

			case GameItemFrameState.Hovered:
				print("Hovered: ", this.statefulFrame.Name);
				this.animateSize();
				break;

			case GameItemFrameState.Pressed:
				this.statefulFrame.BackgroundColor3 = new Color3(30, 30, 30);
				this.animateSize();
				print("Pressed: ", this.statefulFrame.Name);
				break;

			case GameItemFrameState.Selected:
				this.statefulFrame.BackgroundColor3 = new Color3(20, 20, 20);
				print("Selected: ", this.statefulFrame.Name);
				break;
			case GameItemFrameState.Disabled:
				this.statefulFrame.BackgroundColor3 = new Color3(40, 40, 40);
				this.statefulFrame.Transparency = 0.5;
				this.statefulFrame.Active = false;

				this.resetSize();
				break;
		}
	}

	private animateSize() {
		let goalSize: UDim2;
		if (this.currentState === GameItemFrameState.Hovered) {
			goalSize = this.hoverSize;
		} else {
			goalSize = this.defaultSize;
		}
		this.hoverTween?.Cancel(); // Stop previous tween if running
		this.hoverTween = TweenService.Create(this.statefulFrame, HoverTweenInfo, { Size: goalSize });
		this.hoverTween.Play();
	}

	private resetSize() {
		this.animateSize();
	}
}
