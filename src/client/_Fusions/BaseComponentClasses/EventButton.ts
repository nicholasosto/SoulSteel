import Fusion from "@rbxts/fusion";
import { ThemeChildren, ComponentSizes, PositionOffsets } from "shared/__FusionSystem/ComponentThemeConstants";
import { CreateSSImageLabel } from "shared/__FusionSystem/Basics/SSImageLabel";

const { New, Children, OnEvent, Value } = Fusion;

export interface EventButtonProps {
	text: string;
	onClick: () => void;
	disabled?: boolean;
}

const playerRace = Value("Human");

const ImageLabelProps = {
	raceName: playerRace,
	className: Value("Decay"),
};

const BGImageLabel = CreateSSImageLabel(ImageLabelProps);

export function EventButton(props: EventButtonProps) {
	const { text, onClick, disabled = false } = props;

	return New("TextButton")({
		Name: "EventButton",
		Size: ComponentSizes.IconButton,
		[OnEvent("MouseButton1Click")]: () => {
			if (!disabled) {
				onClick();
			}
		},
		[Children]: [ThemeChildren.ThemeCorner, ThemeChildren.ThemePadding, BGImageLabel],
	});
}

export default EventButton;
