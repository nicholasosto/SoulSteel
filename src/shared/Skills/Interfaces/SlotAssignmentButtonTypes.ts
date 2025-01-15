export type Skill_Assignment_Button = ImageButton & {
	Hover: ImageLabel;
	Scripts: Folder & {
		ExtendTextButtonLocalScript: LocalScript;
	};
	SlotNumber: NumberValue;
	SkillId: StringValue;
};
