type CharacterFrame_Template = Frame & {
	Bars: Frame & {
		Progress: Frame & {
			["Stamina Bar"]: Frame & {
				Keys: Configuration & {
					Max: StringValue;
					Current: StringValue;
					ObjectType: StringValue;
					DisplayName: StringValue;
				};
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
			["Health Bar"]: Frame & {
				Keys: Configuration & {
					Max: StringValue;
					Current: StringValue;
					ObjectType: StringValue;
					DisplayName: StringValue;
				};
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
			["Mana Bar"]: Frame & {
				Keys: Configuration & {
					Max: StringValue;
					Current: StringValue;
					ObjectType: StringValue;
					DisplayName: StringValue;
				};
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
			UIListLayout: UIListLayout;
			ExperienceBar: Frame & {
				Keys: Configuration & {
					Max: StringValue;
					Current: StringValue;
					ObjectType: StringValue;
					DisplayName: StringValue;
				};
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
		UIGradient: UIGradient;
		UIPadding: UIPadding;
		UICorner: UICorner;
	};
	Info: Frame & {
		CharacterName: Frame & {
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
		ProfilePic: ImageLabel;
		LevelCounter: ImageLabel & {
			Background: Frame & {
				["Color 2"]: ImageLabel;
				Shadow: ImageLabel;
				Stroke: ImageLabel;
				["Color 1"]: ImageLabel & {
					UIGradient: UIGradient;
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
				ObjectTextLabel: ObjectValue;
				ObjectTextLabelStroke: ObjectValue;
			};
			Scripts: Folder & {
				ExtendTextWithStrokeLocalScript: LocalScript;
			};
		};
		["Ring1-Main"]: ImageLabel & {
			UIGradient: UIGradient;
		};
		["Ring2-Inner"]: ImageLabel & {
			UIGradient: UIGradient;
		};
		Background: ImageLabel & {
			UIGradient: UIGradient;
		};
	};
	UIAspectRatioConstraint: UIAspectRatioConstraint;
}
