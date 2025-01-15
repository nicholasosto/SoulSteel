export type TSkillBar= Frame & {
	UICorner: UICorner;
	["UIStroke "]: UIStroke;
	Background: Frame & {
		Color: Frame & {
			UICorner: UICorner;
		};
		Shadow: Frame & {
			UICorner: UICorner;
		};
	};
	ActionBarMain: Frame & {
		Slot3: Frame & {
			["UIStroke "]: UIStroke;
			UIAspectRatioConstraint: UIAspectRatioConstraint;
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
			Content: Frame;
			BinderConfig: Configuration & {
				Button: ObjectValue;
				AbilityName: StringValue;
				ProgressBar: ObjectValue;
				DisplayName: StringValue;
			};
		};
		Slot1: Frame & {
			["UIStroke "]: UIStroke;
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
			Content: Frame;
			UIAspectRatioConstraint: UIAspectRatioConstraint;
		};
		UIListLayout: UIListLayout;
		Slot5: Frame & {
			["UIStroke "]: UIStroke;
			UIAspectRatioConstraint: UIAspectRatioConstraint;
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
			Content: Frame;
			BinderConfig: Configuration & {
				Button: ObjectValue;
				AbilityName: StringValue;
				ProgressBar: ObjectValue;
				DisplayName: StringValue;
			};
		};
		Slot4: Frame & {
			["UIStroke "]: UIStroke;
			UIAspectRatioConstraint: UIAspectRatioConstraint;
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
			Content: Frame;
			BinderConfig: Configuration & {
				Button: ObjectValue;
				AbilityName: StringValue;
				ProgressBar: ObjectValue;
				DisplayName: StringValue;
			};
		};
		Slot2: Frame & {
			["UIStroke "]: UIStroke;
			UIAspectRatioConstraint: UIAspectRatioConstraint;
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
			Content: Frame;
			BinderConfig: Configuration & {
				Button: ObjectValue;
				AbilityName: StringValue;
				ProgressBar: ObjectValue;
				DisplayName: StringValue;
			};
		};
	};
}
