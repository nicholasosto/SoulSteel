//import { TReferenceBlock } from "shared/Factories/Model Factory/References/ReferenceBlock";
import { DeveloperEvent } from "server/net/_Server_Events";
import ModelFactory from "shared/Factories/Model Factory/ModelFactory";
import Logger from "shared/Utility/Logger";

let connection_DR: RBXScriptConnection | undefined;

export default function StartDeveloperListener() {
	// Developer Request
	connection_DR?.Disconnect();
	connection_DR = DeveloperEvent.GameOfLife.Connect((player) => {
		Logger.Log("[Developer Listener]", "Game of Life Request Received");
		ModelFactory.ReferenceBlock();
	});
}
