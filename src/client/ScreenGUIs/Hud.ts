import { Players } from "@rbxts/services";
import { TInfoFrame } from "shared/Epic UI/EpicInterfaces";
import { TSkillBar } from "shared/Epic UI/SkillUI/Skill Bar/TSkillBar";
import { ResourceId } from "shared/_Types/GameCharacterShared";
import Logger from "shared/Utility/Logger";

const PlayerGUI = Players.LocalPlayer.WaitForChild("PlayerGui") as PlayerGui;
const HUD_Screen = PlayerGUI.WaitForChild("HUD") as ScreenGui;
const CharacterFrameInstance = HUD_Screen.WaitForChild("CharacterInfo_Frame");
const CharacterInfoFrame = CharacterFrameInstance.WaitForChild("InfoFrame") as TInfoFrame;
const SkillBarInstance = HUD_Screen.WaitForChild("SkillBar_Frame") as TSkillBar;

const ResourceBarParent = CharacterFrameInstance.WaitForChild("Bars").WaitForChild("Progress") as Frame;

const HealthBarInstance = ResourceBarParent.WaitForChild("HealthBar") as Frame;
const ManaBarInstance = ResourceBarParent.WaitForChild("ManaBar") as Frame;
const StaminaBarInstance = ResourceBarParent.WaitForChild("StaminaBar") as Frame;
const ExperienceBarInstance = ResourceBarParent.WaitForChild("ExperienceBar") as Frame;

const ResourceBarInstanceMap = new Map<ResourceId, Frame>();

ResourceBarInstanceMap.set("Health", HealthBarInstance);
ResourceBarInstanceMap.set("Mana", ManaBarInstance);
ResourceBarInstanceMap.set("Stamina", StaminaBarInstance);
ResourceBarInstanceMap.set("Experience", ExperienceBarInstance);

export { CharacterInfoFrame, SkillBarInstance, ResourceBarInstanceMap };
