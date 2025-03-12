import Logger from "shared/Utility/Logger";
import { Players } from "@rbxts/services";
import { GUIPanelMap, TeleportScrollFrame } from "client/_Helpers/GUI_Index";
import SelectButton from "client/GUI_ComponentClasses/Buttons/SelectButton";
import StatefulButton, { ButtonState } from "client/GUI_ComponentClasses/Buttons/StatefulButton";

type TTeleportLocation = {
	LocationName: string;
	LocationId: string;
	LocationImage: string;
	LocationPivot: CFrame;
	LocationDescription: string;
};

const TeleportLocations: Array<TTeleportLocation> = [
	{
		LocationName: "Bloody River",
		LocationId: "ZBlood01",
		LocationImage: "rbxassetid://135950973087916",
		LocationPivot: new CFrame(-155, 291, -1725),
		LocationDescription: "Shiver me timbers, the Bloody River!",
	},
	{
		LocationName: "Mecha Factory",
		LocationId: "ZMecha01",
		LocationImage: "rbxassetid://128453888907363",
		LocationPivot: new CFrame(-155, 291, -1725),
		LocationDescription: "Zork-beebp, tzzzz, ttaaang!",
	},
];

/*Controller Events*/
export default class TeleportPanelController {
	/* Instance */
	private static _instance: TeleportPanelController;

	/* Teleport Panel*/
	private static _teleportPanel: ScreenGui = GUIPanelMap.get("Teleport") as ScreenGui;
	private static _teleportButtonMap: Map<string, SelectButton> = new Map();

	private static _selection: SelectButton | undefined;

	/* Constructor */
	private constructor() {
		Logger.Log("TeleportPanelController", "CONSTRUCTOR()");
	}

	/* Start */
	public static Start() {
		if (this._instance === undefined) {
			this._instance = new TeleportPanelController();

			this._initializeTeleportPanel();
		}
	}

	/* Initialize Select Buttons */

	private static _initializeTeleportPanel(): void {
		Logger.Log("TeleportPanelController", "Initializing Teleport Panel");

		TeleportLocations.forEach((location) => {
			const selectButton = new SelectButton(location.LocationName, TeleportScrollFrame);
			this._teleportButtonMap.set(location.LocationId, selectButton);
			selectButton._activate.Connect(() => this._handleSelectButton(location.LocationPivot));
		});
		const specialButtonInstance = new Instance("TextButton");
		specialButtonInstance.Name = "SpecialButton";
		specialButtonInstance.Size = new UDim2(0, 200, 0, 50);
		specialButtonInstance.Text = "Special Button";

		const specialButton = new StatefulButton(specialButtonInstance);
		specialButton.setState(ButtonState.Default);
	}

	private static _handleSelectButton(location: CFrame): void {
		Logger.Log("XXTeleportPanelController", `Teleporting to ${location}`);
		Players.LocalPlayer.Character?.PivotTo(location);
	}
}
