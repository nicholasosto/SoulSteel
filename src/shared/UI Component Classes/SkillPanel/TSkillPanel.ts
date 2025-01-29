export type TSkillPanel = ScreenGui & {
	PanelContent: Frame & {
		UIListLayout: UIListLayout;
		TopContent: Frame & {
			UIListLayout: UIListLayout;
			SkillInfo_Parent: Frame & {
				UIListLayout: UIListLayout;
				AttributeLabel_Template: Frame & {
					UICorner: UICorner;
					AttributeName: TextLabel;
					AttributeValue: TextLabel & {
						UICorner: UICorner;
						UITextSizeConstraint: UITextSizeConstraint;
					};
					UIListLayout: UIListLayout;
				};
			};
			Scroll_Parent: Frame & {
				ScrollingFrame: ScrollingFrame & {
					UIListLayout: UIListLayout;
					GridItem_Template: Frame & {
						BackgroundFrame: Frame;
						Frame: Frame;
						Shudder: Frame;
						ImageLabel: ImageLabel;
					};
				};
			};
		};
		SkillBar_Frame: Frame & {
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
	};
	State: StringValue;
	TogglePanel: TextButton & {
		Hover: Frame & {
			UICorner: UICorner;
		};
		["UIStroke "]: UIStroke;
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
		Content: Frame & {
			UIListLayout: UIListLayout;
			Text: Frame & {
				TextLabel: TextLabel & {
					UITextSizeConstraint: UITextSizeConstraint;
					UIStroke: UIStroke;
				};
				["TextLabel - Stroke"]: TextLabel & {
					UITextSizeConstraint: UITextSizeConstraint;
				};
			};
			Image: Frame & {
				Icon: Frame & {
					["ImageLabel-Stroke"]: ImageLabel;
					UIAspectRatioConstraint: UIAspectRatioConstraint;
					ImageLabel: ImageLabel;
				};
			};
		};
	};
}
