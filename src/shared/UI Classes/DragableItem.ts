import { Players } from "@rbxts/services";
import DefinitionsManager from "shared/Storage/DefinitionsManager";
import StorageManager from "shared/Storage/StorageManager";
import IItemDefinition from "shared/_Interfaces/IItemDefinition";
import Logger from "shared/Utility/Logger";
import ISkillDefinition from "shared/_Interfaces/ISkillDefinition";
import { SkillId } from "shared/_IDs/IDs_Skill";

class DragableItem {
	/* References */
	private _clonedInstance: ImageLabel | undefined;
	private _playerMouse = Players.LocalPlayer.GetMouse();
	private _playerGui = Players.LocalPlayer.WaitForChild("PlayerGui") as PlayerGui;
	private _dropTarget: Frame | undefined;

	/* Data */
	public ItemData: ISkillDefinition;

	/* Instances */
	public ItemInstance: ImageLabel = StorageManager.CloneFromStorage("DragableItemTemplate") as ImageLabel;
	public DragDetector: UIDragDetector = this.ItemInstance.WaitForChild("UIDragDetector") as UIDragDetector;
	private _uiStroke: UIStroke = new Instance("UIStroke");

	/* Connections */
	private _dragStartConnection: RBXScriptConnection | undefined;
	private _dragContinueConnection: RBXScriptConnection | undefined;
	private _dragEndConnection: RBXScriptConnection | undefined;

	constructor(parent: Instance, itemId: SkillId) {
		/* Setup Item */
		this.ItemData = DefinitionsManager.GetSkillDefinition(itemId) as ISkillDefinition;
		this.ItemInstance.Parent = parent;
		this.ItemInstance.ZIndex = 10;
		this.ItemInstance.Image = this.ItemData.imageId;

		/* Setup UI Stroke */
		this._uiStroke.Color = Color3.fromRGB(255, 0, 0);
		this._uiStroke.Thickness = 2;
		this._uiStroke.Parent = this._playerGui;
		this._uiStroke.Enabled = true;

		/* Setup Drag Detector */
		this._setupEvents();
		Logger.Log(script, `Created dragable item: ${this.ItemData.displayName}`);
	}

	private _setupEvents() {
		/* Drag Start */
		this._dragStartConnection?.Disconnect();
		this._dragStartConnection = this.DragDetector.DragStart.Connect(() => {
			this._onDragStart();
		});

		/* Drag Continue */
		this._dragContinueConnection?.Disconnect();
		this._dragContinueConnection = this.DragDetector.DragContinue.Connect((position: Vector2) => {
			this._onDragContinue(position);
		});

		/* Drag End */
		this._dragEndConnection?.Disconnect();
		this._dragEndConnection = this.DragDetector.DragEnd.Connect((position: Vector2) => {
			this._onDragEnd(position);
		});
	}

	private _onDragStart() {
		// Create dragging clone
		this._clonedInstance = this._createDraggingClone();
		Logger.Log(script, "Mouse Position: ", this._playerMouse.X, this._playerMouse.Y);
		Logger.Log(
			script,
			"Drag Start - Cloned Instance: ",
			this._clonedInstance.AbsolutePosition as unknown as string,
		);
	}

	private _onDragContinue(position: Vector2) {
		if (!this._clonedInstance) {
			return;
		}
		this._clonedInstance.Position = UDim2.fromOffset(position.X, position.Y);

		/* Check if the mouse is over a drop target */
		const dropTargets = this._playerGui.GetGuiObjectsAtPosition(position.X, position.Y);
		dropTargets.forEach((guiObject) => {
			/* Check if the object is a slot */
			if (guiObject.Name.match("Slot")[0] !== undefined) {
				this.setDropTarget(guiObject as Frame);
				return;
			}
		});
	}

	private _onDragEnd(position: Vector2) {
		Logger.Log(script, "Drag ended - Target: ", this._dropTarget);
		// Handle drop
		this._clonedInstance?.Destroy();
	}

	private setDropTarget(target: Frame) {
		this._uiStroke.Parent = target;
		this._dropTarget = target;
	}

	private _createDraggingClone(): ImageLabel {
		const clone = this.ItemInstance.Clone();
		//clone.Size = new UDim2(0, 64, 0, 64);
		clone.BackgroundTransparency = 0.5;
		clone.ImageTransparency = 0.5;
		clone.AnchorPoint = new Vector2(0.5, 1.5);
		clone.Position = UDim2.fromOffset(this.ItemInstance.AbsolutePosition.X, this.ItemInstance.AbsolutePosition.Y);
		clone.ZIndex = 100;
		clone.Parent = this.ItemInstance.Parent?.Parent;
		return clone;
	}
}

export { DragableItem };
