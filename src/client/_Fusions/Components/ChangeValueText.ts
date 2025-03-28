import Fusion from "@rbxts/fusion";

const { New, Value, Children, OnEvent, OnChange } = Fusion;

const testText = Value("Test Text");

/**
 * ChangeValueText is a simple Fusion component that displays a text label.
 * It updates its text based on the value passed to it.
 * The text is updated whenever the value changes.
 */

export function ChangeValueText() {
	return New("TextLabel")({
		Name: "ChangeValueText",
		Size: new UDim2(1, 0, 0, 30),
		Position: new UDim2(0, 0, 0, 0),
		BackgroundTransparency: 1,
		Text: testText.get(),
		TextColor3: Color3.fromRGB(255, 255, 255),
		TextSize: 20,
		TextScaled: true,
		Font: Enum.Font.LuckiestGuy,
		TextStrokeColor3: Color3.fromRGB(0, 0, 0),
		TextStrokeTransparency: 0.5,
		AnchorPoint: new Vector2(0, 0),
		Active: true,
		[Children]: [
			New("TextBox")({
				Size: new UDim2(1, 0, 0, 30),
                Position: new UDim2(0, 0, 0, 50),
				BackgroundTransparency: 0,
				Text: testText.get(),
				TextColor3: Color3.fromRGB(255, 255, 255),
				TextSize: 20,
				TextScaled: true,
				Font: Enum.Font.LuckiestGuy,
				TextStrokeColor3: Color3.fromRGB(0, 0, 0),
				TextStrokeTransparency: 0.5,
				[OnChange("Text")]: (text: string) => {
					print("Text changed to: ", text);
					testText.set(text);
				},
			}),
		],
	});
}

export default ChangeValueText;
