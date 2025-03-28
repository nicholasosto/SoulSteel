import Fusion from "@rbxts/fusion";

const { New, Children } = Fusion;

export const ComponentSizes = {
	/* HUD */
	CharacterFrame: UDim2.fromOffset(400, 150), // Adjust as needed
	SkillBar: UDim2.fromOffset(300, 50), // Adjust as needed
	ResourceBar: UDim2.fromOffset(300, 50), // Adjust as needed
	PlayerName: UDim2.fromOffset(200, 50), // Adjust as needed
	PlayerLevel: UDim2.fromOffset(20, 20), // Adjust as needed
	MenuBar: UDim2.fromOffset(200, 50), // Adjust as needed

	/* Buttons */
	IconButton: UDim2.fromOffset(50, 50), // Adjust as needed
	IconWithTextButton: UDim2.fromOffset(100, 50), // Adjust as needed

	/* Panels */
	ContainerPanel: UDim2.fromOffset(800, 600), // Adjust as needed
	TabPanel: UDim2.fromOffset(500, 300), // Adjust as needed
};

export const PositionOffsets = {
	/* HUD */
	CharacterFrame: UDim2.fromOffset(0, 0), // Adjust as needed
	SkillBar: UDim2.fromOffset(0, 0), // Adjust as needed
};

export const dummLabel = (label: string) => {
	return New("TextLabel")({
		Name: label + "_Dummy",
		Size: ComponentSizes.IconButton,
		Position: UDim2.fromScale(0, 0),
		Text: label,
		TextColor3: Color3.fromRGB(255, 255, 255),
		TextSize: 20,
		Font: Enum.Font.SourceSans,
		BackgroundColor3: Color3.fromRGB(0, 255, 0),
		BackgroundTransparency: 0.5,
		BorderSizePixel: 0,
		AnchorPoint: new Vector2(0.5, 0.5),
		[Children]: [
			New("UICorner")({
				Name: "UICorner",
				CornerRadius: new UDim(0, 8),
			}),
			New("UIPadding")({
				Name: "UIPadding",
				PaddingTop: new UDim(0, 10),
				PaddingBottom: new UDim(0, 10),
				PaddingLeft: new UDim(0, 10),
				PaddingRight: new UDim(0, 10),
			}),
		],
	});
};

export const ThemeChildren = {
	ThemeCorner: New("UICorner")({
		Name: "ThemeCorner",
		CornerRadius: new UDim(0, 8),
	}),
	ThemePadding: New("UIPadding")({
		Name: "ThemePadding",
		PaddingTop: new UDim(0, 10),
		PaddingBottom: new UDim(0, 10),
		PaddingLeft: new UDim(0, 10),
		PaddingRight: new UDim(0, 10),
	}),
	ThemeBackgoundImage: New("ImageLabel")({
		Name: "ThemeBackgoundImage",
		Size: UDim2.fromScale(1, 1),
		Position: UDim2.fromScale(0, 0),
		BackgroundColor3: Color3.fromRGB(133, 56, 56),
		BackgroundTransparency: 1,
		Image: "rbxassetid://1234567890", // Replace with your image ID
		ImageTransparency: 0.5,
		ImageColor3: Color3.fromRGB(23, 235, 92),
		ScaleType: Enum.ScaleType.Slice,
		SliceScale: 0.5,
	}),
};

const UIListLayout = New("UIListLayout")({
	Name: "UIListLayout",
	FillDirection: Enum.FillDirection.Vertical,
	HorizontalAlignment: Enum.HorizontalAlignment.Center,
	VerticalAlignment: Enum.VerticalAlignment.Center,
	Padding: new UDim(0, 10),
});

const ScrollingFrame = New("ScrollingFrame")({
	Name: "ScrollingFrame",
	Size: UDim2.fromScale(1, 1),
	Position: UDim2.fromScale(0, 0),
	BackgroundColor3: Color3.fromRGB(255, 255, 255),
	BackgroundTransparency: 1,
	BorderSizePixel: 0,
	ScrollBarThickness: 0,
	ScrollBarImageTransparency: 1,
	[Children]: [UIListLayout, dummLabel("Test"), dummLabel("Test2"), dummLabel("Test3")],
});

export const testThemeFrame = New("Frame")({
	Name: "TestThemeFrame",
	Size: ComponentSizes.CharacterFrame,
	Position: PositionOffsets.CharacterFrame,
	BackgroundColor3: Color3.fromRGB(0, 222, 0),
	BackgroundTransparency: 0.2,
	[Children]: [ScrollingFrame, ThemeChildren],
});
