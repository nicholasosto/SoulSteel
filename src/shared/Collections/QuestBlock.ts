// import { TQuestBlock } from "shared/_Types/TQuestBlock";
// import { CollectionService } from "@rbxts/services";
// import { TGameCharacter } from "shared/_Types/TGameCharacter";
// import { Players } from "@rbxts/services";
// import { QuestId } from "shared/_IDs/IDs_Quest";
// import PCController from "server/Controllers/PlayerCharacterController";
// import { AssignQuestToPlayer } from "shared/net/Remotes";

// const tagName = "QuestBlock";

// class QuestBlock {
// 	_Instance: TQuestBlock;
// 	questId: string;

// 	constructor(instance: TQuestBlock) {
// 		this._Instance = instance;
// 		this.questId = instance.QuestId.Value;
// 		this._Instance.SurfaceGui.TextLabel.Text = this.questId;

// 		this._Instance.Touched.Connect((hit) => {
// 			const character: TGameCharacter = hit.FindFirstAncestorWhichIsA("Model") as TGameCharacter;
// 			const player = Players.GetPlayerFromCharacter(character);

// 			if (!player) return;

// 			// const playerCharacter = PCController.GetPlayerCharacter(player);
// 			// if (playerCharacter?.OnAssignQuest(this.questId as QuestId)) {
// 			// 	AssignQuestToPlayer(player, this.questId);
// 			// }
// 		});
// 	}
// }

// export default function StartQuestBlockCollection() {
// 	const questBlocks = CollectionService.GetTagged(tagName);
// 	questBlocks.forEach((instance) => {
// 		new QuestBlock(instance as TQuestBlock);
// 	});

// 	CollectionService.GetInstanceAddedSignal(tagName).Connect((instance) => {
// 		new QuestBlock(instance as TQuestBlock);
// 	});

// 	CollectionService.GetInstanceRemovedSignal(tagName).Connect((instance) => {
// 		// Remove QuestBlock
// 	});
// }
