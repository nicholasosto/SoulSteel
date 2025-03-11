import { ImageIds } from "shared/_Enums/EImageId";
import StorageManager from "shared/Storage/StorageManager";
import Logger from "shared/Utility/Logger";

type TSelectButton = Frame & {
	UIStroke: UIStroke;
	TextLabelObj: ObjectValue;
	ImageLabelObj: ObjectValue;
	TextButton: TextButton;
};

export default class SelectButton {
	public SelectButtonId: string;
	private _TSelectButton: TSelectButton = StorageManager.CloneFromStorage("TSelectButtonTemplate") as TSelectButton;
	private _textLabel: TextLabel = this._TSelectButton.TextLabelObj.Value as TextLabel;
	private _imageLabel: ImageLabel = this._TSelectButton.ImageLabelObj.Value as ImageLabel;
    public _activate;

	constructor(buttonId: string, parent: GuiObject, buttonHandler?: (buttonId: string) => void) {
		this.SelectButtonId = buttonId;

		assert(this._imageLabel.IsA("ImageLabel"), "ImageLabel is not an ImageLabel");
		assert(this._textLabel.IsA("TextLabel"), "TextLabel is not a TextLabel");

		this._TSelectButton.UIStroke.Enabled = false;
		this._textLabel.Text = this.SelectButtonId;
		this._imageLabel.Image = ImageIds.AngelArmor;

		/* Set Parent */
		this._TSelectButton.Parent = parent;

		this._activate = this._TSelectButton.TextButton.MouseButton1Click;
	}
}
