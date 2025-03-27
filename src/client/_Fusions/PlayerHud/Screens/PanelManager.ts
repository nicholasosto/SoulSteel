// PanelManager.ts
import Fusion, { Value, Children } from "@rbxts/fusion";
import { MenuButtons } from "../MenuButtons";
import { PanelProfile } from "./PanelProfile";
import { PanelSkills } from "./PanelSkills";
import { PanelEquipment } from "./PanelEquipment";
import { PanelTeleport } from "./PanelTeleport";

// Import other panels as needed

const { New } = Fusion;

export function PanelManager() {
	// Reactive state for the active panel (default can be "Profile", for example)
	const activePanel = Value("None");
	const enabled = Value(true);
	const PanelMap = {
		Profile: PanelProfile({ activePanel }),
		Equipment: PanelEquipment({ activePanel }),
		Skills: PanelSkills({ activePanel }),
		Teleport: PanelTeleport({ activePanel }),
	};

	return New("ScreenGui")({
		ResetOnSpawn: false,
		[Children]: [
			PanelMap.Profile,
			PanelMap.Equipment,
			PanelMap.Skills,
			PanelMap.Teleport,
			MenuButtons({ activePanel }),
		],
	});
}
