type GridItem_Template = Frame & {
	GridItemButton: ImageButton & {
		UICorner: UICorner;
		TextLabel: TextLabel;
	};
	Frame: Frame & {
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
}
