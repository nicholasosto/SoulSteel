type SkillGrid_Template = Frame & {
	UICorner: UICorner;
	["UIStroke "]: UIStroke;
	Content: Frame & {
		ScrollingFrame: ScrollingFrame & {
			UIGridLayout: UIGridLayout;
		};
	};
	Background: Frame & {
		Color: Frame & {
			UICorner: UICorner;
		};
		Shadow: Frame & {
			UICorner: UICorner;
		};
	};
}
