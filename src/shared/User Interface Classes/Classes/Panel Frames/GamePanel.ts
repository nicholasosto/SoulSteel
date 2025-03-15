import StorageManager from "shared/Storage/StorageManager";

type GamePanelConfiguration = Configuration & {
	SubmitButtonOV: ObjectValue;
	EUITitleOV: ObjectValue;
	CloseButtonOV: ObjectValue;
	BackgroundTextureOV: ObjectValue;
	VNavContainerOV: ObjectValue;
	MainContentOV: ObjectValue;
	HNavContainerOV: ObjectValue;
};

export default class GamePanel {
	private TGamePanel = StorageManager.CloneFromStorage("TGamePanel") as Frame;
	public PanelId: string;
	private config: GamePanelConfiguration = this.TGamePanel.WaitForChild(
		"GamePanelConfiguration",
	) as GamePanelConfiguration;

	constructor(panelId: string, title: string, backgroundTextureId?: string) {
		this.PanelId = panelId;
		this.TGamePanel.Name = this.PanelId;
		this.updateTitle(title);
		if (backgroundTextureId !== undefined) {
			this.updateBackgroundTexture(backgroundTextureId);
		}
		
	}


	public updateTitle(newTitle: string) {
		const titleLabel = this.config.EUITitleOV.Value as TextLabel;
		if (titleLabel) {
			titleLabel.Text = newTitle;
		}
	}

	public updateBackgroundTexture(textureId: string) {
		const background = this.config.BackgroundTextureOV.Value as ImageLabel;
		if (background) {
			background.Image = textureId;
		}
	}

	public enablePanel() {
		const mainContent = this.config.MainContentOV.Value as Frame;
		if (mainContent) {
			mainContent.Visible = true;
		}
	}

	public disablePanel() {
		const mainContent = this.config.MainContentOV.Value as Frame;
		if (mainContent) {
			mainContent.Visible = false;
		}
	}

	public setNavigationContainer(visible: boolean) {
		const vNav = this.config.VNavContainerOV.Value as Frame;
		if (vNav) {
			vNav.Visible = visible;
		}
		const hNav = this.config.HNavContainerOV.Value as Frame;
		if (hNav) {
			hNav.Visible = visible;
		}
	}

	public onSubmit(callback: () => void) {
		const button = this.config.SubmitButtonOV.Value as TextButton;
		if (button) {
			button.MouseButton1Click.Connect(callback);
		}
	}

	public onClose(callback: () => void) {
		const button = this.config.CloseButtonOV.Value as TextButton;
		if (button) {
			button.MouseButton1Click.Connect(callback);
		}
	}

	public Destroy() {
		this.TGamePanel.Destroy();
		warn(`GamePanel ${this.PanelId} destroyed`);
	}
}
