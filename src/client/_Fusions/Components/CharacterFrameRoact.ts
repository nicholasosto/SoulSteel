import Fusion from "@rbxts/fusion";
import { PlayerResourceVO, PlayerClassVO, PlayerDisplayNameVO } from "client/_Fusions/PlayerDataObjects";
import ResourceBarGroup from "./ResourceBarGroup";

export const CharacterFrame = Fusion.New("Frame")({
	Name: "CharacterFrame",
	Size: new UDim2(0, 400, 0, 150), // Adjust as needed
	Position: new UDim2(0, 60, 0, 60),
	AnchorPoint: new Vector2(0, 0),
	BackgroundColor3: Color3.fromRGB(161, 105, 105),
	BackgroundTransparency: 0.5,
	BorderSizePixel: 0,
	ClipsDescendants: true,
	LayoutOrder: 1,
	[Fusion.Children]: [
		Fusion.New("TextLabel")({
			Name: "PlayerDisplayName",
			Size: new UDim2(1, 0, 0, 30),
			Position: new UDim2(0, 0, 0, 0),
			BackgroundTransparency: 1,
			Text: PlayerDisplayNameVO.get(),
			TextColor3: Color3.fromRGB(255, 255, 255),
			TextSize: 20,
			TextScaled: true,
			Font: Enum.Font.LuckiestGuy,
			TextStrokeColor3: Color3.fromRGB(0, 0, 0),
			TextStrokeTransparency: 0.5,
			AnchorPoint: new Vector2(0, 0),
			LayoutOrder: 1,
		}),
		ResourceBarGroup,
	],
});
