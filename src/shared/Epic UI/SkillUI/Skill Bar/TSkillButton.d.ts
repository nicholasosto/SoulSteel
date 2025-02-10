export type TSkillButton = Frame & {
	UIListLayout: UIListLayout;
	SkillButton: ImageButton & {
		ImageFrame: Frame & {
			SkillImage: ImageLabel;
		};
		UICorner: UICorner;
		UIStroke: UIStroke;
		UIAspectRatioConstraint: UIAspectRatioConstraint;
	};
	CooldownBar: Frame;
};
