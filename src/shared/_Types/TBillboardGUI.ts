export type BGUI_HealthBar = BillboardGui & {
	ContainerFrame: Frame & {
		CharacterName: TextLabel;
		UIListLayout: UIListLayout;
		ProgressBar: Frame & {
			Foreground: Frame & {
				Bar: Frame;
			};
		};
	};
};
