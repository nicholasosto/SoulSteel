import { CollectionService, TweenService } from "@rbxts/services";

/* GUI State Tags */
const GUIStateTags: string[] = ["GUI_Normal", "GUI_Hover", "GUI_Pressed", "GUI_Disabled", "GUI_Selected"];

/* GUI State Controller */
export default class GUIStateController {
	private static _instance: GUIStateController | undefined;

	/* Connections */
	private static connections: Partial<Record<string, RBXScriptConnection>> = {};

	/* Constructor */
	private constructor() {
		// Private constructor to prevent instantiation
	}

	/* Singleton Start Method */
	public static Start(): GUIStateController {
		if (this._instance === undefined) {
			this._instance = new GUIStateController();
			this.initializeStateHandlers();
		}
		return this._instance;
	}

	/* Initialize State Handlers */
	private static initializeStateHandlers() {
		for (const state of GUIStateTags) {
			this.connections[state] = CollectionService.GetInstanceAddedSignal(state).Connect((instance) => {
				const GUIObject = instance as GuiObject;
				if (GUIObject === undefined) {
					warn("GUIObject is undefined!");
					return;
				}
				this.HandleStateChange(GUIObject, state, true);
			});

			this.connections[`${state}_Removed`] = CollectionService.GetInstanceRemovedSignal(state).Connect(
				(instance) => {
					const GUIObject = instance as GuiObject;
					if (GUIObject === undefined) {
						warn("GUIObject is undefined!");
						return;
					}
					this.HandleStateChange(GUIObject, state, false);
				},
			);
		}
	}

	/* Switching States */
	private static HandleStateChange(guiInstance: GuiObject, state: string, entering: boolean) {
		// Handle the state change for the given instance

		switch (state) {
			case "GUI_Normal":
				this.NormalState(guiInstance, entering);
				break;
			case "GUI_Hover":
				this.HoverState(guiInstance, entering);
				break;
			case "GUI_Pressed":
				this.PressedState(guiInstance, entering);
				break;
			case "GUI_Disabled":
				this.DisabledState(guiInstance, entering);
				break;
			case "GUI_Selected":
				this.SelectedState(guiInstance, entering);
				break;
			default:
				// Handle unknown state
				print(`Unknown state: ${state}`);
				break;
		}
	}

	/* State Entry Functions */
	private static NormalState(instance: GuiObject, entering: boolean) {
		print(`Entering Normal State for ${instance.Name}`);
	}
	private static HoverState(instance: GuiObject, entering: boolean) {
		const hoverObject = (instance.FindFirstChild("HoverStateObj") as ObjectValue).Value as GuiObject;
		if ((hoverObject as GuiObject) === undefined) {
			warn("HoverStateObject is undefined!");
			return;
		}

		hoverObject.Visible = entering;
	}

	/* Pressed State */
	private static PressedState(instance: GuiObject, entering: boolean) {
		if (entering) {
			// Logic for entering pressed state
			print(`Entering Pressed State for ${instance.Name}`);
		} else {
			// Logic for exiting pressed state
			print(`Exiting Pressed State for ${instance.Name}`);
		}
	}

	/* Disabled State */
	private static DisabledState(instance: GuiObject, entering: boolean) {
		if (entering) {
			// Logic for entering disabled state
			print(`Entering Disabled State for ${instance.Name}`);
		} else {
			// Logic for exiting disabled state
			print(`Exiting Disabled State for ${instance.Name}`);
		}
	}

	/* Selected State */
	private static SelectedState(instance: GuiObject, entering: boolean) {
		const selectedObject = (instance.FindFirstChild("SelectedStateObj") as ObjectValue).Value as GuiObject;
		if ((selectedObject as GuiObject) === undefined) {
			warn("SelectedStateObject is undefined!");
			return;
		}
		selectedObject.Visible = entering;
	}
}
