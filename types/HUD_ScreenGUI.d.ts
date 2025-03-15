type HUD_ScreenGUI = ScreenGui & {
	Player_InfoFrame: Frame & {
		InfoFrame: Frame & {
			ProfilePic: ImageLabel;
			Name_Frame: Frame & {
				Text: Frame;
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
		Bars: Frame & {
			Progress: Frame & {
				ManaBar: Frame & {
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
				HealthBar: Frame & {
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
				UIListLayout: UIListLayout;
				StaminaBar: Frame & {
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
		Frame: Frame & {
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
		Developer_Button: ImageButton & {
			UICorner: UICorner;
			UIAspectRatioConstraint: UIAspectRatioConstraint;
		};
		Teleport_Button: ImageButton & {
			UICorner: UICorner;
			UIAspectRatioConstraint: UIAspectRatioConstraint;
		};
		Skills_Button: ImageButton & {
			UICorner: UICorner;
			UIAspectRatioConstraint: UIAspectRatioConstraint;
		};
		UIListLayout: UIListLayout;
		Character_Button: ImageButton & {
			UICorner: UICorner;
			UIAspectRatioConstraint: UIAspectRatioConstraint;
		};
		Settings_Button: ImageButton & {
			UICorner: UICorner;
			UIAspectRatioConstraint: UIAspectRatioConstraint;
		};
		Equipment_Button: ImageButton & {
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
