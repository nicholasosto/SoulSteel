export type DialogTemplateType = Frame & {
	["UIStroke "]: UIStroke;
	Close: Frame & {
		UIAspectRatioConstraint: UIAspectRatioConstraint;
		UISizeConstraint: UISizeConstraint;
		ImageButton: ImageButton & {
			UICorner: UICorner;
			["UIStroke "]: UIStroke;
			Background: Frame & {
				Color2: Frame & {
					UICorner: UICorner;
				};
				Shadow: Frame & {
					UICorner: UICorner;
				};
				Color1: Frame & {
					UICorner: UICorner;
				};
			};
		};
	};
	UICorner: UICorner;
	Background: Frame & {
		Color: Frame & {
			UICorner: UICorner;
		};
		Shadow: Frame & {
			UICorner: UICorner;
		};
		Highlight: Frame & {
			UICorner: UICorner;
		};
		Gradient: Frame & {
			ImageLabel: ImageLabel & {
				UIAspectRatioConstraint: UIAspectRatioConstraint;
			};
		};
	};
	Content: Frame & {
		Body: Frame & {
			Text: Frame & {
				TextLabel: TextLabel & {
					UITextSizeConstraint: UITextSizeConstraint;
				};
			};
			Configuration: Configuration & {
				ObjectTextLabel: ObjectValue;
			};
			Scripts: Folder & {
				ExtendTextLocalScript: LocalScript;
			};
		};
		Header: Frame & {
			Line: Frame & {
				ImageLabel: ImageLabel;
			};
			Title: Frame & {
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
					ObjectTextLabel: ObjectValue;
					ObjectTextLabelStroke: ObjectValue;
				};
				Scripts: Folder & {
					ExtendTextWithStrokeLocalScript: LocalScript;
				};
			};
			UISizeConstraint: UISizeConstraint;
		};
		Footer: Frame & {
			UIListLayout: UIListLayout;
			TextButton1: TextButton & {
				Hover: Frame & {
					UICorner: UICorner;
				};
				["UIStroke "]: UIStroke;
				UISizeConstraint: UISizeConstraint;
				Scripts: Folder & {
					ExtendTextButtonLocalScript: LocalScript;
				};
				UICorner: UICorner;
				Background: Frame & {
					Shadow: Frame & {
						UICorner: UICorner;
					};
				};
				Configuration: Configuration & {
					ObjectTextLabelStroke: ObjectValue;
					ObjectHover: ObjectValue;
					ObjectTextLabel: ObjectValue;
				};
			};
			UISizeConstraint: UISizeConstraint;
			TextButton2: TextButton & {
				Hover: Frame & {
					UICorner: UICorner;
				};
				["UIStroke "]: UIStroke;
				UISizeConstraint: UISizeConstraint;
				Scripts: Folder & {
					ExtendTextButtonLocalScript: LocalScript;
				};
				UICorner: UICorner;
				Background: Frame & {
					Shadow: Frame & {
						UICorner: UICorner;
					};
				};
				Configuration: Configuration & {
					ObjectTextLabelStroke: ObjectValue;
					ObjectHover: ObjectValue;
					ObjectTextLabel: ObjectValue;
				};
			};
		};
	};
}
