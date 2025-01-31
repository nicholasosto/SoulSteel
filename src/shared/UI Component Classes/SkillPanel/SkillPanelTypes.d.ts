import { TSkillPanel } from "./TSkillPanel";
import { TSkillBar } from "../../Skill Bar/TSkillBar";
import { TSkillButton } from "../../Skill Bar/TSkillButton";

type SkillPanelState = "Loading" | "SkillSelected" | "Displayed" | "Hidden";

type TSkillItemInfo = {
	DisplayName: string;
	Cooldown: number;
	Description: string;
};

export { SkillPanelState, TSkillItemInfo, TSkillPanel, TSkillBar, TSkillButton };
