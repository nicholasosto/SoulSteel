import { ReplicatedStorage } from "@rbxts/services";
import Logger from "shared/Utility/Logger";

const SharedPackage = {
	AbilityModels: ReplicatedStorage.WaitForChild("Asset Package - Ability Models") as Folder,
	Accessories: ReplicatedStorage.WaitForChild("Asset Package - Accessories") as Folder,
	Animations: ReplicatedStorage.WaitForChild("Asset Package - Animations") as Folder,

	Audio: ReplicatedStorage.WaitForChild("Asset Package - Audio") as Folder,
	Effects: ReplicatedStorage.WaitForChild("Asset Package - Effects") as Folder,
	Humanoids: ReplicatedStorage.WaitForChild("Asset Package - Humanoids") as Folder,
	NPCs: ReplicatedStorage.WaitForChild("Asset Package - NPC") as Folder,
};

export { SharedPackage };
