import { TDialog } from "shared/Epic UI/DialogFrame/Dialog_Template";
import { EEpicUIAttributes } from "shared/Epic UI/EpicInterfaces";
import StorageManager from "shared/Storage Manager/StorageManager";
import Logger from "shared/Utility/Logger";

export class Dialog {
	// Main Template
	private _dialogFrame: TDialog = StorageManager.CloneFromStorage("Dialog_Template") as TDialog;

	// Text Content
	private _dialogTextBox: Frame;
	private _dialogTitle: Frame;

	// Buttons
	private _closeButton: ImageButton;
	private _button1: TextButton;
	private _button2: TextButton;
	private _title?: string;
	private _message?: string;

	// Connections
	private _connectionButton1: RBXScriptConnection | undefined;
	private _connectionButton2: RBXScriptConnection | undefined;
	private _connectionClose: RBXScriptConnection | undefined;

	constructor(
		dialogTemplate: TDialog,
		title: string,
		parent: Instance,
		button1Name: string,
		button2Name: string,
		message: string,
	) {
		// Clone and Parent the Dialog Template
		this._dialogFrame = dialogTemplate.Clone();
		this._dialogFrame.Parent = parent;

		// Text Content Title and Message
		this._dialogTextBox = this._dialogFrame.Content.Body;
		this._dialogTitle = this._dialogFrame.Content.Header.Title;

		// Button References
		this._closeButton = this._dialogFrame.Close.ImageButton;
		this._button1 = this._dialogFrame.Content.Footer.TextButton1;
		this._button2 = this._dialogFrame.Content.Footer.TextButton2;

		// Setup Dialog
		this._setupButtons(button1Name, button2Name);
		this.SetText(title, message);
	}

	// Set up the buttons
	protected _setupButtons(button1Name: string, button2Name: string) {
		// Set Button Text
		this._button1.SetAttribute("TextValue", button1Name);
		this._button2.SetAttribute("TextValue", button2Name);
		// Button 1 Click
		this._connectionButton1 = this._button1.Activated.Connect(() => {
			this.handleButton1Click();
		});

		// Button 2 Click
		this._connectionButton2 = this._button2.Activated.Connect(() => {
			this.handleButton2Click();
		});

		// Close Button Click
		this._connectionClose = this._closeButton.Activated.Connect(() => {
			this.Hide();
		});
	}

	// Button Click Handlers
	protected handleButton1Click() {
		Logger.Log(script, "Button 1 Clicked");
		this.Hide();
	}
	protected handleButton2Click() {
		Logger.Log(script, "Button 2 Clicked");
		this.Hide();
	}

	// Update the Dialog Title and Message
	public SetText(title: string, message: string) {
		this._title = title;
		this._message = message;
		this._dialogTitle.SetAttribute("TextValue", title);
		this._dialogTextBox.SetAttribute("TextValue", message);
	}

	// Show and Hide Dialog
	public Show() {
		this._dialogFrame.Visible = true;
	}

	public Hide() {
		this._dialogFrame.Visible = false;
	}

	// Destroy Connections
	private destroyConnections() {
		this._connectionButton1?.Disconnect();
		this._connectionButton2?.Disconnect();
		this._connectionClose?.Disconnect();
	}

	// Destroy the Dialog
	public Destroy() {
		this.destroyConnections();
		this._dialogFrame.Destroy();
	}
}
