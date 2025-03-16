type GameItemState = "Normal" | "Hover" | "Pressed" | "Disabled" | "Selected";

export default class GuiStateComponent {
	private itemInstance: GuiObject;
	private state: GameItemState = "Normal";
	private attributeChangedConnection: RBXScriptConnection | undefined;
	constructor(itemInstatnce: GuiObject) {
		this.itemInstance = itemInstatnce;
		this.initialize();
		warn("GuiStateComponent: Initialized", this.itemInstance.GetAttribute("GameItemState"));
	}

	private initialize() {
		/* Set the default state of the item */
		this.itemInstance.SetAttribute("GameItemState", this.state);
		UpdateGameItemState(this.itemInstance, this.state);

		/* Listen for changes in the item state */
		this.attributeChangedConnection?.Disconnect();
		this.attributeChangedConnection = this.itemInstance.AttributeChanged.Connect((attributeName) => {
			if (attributeName === "GameItemState") {
				this.state = this.itemInstance.GetAttribute("GameItemState") as GameItemState;
				UpdateGameItemState(this.itemInstance, this.state);
			}
		});

		/* Add the state handlers */
	}

	public setState(newState: GameItemState) {
		print("Current State: ", this.state);
		print("Setting State: ", newState);
		this.itemInstance.SetAttribute("GameItemState", newState);
	}
}

// function AddStateHandlers(itemInstance: GuiObject, stateHandler: (newState: GameItemState) => void) {
// 	itemInstance.MouseEnter.Connect(() => {
// 		UpdateGameItemState(itemInstance, "Hover");
// 		stateHandler("Hover");
// 	});

// 	itemInstance.MouseLeave.Connect(() => {
// 		UpdateGameItemState(itemInstance, "Normal");
// 		stateHandler("Normal");
// 	});

// 	itemInstance.InputBegan.Connect((input) => {
// 		if (input.UserInputType === Enum.UserInputType.MouseButton1) {
// 			UpdateGameItemState(itemInstance, "Pressed");
// 			stateHandler("Pressed");
// 		}
// 	});

// 	itemInstance.InputEnded.Connect((input) => {
// 		if (input.UserInputType === Enum.UserInputType.MouseButton1) {
// 			UpdateGameItemState(itemInstance, "Selected");
// 			stateHandler("Selected");
// 		}
// 	});
// }

function UpdateGameItemState(itemInstance: GuiObject, newState: GameItemState) {
	/* Get the current state of the item */
	const currentState = itemInstance.GetAttribute("GameItemState") as GameItemState;

	if (currentState === undefined) {
		warn("GameItemState not found for item: ", itemInstance.Name);
		return;
	}

	/* If the item is disabled, do not update the state */
	if (currentState === "Disabled") {
		warn("Item is disabled: ", itemInstance.Name);
		return;
	}

	/* Update the Attribute state of the item */
	itemInstance.SetAttribute("GameItemState", newState);
	switch (newState) {
		case "Normal":
			print("Default: ", itemInstance.Name);
			break;
		case "Hover":
			print("Hovered: ", itemInstance.Name);
			break;
		case "Pressed":
			itemInstance.BackgroundColor3 = new Color3(30, 30, 30);
			print("Pressed: ", itemInstance.Name);
			break;
		case "Selected":
			itemInstance.BackgroundColor3 = new Color3(20, 20, 20);
			print("Selected: ", itemInstance.Name);
			break;
		case "Disabled":
			print("Disabled: ", itemInstance.Name);
			break;
	}
}
