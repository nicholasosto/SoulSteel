import Fusion from "@rbxts/fusion";

const { New } = Fusion;

const PanelBackgroundImage = New("ImageLabel")({
	Size: new UDim2(1, 0, 1, 0),
	BackgroundTransparency: 1,
	Image: "rbxassetid://111310485819440",
	ImageColor3: new Color3(1, 1, 1),
	ImageTransparency: 0,
	ScaleType: Enum.ScaleType.Crop,
	AnchorPoint: new Vector2(0.5, 0.5),
	Position: new UDim2(0.5, 0, 0.5, 0),
});

export { PanelBackgroundImage };
