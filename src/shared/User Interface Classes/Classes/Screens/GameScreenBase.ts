export default class GameScreenBase {
	protected _screenGUI: ScreenGui;

	constructor(screenGUI: ScreenGui) {
		this._screenGUI = screenGUI;
	}

	public Enable() {
		this._screenGUI.Enabled = true;
	}
	public Disable() {
		this._screenGUI.Enabled = false;
	}
	public Toggle() {
		this._screenGUI.Enabled = !this._screenGUI.Enabled;
	}
	public IsEnabled(): boolean {
		return this._screenGUI.Enabled;
	}
	public GetScreenGUI(): ScreenGui {
		return this._screenGUI;
	}
}
