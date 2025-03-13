import { RemoteFunctions, IPanelData, SkillSlotId, SkillId } from "shared/net/Remotes";

const GetPanelData = RemoteFunctions.Server.Get("GetPanelData");
const GetSlotMap = RemoteFunctions.Server.Get("GetSlotMap");

GetPanelData.SetCallback((player, panelId) => {
	print("GetPanelData callback called with panelId: " + panelId);

	const panelData: IPanelData = {
		panelId: panelId,
		data: {
			skillSlots: new Map(),
			unlockedSkills: [],
		},
	};

	warn(panelData);

	return panelData;
});

GetSlotMap.SetCallback((player, slotMapId) => {
	print("GetSlotMap callback called with slotMapId: " + slotMapId);

	const skillSlotMap = new Map<SkillSlotId, SkillId>();

	return skillSlotMap;
});
