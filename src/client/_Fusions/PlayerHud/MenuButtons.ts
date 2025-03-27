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

	/* === Menu Buttons Frame === */
	const MenuButtons_Buttons = New("Frame")({
		Name: "MenuButtons",
		Size: new UDim2(0, 300, 0, 50), // Adjust as needed
		Position: new UDim2(0, 60, 0, 160), // Center the frame
		BackgroundTransparency: 1,
		ZIndex: 100,

		/* === Menu Button Creation === */
		[Fusion.Children]: menuItems.map((item) =>
			New("ImageButton")({
				Name: item.name,
				Size: new UDim2(0, 48, 0, 48),
				BackgroundTransparency: 1,
				Image: item.icon,
				[OnEvent("Activated")]: () => {
					/* === Menu Button Click Handler === */

					/* Check if the clicked button is already selected */
					/* If it is, deselect it */
					/* If it's not, select it and update the active panel */
					const currentPanel = activePanel.get();
					if (currentPanel === item.name) {
						activePanel.set("None"); // Deselect if the same button is clicked
						print(item.name + " button deselected");
						return;
					}
					activePanel.set(item.name);
				},
			}),
		),
	});

	UIListLayout.Parent = MenuButtons_Buttons;
	return MenuButtons_Buttons;
}
