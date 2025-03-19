type PlayerHud = ScreenGui & {
	ObjectReferences: Folder;
	Player_InfoFrame: Frame & {
		OVExperienceBar: ObjectValue;
		Bars: Frame & {
			Progress: Frame & {
				Health: Frame & {
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
				Experience: Frame & {
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
				Stamina: Frame & {
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
				SoulPower: Frame & {
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
		UIAspectRatioConstraint: UIAspectRatioConstraint;
		InfoFrame: Frame & {
			ProfilePic: ImageLabel;
			Name_Frame: Frame & {
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
	};
	SkillBar_Frame: Frame & {
		Slot3: Frame & {
			UICorner: UICorner;
			UIAspectRatioConstraint: UIAspectRatioConstraint;
		};
		UISizeConstraint: UISizeConstraint;
		Slot1: Frame & {
			UICorner: UICorner;
			UIAspectRatioConstraint: UIAspectRatioConstraint;
		};
		UIListLayout: UIListLayout;
		Slot5: Frame & {
			UICorner: UICorner;
			UIAspectRatioConstraint: UIAspectRatioConstraint;
		};
		Slot4: Frame & {
			UICorner: UICorner;
			UIAspectRatioConstraint: UIAspectRatioConstraint;
		};
		Slot2: Frame & {
			UICorner: UICorner;
			UIAspectRatioConstraint: UIAspectRatioConstraint;
		};
	};
	MenuButton_Frame: Frame & {
		Equipment: ImageButton & {
			UICorner: UICorner;
			UIAspectRatioConstraint: UIAspectRatioConstraint;
		};
		Character: ImageButton & {
			UICorner: UICorner;
			UIAspectRatioConstraint: UIAspectRatioConstraint;
		};
		Settings: ImageButton & {
			UICorner: UICorner;
			UIAspectRatioConstraint: UIAspectRatioConstraint;
		};
		Teleport: ImageButton & {
			UICorner: UICorner;
			UIAspectRatioConstraint: UIAspectRatioConstraint;
		};
		UIListLayout: UIListLayout;
		Skills: ImageButton & {
			UICorner: UICorner;
			UIAspectRatioConstraint: UIAspectRatioConstraint;
		};
		Developer: ImageButton & {
			UICorner: UICorner;
			UIAspectRatioConstraint: UIAspectRatioConstraint;
		};
	};
	Target_InfoFrame: Frame & {
		Bars: Frame & {
			Progress: Frame & {
				["Progress Bar 1"]: Frame & {
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
				["Progress Bar 2"]: Frame & {
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
			};
			UIGradient: UIGradient;
			UIPadding: UIPadding;
			UICorner: UICorner;
		};
		Info: Frame & {
			ImageLabel: ImageLabel;
			["Ring1-Main"]: ImageLabel & {
				UIGradient: UIGradient;
			};
			Background: ImageLabel & {
				UIGradient: UIGradient;
			};
			["Ring2-Inner"]: ImageLabel & {
				UIGradient: UIGradient;
			};
			Counter: ImageLabel & {
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
		};
		UIAspectRatioConstraint: UIAspectRatioConstraint;
	};
}
