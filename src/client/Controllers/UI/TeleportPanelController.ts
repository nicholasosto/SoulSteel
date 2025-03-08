import Logger from "shared/Utility/Logger";
import { Remotes } from "shared/net/Remotes";
import { Teleport_Screen, TeleportButtons } from "client/_Helpers/GUI_Index";

/*Controller Events*/

export default class TeleportPanelController {
	/* Instance */
	private static _instance: TeleportPanelController;

	/* Teleport Panel*/
	private static _teleportPanel: ScreenGui = Teleport_Screen;
	private static _teleportButtons: Array<TextButton> = TeleportButtons;

	/* Remotes - Outbound */
	private static _TeleportRequest = Remotes.Client.Get("TeleportTo");

	/* Constructor */
	private constructor() {
		Logger.Log("TeleportPanelController", "CONSTRUCTOR()");
	}

	/* Start */
	public static Start() {
		if (this._instance === undefined) {
			this._instance = new TeleportPanelController();
			this._initializeListeners();
			Logger.Log("TeleportPanelController", "Initialized");
			this._loadCamera();
		}
	}

	/* Initialize Listeners */
	private static _initializeListeners() {
		TeleportButtons.forEach((button) => {
			/* Location: CFrameValue - Comes from childProperty of the button */
			if (button.IsA("TextButton")) {
				const cfvLocation = button.WaitForChild("Location") as CFrameValue;
				assert(cfvLocation, "CFrameValue not found");
				button.Activated.Connect(() => {
					this._TeleportRequest.SendToServer(cfvLocation.Value.Position);
				});
			}
		});
	}

	private static _loadCamera() {
		const previewCamera = new Instance("Camera");
		const worldModel = new Instance("WorldModel");
		const viewport = Teleport_Screen.FindFirstChild("ViewportFrame",true) as ViewportFrame;
		const destinationArea = game.Workspace.WaitForChild("Zone - Mecha Mania").Clone() as Model;
		const destinationPosition = destinationArea.FindFirstChild("PreviewCamPos") as CFrameValue;
		previewCamera.Parent = viewport;
		worldModel.Parent = viewport;
		viewport.CurrentCamera = Teleport_Screen.FindFirstChild("Mechamania_Camera") as Camera;
		destinationArea.Parent = worldModel;

		previewCamera.CFrame = destinationPosition.Value;
	}
}
