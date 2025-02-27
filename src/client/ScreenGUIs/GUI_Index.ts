import { Players } from "@rbxts/services";
import { TInfoFrame } from "shared/Epic UI/EpicIndex";
import { TSkillBar } from "shared/Epic UI/Types/TSkillBar";
import { ResourceId } from "shared/_IDs/IDs_Resource";
import Logger from "shared/Utility/Logger";
import { TQuestPanel } from "shared/Epic UI/Types/TQuestPanel";

/* Main Screen GUI */
const PlayerGUI = Players.LocalPlayer.WaitForChild("PlayerGui") as PlayerGui;
const HUD_Screen = PlayerGUI.WaitForChild("HUD") as ScreenGui;
const Developer_Screen = PlayerGUI.WaitForChild("Developer") as ScreenGui;
const Equipment_Screen = PlayerGUI.WaitForChild("Equipment") as ScreenGui;
const Character_Screen = PlayerGUI.WaitForChild("Character") as ScreenGui;
const Teleport_Screen = PlayerGUI.WaitForChild("Teleport") as ScreenGui;
const Skills_Screen = PlayerGUI.WaitForChild("Skill_Panel") as ScreenGui;
const Settings_Screen = PlayerGUI.WaitForChild("Settings") as ScreenGui;
const QuestPanelGUI = PlayerGUI.WaitForChild("Quests") as TQuestPanel;
/* Store Screen */
//const Store_Screen = PlayerGUI.WaitForChild("Store UI Pack").WaitForChild("Gui").WaitForChild("ScreenGui") as ScreenGui;

/* HUD Elements */
const MainMenuFrame = HUD_Screen.WaitForChild("MainMenu") as Frame;
const CharacterFrameInstance = HUD_Screen.WaitForChild("CharacterInfo_Frame");
const InfoFrameInstance = CharacterFrameInstance.WaitForChild("InfoFrame") as TInfoFrame;
const SkillBarInstance = HUD_Screen.WaitForChild("SkillBar_Frame") as TSkillBar;
const ResourceBarParent = CharacterFrameInstance.WaitForChild("Bars").WaitForChild("Progress") as Frame;
const HealthBarInstance = ResourceBarParent.WaitForChild("HealthBar") as Frame;
const ManaBarInstance = ResourceBarParent.WaitForChild("ManaBar") as Frame;
const StaminaBarInstance = ResourceBarParent.WaitForChild("StaminaBar") as Frame;
const ExperienceBarInstance = ResourceBarParent.WaitForChild("ExperienceBar") as Frame;
const ResourceBarInstanceMap = new Map<ResourceId, Frame>();

/* Resource Bar Map */
ResourceBarInstanceMap.set("Health", HealthBarInstance);
ResourceBarInstanceMap.set("Mana", ManaBarInstance);
ResourceBarInstanceMap.set("Stamina", StaminaBarInstance);
ResourceBarInstanceMap.set("Experience", ExperienceBarInstance);

/* Teleporter Buttons */
const TeleportButtonsChildren = Teleport_Screen.WaitForChild("Window")
	.WaitForChild("Content")
	.WaitForChild("Scroller")
	.WaitForChild("TeleportButtons")
	.GetChildren();

const TeleportButtons = TeleportButtonsChildren.map((button) => button as TextButton);

/* Log Ready */
Logger.Log(script, "Loaded: GUI_Index");

export {
	PlayerGUI,
	HUD_Screen,
	Skills_Screen,
	Developer_Screen,
	Equipment_Screen,
	Character_Screen,
	Teleport_Screen,
	Settings_Screen,
	//Store_Screen,
	QuestPanelGUI,

	/* HUD Elements */
	MainMenuFrame,
	InfoFrameInstance,
	SkillBarInstance,
	ResourceBarInstanceMap,

	/* Teleporter Buttons */
	TeleportButtons,
};
