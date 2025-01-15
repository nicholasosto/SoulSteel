import { GridItemFrame, GridItemState, IGridItem } from "./GridItemIndex";
import { ImageIds } from "shared/_References/ImageIds";
import { ResourceId } from "shared/_References/Resources";
import { StorageManager } from "shared/_References/Managers/StorageManager";
import { SkillId } from "shared/Skills/SkillIndex";

export default class GridItem implements IGridItem {
	state: GridItemState = "Disabled";
	frame: GridItemFrame = StorageManager.CloneFromStorage("GridItemFrame") as GridItemFrame;
	icon: ImageIds = ImageIds.DefaultIcon;
	name: string = "Default Name";
	description: string = "Default Description";
	cooldown: number = -1;
	resourceCost: number = -1;
	resourceType: ResourceId = "Health";
	isUnlocked: boolean;
	assigned?: boolean;
	slot?: number;

	constructor(itemId: SkillId | string) {
		this.isUnlocked = false;

	}
}
