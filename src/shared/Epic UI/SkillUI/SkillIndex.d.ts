/* Skill Button */
type TSkillButton = Frame & {
	SkillButton: ImageButton & {
		ImageFrame: Frame & {
			SkillImage: ImageLabel;
		};
	};
	CooldownBar: Frame;
};

/* Skill Bar */
type TSkillBar = Frame & {
	Slot1: Frame & {
		Content: Frame;
	};
	Slot2: Frame & {
		Content: Frame;
	};
	Slot3: Frame & {
		Content: Frame;
	};
	Slot4: Frame & {
		Content: Frame;
	};
	Slot5: Frame & {
		Content: Frame;
	};
};

export { TSkillButton, TSkillBar };
