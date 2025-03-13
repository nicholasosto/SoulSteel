import {RemoteFunctions, IPanelData } from "shared/net/Remotes";
const getPanelData = RemoteFunctions.Client.Get("GetPanelData");

function GetPanelData(panelId: string): Promise<IPanelData> {
    return getPanelData.CallServerAsync(panelId);
};

getPanelData.CallServerAsync("PanelId").then((panelData: IPanelData) => {
	print("Remote Client - Panel Data: ", panelData);
});
