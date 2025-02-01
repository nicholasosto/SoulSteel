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
	CooldownBar: Frame & {
		Scripts: Folder & {
			ExtendBar1LocalScript: LocalScript;
		};
		Foreground: Frame & {
			Divisions: Frame & {
				["Line-50"]: Frame;
				["Line-30"]: Frame;
				["Line-80"]: Frame;
				["Line-40"]: Frame;
				["Line-10"]: Frame;
				["Line-20"]: Frame;
				["Line-70"]: Frame;
				["Line-90"]: Frame;
				["Line-60"]: Frame;
			};
			Bar: Frame & {
				Color: Frame & {
					Top: Frame & {
						UICorner: UICorner;
					};
					Bottom: Frame & {
						UIGradient: UIGradient;
						UICorner: UICorner;
					};
				};
			};
		};
		Text: Frame & {
			TextLabel: TextLabel & {
				UITextSizeConstraint: UITextSizeConstraint;
				UIStroke: UIStroke;
			};
			["TextLabel - Stroke"]: TextLabel & {
				UITextSizeConstraint: UITextSizeConstraint;
			};
		};
		Configuration: Configuration & {
			ObjectTextLabelStroke: ObjectValue;
			ObjectBarDivisions: ObjectValue;
			ObjectTextLabel: ObjectValue;
			ObjectBar: ObjectValue;
		};
		Background: Frame & {
			Color: Frame & {
				UICorner: UICorner;
				["UIStroke "]: UIStroke;
			};
			Shadow: Frame & {
				UICorner: UICorner;
			};
		};
	};
};
