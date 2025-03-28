import Fusion from "@rbxts/fusion";

const { New, Children, Value, Computed } = Fusion;

const backgroundImages: Record<string, string> = {
	Vampire: "rbxassetid://82257212198629", // Vampire
	Synthetic: "rbxassetid://115603298739561", // Blood Node
	Decay: "rbxassetid://115288442961231", // Ghoul
	Default: "rbxassetid://93933000089986", // Fateless
};

interface SSImageLabelProps {
	className?: Fusion.Value<string>;
	raceName?: Fusion.Value<string>;
}

export function CreateSSImageLabel(props: SSImageLabelProps) {
	print("Creating SSImageLabel with classVO:", props);

	const imageLabel = New("ImageLabel")({
		Name: "SSImageLabel",
		Size: new UDim2(0, 100, 0, 100),
		Position: new UDim2(0.5, 0, 0.5, 0),
		AnchorPoint: new Vector2(0.5, 0.5),
		ImageTransparency: 0,
		Image: backgroundImages[props.className?.get() ?? "Synthetic"],
		ImageColor3: Color3.fromRGB(255, 255, 255),
		BackgroundTransparency: 1,
	});
	return imageLabel;
}
