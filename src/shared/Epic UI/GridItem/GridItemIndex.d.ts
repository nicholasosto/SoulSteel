import { ImageIds } from "shared/Epic UI/ImageIds";
import { ResourceId } from "shared/Game Character/Character Resources/Resources";
import { SkillDefinition } from "shared/Skills/SkillIndex";

type GridItemState = "Locked" | "Unlocked" | "Equipped" | "Selected" | "Disabled";

type GridItemFrame = Frame & {
	GridItemButton: ImageButton & {
		UICorner: UICorner;
		TextLabel: TextLabel;
	};
	Frame: Frame & {
		SelectedStroke: UIStroke;
		Epic: UIGradient;
		Legendary: UIGradient;
		Common: UIGradient;
		Rare: UIGradient;
	};
	State: StringValue;
	Shudder: Frame & {
		LockedLabel: TextLabel;
		ImageLabel: ImageLabel;
	};
};

interface IGridItem {
	/**
	 * The state of the GridItem.
	 */
	state: GridItemState;

	/**
	 * The frame of the GridItem.
	 */
	frame: GridItemFrame;

	/**
	 * The icon of the GridItem.
	 */
	icon: ImageIds;

	/**
	 * The name of the GridItem.
	 */
	name: string;

	/**
	 * The description of the GridItem.
	 */
	description: string;

	/**
	 * The cooldown of the GridItem.
	 */
	cooldown: number;

	/**
	 * The resource cost of the GridItem.
	 */
	resourceCost: number;

	/**
	 * The resource type of the GridItem.
	 */
	resourceType: ResourceId;

	/**
	 * Whether the GridItem is unlocked.
	 */
	isUnlocked: boolean;

	/**
	 * Whether the GridItem is assigned.
	 */
	isAssigned?: boolean;

	/**
	 * The slot number for assigned GridItems.
	 */
	slot?: number;
}

export { GridItemState, GridItemFrame, IGridItem };
