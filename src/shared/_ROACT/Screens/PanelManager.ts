// PanelManager.ts
import Fusion, { Value, Children } from "@rbxts/fusion";
import { MenuButtons } from "./MenuButtons";
import { PanelProfile } from "./PanelProfile";
import { PanelSkills } from "./PanelSkills";
import { PanelEquipment } from "./PanelEquipment";

// Import other panels as needed

const { New } = Fusion;

export function PanelManager() {
	// Reactive state for the active panel (default can be "Profile", for example)
	const activePanel = Value("Profile");

	return New("ScreenGui")({
		ResetOnSpawn: false,
		[Children]: [
			// Pass the state to the menu buttons so they can update it
			MenuButtons({ activePanel }),
			PanelEquipment({ activePanel }),
			PanelProfile({ activePanel }),
			PanelSkills({ activePanel }),
			// Each panel receives the state so it can control its own visibility
			// ... add other panels here
		],
	});
}
