// import { Players } from "@rbxts/services";
// import { TInfoFrame } from "shared/Epic UI/EpicIndex";
// import { TSkillBar } from "shared/Epic UI/Types/TSkillBar";
// import { ResourceId } from "shared/_IDs/IDs_Resource";
// import Logger from "shared/Utility/Logger";
// import { TQuestPanel } from "shared/Epic UI/Types/TQuestPanel";
// import { TSkillPanel } from "../GUI_ComponentClasses/Panels/SkillPanel";
// import ProgressBar from "shared/Epic UI/Classes/HUD Classes/CharacterFrame/ProgressBar";

// /* Main Screen GUI */
// const PlayerGUI = Players.LocalPlayer.WaitForChild("PlayerGui") as PlayerGui;
// const HUD_Screen = PlayerGUI.WaitForChild("HUD_ScreenGUI") as ScreenGui;
// const Developer_Screen = PlayerGUI.WaitForChild("Developer") as ScreenGui;
// const Equipment_Screen = PlayerGUI.WaitForChild("Equipment") as ScreenGui;
// const Character_Screen = PlayerGUI.WaitForChild("Character") as ScreenGui;
// const Teleport_Screen = PlayerGUI.WaitForChild("Teleport") as ScreenGui;
// const Skills_Screen = PlayerGUI.WaitForChild("Skill_Panel") as ScreenGui;
// const Settings_Screen = PlayerGUI.WaitForChild("Settings") as ScreenGui;
// const QuestPanelGUI = PlayerGUI.WaitForChild("Quests") as ScreenGui;
// warn("GamePanelGUI's loaded");
// /* Store Screen */
// //const Store_Screen = PlayerGUI.WaitForChild("Store UI Pack").WaitForChild("Gui").WaitForChild("ScreenGui") as ScreenGui;

// /*Attributes GUI */
// const AttributesFrame = (
// 	PlayerGUI.WaitForChild("GUI_ClassContainters").WaitForChild("AttributeController") as ObjectValue
// ).Value as Frame;

// /* HUD Elements */
// const MainMenuFrame = HUD_Screen.WaitForChild("MainMenu") as Frame;
// const CharacterFrameMaster = HUD_Screen.WaitForChild("CharacterInfo_Frame");
// const CharacterFrameInstance = CharacterFrameMaster.WaitForChild("InfoFrame") as TInfoFrame;
// const SkillBarInstance = HUD_Screen.WaitForChild("SkillBar_Frame") as TSkillBar;
// const ResourceBarParent = CharacterFrameMaster.WaitForChild("Bars").WaitForChild("Progress") as Frame;
// const HealthBarInstance = ResourceBarParent.WaitForChild("HealthBar") as Frame;
// const ManaBarInstance = ResourceBarParent.WaitForChild("ManaBar") as Frame;
// const StaminaBarInstance = ResourceBarParent.WaitForChild("StaminaBar") as Frame;
// const ExperienceBarInstance = ResourceBarParent.WaitForChild("ExperienceBar") as Frame;

// type GamePanelGui = ScreenGui & {
// 	ObjectValues: Folder;
// };

// /* GUI Panel Map */
// const GUIPanelMap = new Map<string, ScreenGui>([
// 	["HUD", HUD_Screen],
// 	["Skills", Skills_Screen],
// 	["Developer", Developer_Screen],
// 	["Equipment", Equipment_Screen],
// 	["Character", Character_Screen],
// 	["Teleport", Teleport_Screen],
// 	["Settings", Settings_Screen],
// 	["Quests", QuestPanelGUI],
// ]);

// const ResourceBarInstanceMap = new Map<ResourceId, ProgressBar>([
// 	["Health", new ProgressBar(HealthBarInstance)],
// 	["Mana", new ProgressBar(ManaBarInstance)],
// 	["Stamina", new ProgressBar(StaminaBarInstance)],
// 	["Experience", new ProgressBar(ExperienceBarInstance)],
// ]);

// /* Teleporter Buttons */
// const TeleportScrollFrame = Teleport_Screen.WaitForChild("Window")
// 	.WaitForChild("Content")
// 	.WaitForChild("Buttons")
// 	.WaitForChild("TeleportButtons") as Frame;

// const TeleportButtonsChildren = TeleportScrollFrame.GetChildren();
// const TeleportButtons = TeleportButtonsChildren.map((button) => button as TextButton);

// export {
// 	PlayerGUI,
// 	GUIPanelMap,
// 	HUD_Screen,
// 	Skills_Screen,
// 	Developer_Screen,
// 	Equipment_Screen,
// 	Character_Screen,
// 	TeleportScrollFrame,
// 	Settings_Screen,
// 	//Store_Screen,
// 	QuestPanelGUI,

// 	/* HUD Elements */
// 	AttributesFrame,
// 	MainMenuFrame,
// 	CharacterFrameInstance,
// 	SkillBarInstance,
// 	ResourceBarInstanceMap,

// 	/* Teleporter Buttons */
// 	TeleportButtons,
// };
