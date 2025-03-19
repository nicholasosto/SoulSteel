import Fusion from "@rbxts/fusion";
import { FusionResourceBar, FusionResourceBarProps } from "../BaseComponentClasses/FustionResourceBar";
import { PlayerProgressionVO, PlayerResourceVO } from "../PlayerDataObjects";

const { New, Children } = Fusion;

const healthBarProps: FusionResourceBarProps = {
	currentValue: PlayerResourceVO.CurrentHealth,
	maxValue: PlayerResourceVO.MaxHealth,
	name: "Health",
	color: new Color3(1, 0, 0), // Red for health
};
const soulPowerBarProps: FusionResourceBarProps = {
	currentValue: PlayerResourceVO.CurrentSoulPower,
	maxValue: PlayerResourceVO.MaxSoulPower,
	name: "Soul Power",
	color: new Color3(0, 0, 1), // Blue for soul power
};
const staminaBarProps: FusionResourceBarProps = {
	currentValue: PlayerResourceVO.CurrentStamina,
	maxValue: PlayerResourceVO.MaxStamina,
	name: "Stamina",
	color: new Color3(0, 1, 0), // Green for stamina
};
const domainBarProps: FusionResourceBarProps = {
	currentValue: PlayerResourceVO.CurrentDomainResource,
	maxValue: PlayerResourceVO.MaxDomainResource,
	name: "Domain",
	color: new Color3(1, 1, 0), // Yellow for domain
};
const ExperienceBarProps: FusionResourceBarProps = {
	currentValue: PlayerProgressionVO.CurrentExperience,
	maxValue: PlayerProgressionVO.ExperienceToNextLevel,
	name: "Experience",
	color: new Color3(1, 0.5, 0), // Orange for experience
};

const ResourceBarGroup = New("Frame")({
	Name: "ResourceBarGroup",
	Size: new UDim2(0, 400, 0, 180), // Adjust size as needed
	BackgroundColor3: new Color3(0.2, 0.2, 0.2),
	BackgroundTransparency: 0.5,
	Position: new UDim2(0.5, -200, 0.5, -90), // Center the frame
	[Children]: [
		New("UIListLayout")({
			SortOrder: Enum.SortOrder.LayoutOrder,
			Padding: new UDim(0, 5),
		}),
		FusionResourceBar(healthBarProps),
		FusionResourceBar(soulPowerBarProps),
		FusionResourceBar(staminaBarProps),
		FusionResourceBar(domainBarProps),
		FusionResourceBar(ExperienceBarProps),
	],
});

export default ResourceBarGroup;
