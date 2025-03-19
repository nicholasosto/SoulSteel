import Fusion, { Computed, New, Value, Children } from "@rbxts/fusion";

export interface FusionResourceBarProps {
	currentValue: Value<number>;
	maxValue: Value<number>;
	name: string;
	color: Color3;
	/**
	 * Optional custom text. If not provided, the bar displays the resource name, percentage, and raw values.
	 */
	labelText?: string | Computed<string>;
}

export function FusionResourceBar(props: FusionResourceBarProps) {
	const { currentValue, maxValue, name, color, labelText } = props;

	// Compute the fill percentage based on the current and maximum values.
	const fillPct = Computed(() => {
		const max = maxValue.get();
		return max > 0 ? currentValue.get() / max : 0;
	});

	// Determine the display text.
	// If a custom labelText is provided, use that; otherwise, create one using the resource name and computed percentage.
	const displayText =
		labelText !== undefined
			? typeIs(labelText, "string")
				? labelText
				: labelText
			: Computed(
					() => `${name}: ${math.floor(fillPct.get() * 100)}% (${currentValue.get()} / ${maxValue.get()})`,
				);

	return New("Frame")({
		Size: new UDim2(1, 0, 0, 20),
		BackgroundColor3: new Color3(0.2, 0.2, 0.2),
		BorderSizePixel: 0,
		[Children]: [
			// The colored fill bar
			New("Frame")({
				Size: Computed(() => new UDim2(fillPct.get(), 0, 1, 0)),
				BackgroundColor3: color,
				BorderSizePixel: 0,
				[Children]: [
					New("UICorner")({
						CornerRadius: new UDim(0, 4),
					}),
				],
			}),
			// The overlay text label
			New("TextLabel")({
				Text: displayText,
				Size: new UDim2(1, 0, 1, 0),
				BackgroundTransparency: 1,
				TextColor3: new Color3(1, 1, 1),
				Font: Enum.Font.GothamBold,
				TextScaled: true,
				ZIndex: 2,
			}),
			// Rounded corners for the bar container
			New("UICorner")({
				CornerRadius: new UDim(0, 4),
			}),
		],
	});
}
