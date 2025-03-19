import Roact from "@rbxts/roact";
import Fusion from "@rbxts/fusion";

const { Value, New, OnEvent, Children } = Fusion;

const PlayerName = Value("Player Name");
const PlayerHealth = Value(100);
const PlayerScore = Value(0);

const children = [
	New("UIListLayout")({
		SortOrder: Enum.SortOrder.LayoutOrder,
		FillDirection: Enum.FillDirection.Vertical,
		VerticalAlignment: Enum.VerticalAlignment.Center,
		HorizontalAlignment: Enum.HorizontalAlignment.Center,
	}),
	New("TextLabel")({
		Text: "Player Name: ",
		Size: new UDim2(1, 0, 0.5, 0),
		BackgroundColor3: new Color3(1, 1, 1),
	}),
	New("TextLabel")({
		Text: "Player Health: ",
		Size: new UDim2(1, 0, 0.5, 0),
		BackgroundColor3: new Color3(1, 1, 1),
	}),
	New("TextLabel")({
		Text: "Player Score: ",
		Size: new UDim2(1, 0, 0.5, 0),
		BackgroundColor3: new Color3(1, 1, 1),
	}),
];

function HealthBar() {
	return New("Frame")({
		Size: new UDim2(0, 200, 0, 20),
		BackgroundColor3: new Color3(1, 0, 0),
	});
}

export default function SimpleFrame() {
	return New("Frame")({
		Size: new UDim2(0, 200, 0, 800),
		AnchorPoint: new Vector2(0.5, 0.5),
		Position: new UDim2(0.5, 0, 0.5, 0),
		BackgroundColor3: new Color3(0, 1, 0.7),
		BorderSizePixel: 5,
		[Children]: children,
		[OnEvent("MouseEnter")]: () => {
			print("Mouse Entered SimpleFrame!");
			print(PlayerName.get());
			print(PlayerHealth.get());
		},
		[OnEvent("MouseLeave")]: () => {
			print("Mouse Left SimpleFrame!");
		},
	});
}
