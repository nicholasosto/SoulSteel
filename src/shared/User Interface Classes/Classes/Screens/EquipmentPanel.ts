import { CollectionService } from "@rbxts/services";
import { EquipmentConfiguration } from "shared/_IDs/EquipmentIndex";
import GUIStateComponent from "shared/State/GUI State/GUIStateComponent";
import GameScreenBase from "./GameScreenBase";

export default class EquipmentPanel extends GameScreenBase {
	private _guiComponents: Map<string, GUIStateComponent> = new Map();
	private _slotMap: Map<string, Frame> = new Map();
	private _itemGrid: Frame | undefined;
	private _gridItems: Map<string, Frame> = new Map();

	constructor(screenGUI: ScreenGui) {
		super(screenGUI);
		task.wait(0.4);
		this._itemGrid = this._screenGUI.FindFirstChild("ItemGrid", true) as Frame | undefined;
		this.initializeComponents();
	}

	public setState(componentName: string, state: string) {
		const component = this._guiComponents.get(componentName);
		component?.setState(state);
	}

	private initializeComponents() {
		this._slotMap.set("Head", (this._screenGUI.WaitForChild("HeadSlotObj") as ObjectValue).Value as Frame);
		this._slotMap.set("Chest", (this._screenGUI.WaitForChild("ChestSlotObj") as ObjectValue).Value as Frame);

		this._guiComponents.set("Head", new GUIStateComponent(this._slotMap.get("Head") as Frame));
		this._guiComponents.get("Head")?.setCallback(() => {
			this._handleChestSlotClick();
		});
		this._guiComponents.set("Chest", new GUIStateComponent(this._slotMap.get("Chest") as Frame));
		this._guiComponents.get("Chest")?.setCallback(() => {
			this._handleChestSlotClick();
		});
		print("EquipmentPanel: Initialized");
	}

	private _StartCollectionService() {
		/* Connection to ArmorAdded */
	}


	private _handleChestSlotClick() {
		print("Chest Slot Clicked");
		/*Get Grid items available */
	}

	private _handleHeadSlotClick() {
		print("Head Slot Clicked");
	}
}
