import { TQuestBlock } from "shared/_Types/TQuestBlock";
import { CollectionService } from "@rbxts/services";
import { TGameCharacter } from "shared/_Types/TGameCharacter";
import { Players } from "@rbxts/services";
import { Outbound } from "server/net/_Server_Events";
import { QuestId } from "shared/_IDs/IDs_Quest";

const tagName = "QuestBlock";

class QuestBlock {
	_Instance: TQuestBlock;
	questId: string;

	constructor(instance: TQuestBlock) {
		this._Instance = instance;
		this.questId = instance.QuestId.Value;
		this._Instance.SurfaceGui.TextLabel.Text = this.questId;

		this._Instance.Touched.Connect((hit) => {
			const character: TGameCharacter = hit.FindFirstAncestorWhichIsA("Model") as TGameCharacter;
			const player = Players.GetPlayerFromCharacter(character);
			if (player) {
				Outbound.SendQuestAssigned(player, this.questId as QuestId);
			}
		});
	}
}

export default function StartQuestBlockCollection() {
	const questBlocks = CollectionService.GetTagged(tagName);
	questBlocks.forEach((instance) => {
		new QuestBlock(instance as TQuestBlock);
	});

	CollectionService.GetInstanceAddedSignal(tagName).Connect((instance) => {
		new QuestBlock(instance as TQuestBlock);
	});

	CollectionService.GetInstanceRemovedSignal(tagName).Connect((instance) => {
		// Remove QuestBlock
	});
}
