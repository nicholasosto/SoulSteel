import Fusion, { Children, OnEvent } from "@rbxts/fusion";

const { New } = Fusion;

const IncreaseScoreButton = (callback: () => void) => {
	return New("TextButton")({
		Size: new UDim2(0, 200, 0, 50),
		Position: new UDim2(0.5, -100, 0.5, -25),
		BackgroundColor3: new Color3(0, 1, 0),
		Text: "Increase Score",
		TextColor3: new Color3(1, 1, 1),
		TextSize: 20,
		[Children]: [],
		[OnEvent("Activated")]: callback,
	});
};

export { IncreaseScoreButton };
