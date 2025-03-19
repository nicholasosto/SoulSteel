import Fusion, { CanBeState, Observer } from "@rbxts/fusion";

const { New, Value } = Fusion;

const playerLevel = Value(1);

const PanelTitleLabel = New("TextLabel")({
	Size: new UDim2(1, 0, 1, 0),
	BackgroundTransparency: 1,
	Text: "Panel Title",
	TextColor3: new Color3(1, 1, 1),
	TextSize: 24,
	TextWrapped: true,
	TextXAlignment: Enum.TextXAlignment.Center,
	TextYAlignment: Enum.TextYAlignment.Center,
});

const PlayerLevelLabel = (fusionValue: Fusion.Value<string>) => {
	return New("TextLabel")({
		Size: new UDim2(0, 30, 0, 30),
		BackgroundTransparency: 1,
		Text: fusionValue,
	});
};

export { PanelTitleLabel, PlayerLevelLabel };
