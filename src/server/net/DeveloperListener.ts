//import { TReferenceBlock } from "shared/Factories/Model Factory/References/ReferenceBlock";
import { Requests, Responses } from "shared/Remotes/ServerRemotes";
import ModelFactory from "shared/Factories/Model Factory/ModelFactory";
import Logger from "shared/Utility/Logger";

let connection_DR: RBXScriptConnection | undefined;

export default function StartDeveloperListener() {
	// Developer Request
	connection_DR?.Disconnect();
	connection_DR = Requests.DeveloperRequest.Connect((player: Player, message: string) => {
		// Log the message
		Logger.Log(script, player, message);
		// Send a response to the client
		Responses.DeveloperResponse.SendToPlayer(player, script.Name + " received your message.");

		const playerFrame = player.Character?.GetPivot();
		const referenceBlock = ModelFactory.ReferenceBlock();

		if (playerFrame) {
			referenceBlock.Spawn(playerFrame, game.Workspace);
		}
	});
}
