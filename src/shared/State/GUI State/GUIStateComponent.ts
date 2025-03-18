export default class GUIStateComponent {
	private instance: GuiObject;
	private mouseInside: boolean = false;
	private selected: boolean = false;

	private callback: () => void = () => {};

	/*connections*/
	private _enterConnection: RBXScriptConnection | undefined;
	private _leaveConnection: RBXScriptConnection | undefined;
	private _inputBeganConnection: RBXScriptConnection | undefined;
	private _inputEndedConnection: RBXScriptConnection | undefined;

	constructor(instance: GuiObject) {
		this.instance = instance;
		this.setupConnections();
	}

	private setupConnections() {
		/*Entering Hover State*/
		this._enterConnection?.Disconnect();
		this._enterConnection = this.instance.MouseEnter.Connect(() => {
			this.mouseInside = true;
			this.instance.AddTag("GUI_Hover");
		});

		/*Leaving Hover State*/
		this._leaveConnection?.Disconnect();
		this._leaveConnection = this.instance.MouseLeave.Connect(() => {
			this.mouseInside = false;
			this.instance.RemoveTag("GUI_Hover");
		});

		/*Input Began*/
		this._inputBeganConnection?.Disconnect();
		this._inputBeganConnection = this.instance.InputBegan.Connect((input) => {
			if (input.UserInputState === Enum.UserInputState.Begin) {
				this.instance.AddTag("GUI_Pressed");
			}
		});

		/*Input Ended*/
		this._inputEndedConnection?.Disconnect();
		this._inputEndedConnection = this.instance.InputEnded.Connect((input) => {
			this._HandleSelection();
		});
	}
	public setCallback(callback: () => void) {
		this.callback = callback;
	}
	public setState(state: string) {
		this.instance.AddTag(state);
	}
	private _HandleSelection() {
		if (this.mouseInside) {
			this.selected = !this.selected;
		} else {
			this.instance.RemoveTag("GUI_Pressed");
		}
		if (this.selected) {
			this.instance.AddTag("GUI_Selected");
			this.callback();
		} else {
			this.instance.RemoveTag("GUI_Selected");
		}
	}
}
