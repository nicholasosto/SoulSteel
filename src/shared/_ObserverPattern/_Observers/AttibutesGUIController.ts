import { AttributesManager } from "shared/_ObserverPattern/_Subjects/AttributesSubject";
import IPlayerData from "shared/_Interfaces/Player Data/IPlayerData";
import { Remotes } from "shared/net/Remotes";

export default class AttributesGUIController {
	/* Singleton */
	private static instance: AttributesGUIController;

	/* Object References */
	private static ovFolder: Folder;
	private static availablePoints: TextLabel;
	private static spentPoints: TextLabel;
	private static resetButton: TextButton;
	private static saveButton: TextButton;

	/* Constructor */
	private constructor() {}

	/* Remotes and Subjects */
	private static attributeSubject: AttributesManager;
	private static _PlayerAttributesUpdated = Remotes.Client.Get("PlayerAttributesUpdated");

	/* Start */
	public static Start(gui: GuiObject, attributeSubject: AttributesManager) {
		if (this.instance === undefined) {
			this.instance = new AttributesGUIController();
			/* Get Objects from ObjectValue Objects */
			this.ovFolder = gui.WaitForChild("ObjectReferences") as Folder;
			this.resetButton = (this.ovFolder.WaitForChild("ResetButtonOV") as ObjectValue).Value as TextButton;
			this.saveButton = (this.ovFolder.WaitForChild("SaveButtonOV") as ObjectValue).Value as TextButton;
			this.availablePoints = (this.ovFolder.WaitForChild("AvailablePointsOV") as ObjectValue).Value as TextLabel;
			this.spentPoints = (this.ovFolder.WaitForChild("SpentPointsOV") as ObjectValue).Value as TextLabel;

			/* Subject */
			this.attributeSubject = attributeSubject;
			assert(this.attributeSubject, "No Subject Provided");

			/* Initialize Buttons */
			this.InitializeButtons();

			/* Initialize */
			this.InitializeConnections();

			warn("AttributesGUIController: Started");
		}
	}

	/* Initialize */
	private static InitializeConnections() {
		/* Connect to attributes updated */
		this._PlayerAttributesUpdated.Connect((charStats, availablePts, spentPts) => {
			this.UpdatePoints(charStats, availablePts, spentPts);
		});
	}

	private static UpdatePoints(
		charStats: IPlayerData["CharacterStats"],
		availablePts: number,
		spentPts: number,
	): void {
		this.availablePoints.Text = `${availablePts}`;
		this.spentPoints.Text = `${spentPts}`;
	}

	private static InitializeButtons() {
		this.resetButton.MouseButton1Click.Connect(() => {
			warn("Reset Button Clicked");
		});
		this.saveButton.MouseButton1Click.Connect(() => {
			warn("Save Button Clicked");
		});
	}
}
