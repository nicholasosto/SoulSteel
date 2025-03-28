import Fusion from "@rbxts/fusion";

/* Network */
import ClientNetManager from "./Net/ClientNetManager";
/* Custom Components */
import CharacterCreationScreen from "shared/__FusionSystem/PlayerCreationScreen/CharacterCreationUi";
import EventButton from "./_Fusions/BaseComponentClasses/EventButton";
import { ComponentSizes } from "shared/__FusionSystem/ComponentThemeConstants";
import { PlayerProgressionVO } from "./_Fusions/PlayerDataObjects";
import { PlayerLevelLabel } from "shared/_ROACT/Components/TextLabelComponents";

/* Fusion Setup*/
const { New, Children, OnChange, OnEvent, Value } = Fusion;

// Mounting the component in a LocalScript:
const player = game.GetService("Players").LocalPlayer;
const playerGui = player.WaitForChild("PlayerGui");


ClientNetManager.Start();
/* Direct Components */
const ValueLabel = (valueObject: Fusion.Value<number>) => {
	return New("TextLabel")({
		Name: "ValueLabel",
		Text: tostring(valueObject.get()),
		[OnChange("Text")]: () => {
			return tostring(valueObject.get());
		},
		Size: new UDim2(0, 100, 0, 50),
		Position: new UDim2(0.5, 0, 0.5, 0),
		AnchorPoint: new Vector2(0.5, 0.5),
		BackgroundTransparency: 1,
		TextColor3: Color3.fromRGB(255, 255, 255),
		TextScaled: true,
	});
};
/* ImageLabels */
const FrameBackground = New("ImageLabel")({
	Name: "FrameBackgroundImageLabel",
	Size: new UDim2(1, 0, 1, 0),
	Position: new UDim2(0.5, 0, 0.5, 0),
	AnchorPoint: new Vector2(0.5, 0.5),
	BackgroundTransparency: 1,
	Image: "rbxassetid://115288442961231", // Ghoul
	ImageTransparency: 0.3,
	ImageColor3: Color3.fromRGB(255, 255, 255),
});

/* Buttons */
const IncreaseLevelButton = New("ImageButton")({
	Name: "IncreaseLevelButton",
	Size: new UDim2(0, 100, 0, 50),
	Position: new UDim2(0.5, 0, 0.5, 0),
	AnchorPoint: new Vector2(0.5, 0.5),
	BackgroundTransparency: 1,
	Image: "rbxassetid://115288442961231", // Ghoul
	ImageTransparency: 0.3,
	[OnEvent("MouseButton1Click")]: () => {
		print("Increase Level Button Clicked");
		PlayerProgressionVO.PlayerLevel.set(PlayerProgressionVO.PlayerLevel.get() + 1);
		ClientNetManager.UpdateData();
	},
});

const playerLevelLabel = ValueLabel(PlayerProgressionVO.PlayerLevel);
const SimpleFrameContainer = New("Frame")({
	Name: "SimpleFrame",
	BackgroundTransparency: 1,
	Size: ComponentSizes.ContainerPanel,
	[Children]: [FrameBackground, playerLevelLabel, IncreaseLevelButton],
});

const FusionApplication = New("ScreenGui")({
	Parent: playerGui,
	Name: "FusionApp",
	IgnoreGuiInset: true,
	ResetOnSpawn: false,
	[Children]: [SimpleFrameContainer],
});

print("Roact Client: Starting...", FusionApplication);
