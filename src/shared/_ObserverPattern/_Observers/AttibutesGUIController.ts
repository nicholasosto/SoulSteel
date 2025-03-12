import StorageManager from "shared/Storage/StorageManager";
import IPlayerData from "shared/_Interfaces/Player Data/IPlayerData";
import { Remotes, RemoteFunctions, AttributePanelData } from "shared/net/Remotes";

/* GUI Element Template */
const attributeControlTemplate = StorageManager.CloneFromStorage("Attribute_Control_Template") as Frame;

/* Panel GUI Interface */
interface AttributePanelElements {
	availablePointsLabel: TextLabel;
	spentPointsLabel: TextLabel;
	resetButton: TextButton;
	saveButton: TextButton;
	attributesControlFrame: Frame;
}

/* Remote and Remote Functions */
const EV_PlayerAttributesUpdated = Remotes.Client.Get("PlayerAttributesUpdated");
const EV_RequestAttributeUpdate = Remotes.Client.Get("AttributeUpdateRequest");
const RF_GetAttributePanelData = RemoteFunctions.Client.Get("InitializeAttributePanel");

export default class AttributesGUIController {
	/* Singleton */
	private static instance: AttributesGUIController;

	/*=== Data ===*/
	/* Cached Panel Data */
	private static attributePanelData: AttributePanelData;
	/* Map of Attribute GUI Elements */
	private static attributeGUIElements: AttributePanelElements;
	/* Map of Attribute Controls (Frame with children) */
	private static attributeControls: Map<keyof IPlayerData["CharacterStats"], Frame> = new Map();

	/* Connection */
	private static _attributePanelUpdate: RBXScriptConnection;

	/* Constructor */
	private constructor() {}

	/* Start */
	public static Start(attributesPanelFrame: Frame) {
		if (this.instance === undefined) {
			/* Create Singleton */
			this.instance = new AttributesGUIController();

			/* Configuration Extraction = Get Objects from ObjectValue Objects */
			this.attributeGUIElements = this.InitializeGUIElements(
				attributesPanelFrame.FindFirstChild("ObjectReferences") as Folder,
			);

			/* Call Server for Data */
			this.attributePanelData = RF_GetAttributePanelData.CallServerAsync().await()[1] as AttributePanelData;

			/* Create Attribute Controls */
			this.CreateAttributeControls();

			/* Connect to Remote */
			this._attributePanelUpdate?.Disconnect();
			this._attributePanelUpdate = EV_PlayerAttributesUpdated.Connect((newData) => {
				this.Update(newData);
			});


			this.Update(this.attributePanelData);
		}
	}

	/* == [01] Button Handlers == */

	/* Handle Attribute Button */
	private static _handleAttributeButton(attribute: keyof IPlayerData["CharacterStats"], increment: number) {
		const currentAttributeValue = this.attributePanelData.characterStats[attribute];
		const newValue = currentAttributeValue + increment;

		if (newValue >= 0 && this.attributePanelData.availablePoints >= increment) {
			this.Update({
				availablePoints: this.attributePanelData.availablePoints - increment,
				spentPoints: this.attributePanelData.spentPoints + increment,
				characterStats: {
					[attribute]: newValue,
				},
			});
		}
	}

	/* Handle Reset Button */
	private static _handleResetButton() {
		warn("AttributesGUIController: Reset Button Clicked");
	}

	/* Handle Save Button */
	private static _handleSaveButton() {
		warn("AttributesGUIController: Save Button Clicked");
		EV_RequestAttributeUpdate.SendToServer(this.attributePanelData);
	}

	/* == [02] Initializers == */

	/* Initialize GUI Elements from Object Values*/
	private static InitializeGUIElements(ovFolder: Folder): AttributePanelElements {
		const panelElements: AttributePanelElements = {} as AttributePanelElements;

		panelElements.availablePointsLabel = (ovFolder.WaitForChild("AvailablePointsOV") as ObjectValue)
			.Value as TextLabel;
		panelElements.spentPointsLabel = (ovFolder.WaitForChild("SpentPointsOV") as ObjectValue).Value as TextLabel;
		panelElements.resetButton = (ovFolder.WaitForChild("ResetButtonOV") as ObjectValue).Value as TextButton;
		panelElements.saveButton = (ovFolder.WaitForChild("SaveButtonOV") as ObjectValue).Value as TextButton;
		panelElements.attributesControlFrame = (ovFolder.WaitForChild("AttributesControlsFrameOV") as ObjectValue)
			.Value as Frame;

		/* Add Button Handlers */
		panelElements.resetButton.MouseButton1Click.Connect(() => this._handleResetButton());
		panelElements.saveButton.MouseButton1Click.Connect(() => this._handleSaveButton());

		/* Return */
		return panelElements;
	}

	/* == [03] Attribute Controls == */
	/* Create all Attribute Controls */
	private static CreateAttributeControls(): void {
		for (const [attribute, value] of pairs(this.attributePanelData["characterStats"])) {
			this.CreateAttributeControl(attribute, value);
		}
	}
	/* Helper: Create Attribute Control */
	private static CreateAttributeControl(attribute: keyof IPlayerData["CharacterStats"], value: number): void {
		/* Clone, Name and Parent - Template */
		const attributeControl = attributeControlTemplate.Clone() as Frame;
		attributeControl.Name = attribute + "Control";
		attributeControl.Parent = this.attributeGUIElements.attributesControlFrame;

		/* Set Attribute Name and Value */
		const attributeName = attributeControl.WaitForChild("AttributeName") as TextLabel;
		const attributeValue = attributeControl.WaitForChild("AttributeValue") as TextLabel;
		attributeName.Text = attribute;
		attributeValue.Text = tostring(value);

		/* Get Buttons and Set Button Handlers */
		const attributeUpButton = attributeControl.WaitForChild("Increase") as TextButton;
		const attributeDownButton = attributeControl.WaitForChild("Decrease") as TextButton;
		attributeUpButton.MouseButton1Click.Connect(() => this._handleAttributeButton(attribute, 1));
		attributeDownButton.MouseButton1Click.Connect(() => this._handleAttributeButton(attribute, -1));

		/* Set Control in Map */
		this.attributeControls.set(attribute, attributeControl);
	}

	/* Update GUI Panel */
	private static Update(
		panelData: Partial<Omit<AttributePanelData, "characterStats">> & {
			characterStats?: Partial<AttributePanelData["characterStats"]>;
		},
	): void {
		this.attributePanelData = {
			...this.attributePanelData,
			...panelData,
			characterStats: {
				...this.attributePanelData.characterStats,
				...(panelData.characterStats || {}),
			},
		};

		/* Update Labels Available and Spent Points */
		this.attributeGUIElements.availablePointsLabel.Text = `${this.attributePanelData.availablePoints}`;
		this.attributeGUIElements.spentPointsLabel.Text = `${this.attributePanelData.spentPoints}`;

		/* Update Attribute Values */
		for (const [attribute, value] of pairs(this.attributePanelData.characterStats)) {
			const control = this.attributeControls.get(attribute);
			if (control) {
				const attributeValue = control.WaitForChild("AttributeValue") as TextLabel;
				attributeValue.Text = tostring(value);
			}
		}
	}
}
