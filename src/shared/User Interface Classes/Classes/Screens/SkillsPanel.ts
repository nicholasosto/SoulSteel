import GUIStateComponent from "shared/State/GUI State/GUIStateComponent";
import GameScreenBase from "./GameScreenBase";

export default class SkillsPanel extends GameScreenBase {
	private _guiComponents: Map<string, GUIStateComponent> = new Map();
	private _slotMap: Map<string, Frame> = new Map();

	constructor(screenGUI: ScreenGui) {
		super(screenGUI);
		this.initializeComponents();
	}

	public setState(componentName: string, state: string) {
		const component = this._guiComponents.get(componentName);
		component?.setState(state);
	}

	private initializeComponents() {
		//this._slotMap.set("Slot_1", (this._screenGUI.WaitForChild("Slot_1") as ObjectValue).Value as Frame);
		//this._slotMap.set("Slot_2", (this._screenGUI.WaitForChild("Slot2") as ObjectValue).Value as Frame);

		//this._guiComponents.set("Slot1", new GUIStateComponent("Head", this._slotMap.get("Head") as Frame));
		//this._guiComponents.set("Chest", new GUIStateComponent("Chest", this._slotMap.get("Chest") as Frame));
		print("SkillPanel: Initialized");
	}

}
