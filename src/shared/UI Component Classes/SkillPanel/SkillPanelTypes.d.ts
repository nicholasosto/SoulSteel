import { TSkillPanel } from "./TSkillPanel";
import { TSkillBar } from "./TSkillBar";
import { TSkillButton } from "./TSkillButton";

type SkillPanelState = "Loading" | "SkillSelected" | "Displayed" | "Hidden";

type TSkillItemInfo = {
	DisplayName: string;
	Cooldown: number;
	Description: string;
};

export { SkillPanelState, TSkillItemInfo, TSkillPanel, TSkillBar, TSkillButton };
