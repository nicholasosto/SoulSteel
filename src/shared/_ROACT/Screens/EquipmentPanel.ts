import Fusion, { Observer, OnEvent } from "@rbxts/fusion";
import { PanelTitleLabel } from "shared/_ROACT/Components/TextLabelComponents";
import { PanelBackgroundImage } from "../Components/ImageComponents";
import { Sizes, FusionColors, TextureIds } from "../ComponentIndex";

const { New, Children, Value, Computed } = Fusion;

const PanelTitle = Value("Equipment Panel");

const ComputedPanelTitle = Computed(() => {
	return PanelTitle.get() + " - Updated";
});

const TitleObserver = Observer(PanelTitle);
TitleObserver.onChange(() => {
	print("Panel Title Changed: ", PanelTitle.get());
});

task.delay(5, () => {
	PanelTitle.set("New Equipment Panel Title");
});
const PanelTitleLabel2 = New("TextLabel")({
	Size: new UDim2(1, 0, 1, 0),
	BackgroundTransparency: 1,
	Text: PanelTitle,
	TextColor3: new Color3(1, 1, 1),
	TextSize: 24,
	ZIndex: 102,
	TextWrapped: true,
	TextXAlignment: Enum.TextXAlignment.Center,
	TextYAlignment: Enum.TextYAlignment.Center,
});

export default function EquipmentPanel() {
	return New("Frame")({
		Size: new UDim2(0, 300, 0, 400),
		AnchorPoint: new Vector2(0.5, 0.5),
		Position: new UDim2(0.5, 0, 0.5, 0),
		Name: "EquipmentPanel",
		BackgroundColor3: FusionColors.Primary,
		BorderSizePixel: 5,
		[Children]: [PanelTitleLabel2, PanelBackgroundImage],
		[OnEvent("MouseEnter")]: () => {
			print("Mouse Entered EquipmentPanel!");
			PanelTitle.set("Updated Equipment Panel Title");
		},
		[OnEvent("MouseLeave")]: () => {
			print("Mouse Left EquipmentPanel!");
		},
	});
}
