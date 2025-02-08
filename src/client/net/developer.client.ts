// File: developer.client.ts
// Purpose: Handles the client-side of the developer listener which calls the ReferenceBlock Creator.

import { Requests } from "shared/Remotes/ClientRemotes";
import Logger from "shared/Utility/Logger";
import { GameOfLifeButton } from "client/Buttons/DeveloperButtons";

let connection_1: RBXScriptConnection | undefined;
/* Game of Life Button */

function InitializeDeveloperClient() {
	Logger.Log("[Developer Client]", "Initialized");

	connection_1?.Disconnect();
	connection_1 = GameOfLifeButton.Activated.Connect(() => {
		Logger.Log("[Game of Life Button]", "Activated");
		Requests.DeveloperRequest.SendToServer("Game of Life Button Clicked");
		wait(1);
	});
}

InitializeDeveloperClient();
