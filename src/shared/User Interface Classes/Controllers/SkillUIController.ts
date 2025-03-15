import { RemoteFunctions, RemoteEvents } from "shared/net/Remotes";
import { SkillPanelData, SkillSlotMap } from "shared/_IDs/SkillIndex";
import { Players } from "@rbxts/services";

const PlayerGUI = Players.LocalPlayer.WaitForChild("PlayerGui") as PlayerGui;

export default class SkillUIController {
	private panelData?: SkillPanelData;
	private skillSlotMap?: SkillSlotMap;

	/* Remote function to fetch skill panel data */
	private GetSkillPanelData = RemoteFunctions.Client.Get("GetSkillPanelData");

	/* Event to update the skill panel when a new skill is selected */
	private UpdateSkillPanel = RemoteEvents.Client.Get("UpdateSkillPanel");

	/* Connection(s) for UI events */
	private _updateEvent: RBXScriptConnection | undefined;

	constructor() {

		this.panelData = undefined;
		this.init();
	}

	private async init(): Promise<void> {
		// Fetch the initial data for the skill panel.
		this.panelData = (await this.GetSkillPanelData.CallServerAsync()) as SkillPanelData;
		print("SkillPanelController initialized with panelId:", this.panelData);
		// Bind UI events.
		this.bindEvents();
		// Render the initial state of the skill panel.
		this.render();
	}

	// Bind UI events (e.g., clicks on skill buttons) to functions.
	protected bindEvents(): void {
		/* UpdateEvent */
		this._updateEvent = this.UpdateSkillPanel.Connect((panelData: SkillPanelData) => {
			print("SkillPanelController: UpdateEvent triggered with panelData:", panelData);
			this.panelData = panelData;
			this.render();
		});
	}

	// Render the skill panel using the panelData.
	protected render(): void {}

	// A method to update the currently selected skill and re-render the panel.
	public displaySkillDetails(skillId: string): void {}
}
