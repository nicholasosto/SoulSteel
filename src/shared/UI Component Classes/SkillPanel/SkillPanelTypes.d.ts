import { TSkillPanel } from "./TSkillPanel";
import { TSkillBar } from "../../Epic UI/Skill Bar/TSkillBar";
import { TSkillButton } from "../../Epic UI/Skill Bar/TSkillButton";

type SkillPanelState = "Loading" | "SkillSelected" | "Displayed" | "Hidden";

type TSkillItemInfo = {
	DisplayName: string;
	Cooldown: number;
	Description: string;
};

export { SkillPanelState, TSkillItemInfo, TSkillPanel, TSkillBar, TSkillButton };
