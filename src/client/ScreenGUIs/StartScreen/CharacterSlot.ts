import Logger from "shared/Utility/Logger";

export default class CharacterSlot {
	private _containerFrame: Frame;
	private _playLoadButton: TextButton;
	private _characterNameFrame: Frame;
	private _characterDescriptionFrame: Frame;
	private _progressBar: Frame;

	constructor(container: Frame) {
		this._containerFrame = container;
		const content = container.WaitForChild("Content");
		this._playLoadButton = content.WaitForChild("PlayLoad").WaitForChild("TextButton") as TextButton;
		this._characterNameFrame = content.WaitForChild("Text").WaitForChild("CharacterName") as Frame;
		this._characterDescriptionFrame = content.WaitForChild("Text").WaitForChild("Description") as Frame;
		this._progressBar = content.WaitForChild("Text").WaitForChild("Progress").WaitForChild("Progress Bar") as Frame;

		this._playLoadButton.Activated.Connect(() => this._onPlayLoadButtonClicked());
		Logger.Log("CharacterSlot", "Character Slot Initialized");
	}

	public SetDescription(description: string) {
		this._characterDescriptionFrame.SetAttribute("TextValue", description);
	}
	public SetCharacterName(name: string) {
		this._characterNameFrame.SetAttribute("TextValue", name);
	}
	public SetProgressLevel(progress: number) {
		this._progressBar.SetAttribute("BarPercent", progress);
	}

	private _onPlayLoadButtonClicked() {
		print("PlayLoad Button Clicked");
		const screenGui = this._containerFrame.FindFirstAncestorOfClass("ScreenGui") as ScreenGui;
		if (screenGui === undefined) return;

		screenGui.Enabled = false;
	}
}
