// import StorageManager from "shared/Storage Manager/StorageManager";
// import { TReferenceBlock } from "shared/Factories/Model Factory/References/ReferenceBlock";
// import { Players } from "@rbxts/services";
// import { TGameCharacter } from "shared/Game Character/TGameCharacter";
// import Logger from "shared/Utility/Logger";

// const ReferenceBlockInstance = StorageManager.CloneFromStorage("ReferenceBlock") as TReferenceBlock;

// Players.PlayerAdded.Connect((player) => {
// 	const character = (player.Character || player.CharacterAdded.Wait()[0]) as TGameCharacter;

// 	if (character) {
// 		character.TranslateBy(new Vector3(0, 1000, 0));
// 		Logger.Log(script, "Player Added", character.Name);
// 		const block = ReferenceBlockInstance?.Clone();
// 		block.PivotTo(character.GetPivot());
// 	}
// });
