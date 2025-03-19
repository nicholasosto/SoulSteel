// MenuButtons.ts
import Fusion, { OnEvent } from "@rbxts/fusion";

interface MenuButtonsProps {
	activePanel: Fusion.Value<string>;
}

const { New } = Fusion;

const menuItems = [
	{ name: "Profile", icon: "rbxassetid://104363785170155" },
	{ name: "Equipment", icon: "rbxassetid://117744205950055" },
	{ name: "Skills", icon: "rbxassetid://136726027863248" },
	{ name: "Teleport", icon: "rbxassetid://119089785849627" },
	// add more menu items as needed
];

const UIListLayout = New("UIListLayout")({
	SortOrder: Enum.SortOrder.LayoutOrder,
    FillDirection: Enum.FillDirection.Horizontal,
	HorizontalAlignment: Enum.HorizontalAlignment.Center,
	VerticalAlignment: Enum.VerticalAlignment.Center,
});

export function MenuButtons(props: MenuButtonsProps) {
	const { activePanel } = props;
	const MenuButtons_Buttons = New("Frame")({
		Name: "MenuButtons",
		Size: new UDim2(0, 300, 0, 50), // Adjust as needed
		BackgroundTransparency: 1,

		[Fusion.Children]: menuItems.map((item) =>
			New("ImageButton")({
				Name: item.name,
				Size: new UDim2(0, 48, 0, 48),
				BackgroundTransparency: 1,
				Image: item.icon,
				[OnEvent("Activated")]: () => {
					// Set the active panel to the one corresponding to the button clicked
					activePanel.set(item.name);
					print(item.name + " button clicked");
				},
			}),
		),
	});

	UIListLayout.Parent = MenuButtons_Buttons;
	return MenuButtons_Buttons;
}
