import { RemoteFunctions, PanelId } from "shared/net/Remotes";

export default class PanelController {
	private static _instance: PanelController;
	private static _getPanelData = RemoteFunctions.Client.Get("GetPanelData");

	constructor() {
		warn("Panel Controller: Instantiated");
	}

	public static Start() {
		if (this._instance === undefined) {
			warn("Panel Controller: Starting");
			this._instance = new PanelController();
		}
	}

	private static async GetPanelData(panelId: PanelId) {
		return await this._getPanelData.CallServerAsync(panelId);
	}
}
