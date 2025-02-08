// GUI: Skill Grid
export type TSkillGrid = Frame & {
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
};
