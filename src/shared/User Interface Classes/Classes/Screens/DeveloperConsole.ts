import GUIStateComponent from "shared/State/GUI State/GUIStateComponent";

export default class DeveloperConsole {
	private _screenGUI: ScreenGui;
	private _guiComponents: Map<string, GUIStateComponent> = new Map();

	constructor(screenGUI: ScreenGui) {
		this._screenGUI = screenGUI;

		/* Player Data */
		const playerDataObj = this._screenGUI.WaitForChild("PlayerDataObj") as ObjectValue;
		const PlayerDataInstance = playerDataObj?.Value as GuiObject;
		if (PlayerDataInstance === undefined) {
			warn("PlayerDataObj is undefined!");
			return;
		}

		/* Replicated Data */
		const ReplicatedDataObj = this._screenGUI.WaitForChild("ReplicatedDataObj") as ObjectValue;
		const ReplicatedDataInstance = ReplicatedDataObj.Value as GuiObject;
		if (ReplicatedDataInstance === undefined) {
			warn("ReplicatedDataObj is undefined!");
			return;
		}

		this._guiComponents.set("PlayerData", new GUIStateComponent(PlayerDataInstance));
		this._guiComponents.set("ReplicatedData", new GUIStateComponent(ReplicatedDataInstance));

		this.initializeComponents();
		print("DeveloperConsole: Initialized");
	}

	public setState(componentName: string, state: string) {
		const component = this._guiComponents.get(componentName);
		component?.setState(state);
	}

	private initializeComponents() {
		// const PlayerDataLoadedCheckbox = this._screenGUI.WaitForChild("DataLoadingSatus") as Frame;
		// const PlayerDataLoaded = new GUIStateComponent("PlayerDataLoadedCheckbox", PlayerDataLoadedCheckbox);
		// this._guiComponents.set("PlayerDataLoadedCheckbox", PlayerDataLoaded);
		//print("PlayerDataLoadedCheckbox Initialized", PlayerDataLoaded);
	}
}
