import Fusion from "@rbxts/fusion";
import { PlayerState } from "shared/__FusionSystem/PlayerState";
import { PlayerProgressionVO } from "client/_Fusions/PlayerDataObjects";

const { New, Children } = Fusion;

export function LevelCounter() {
	return New("TextLabel")({
		Name: "LevelCounter",
		Size: new UDim2(1, 0, 0, 30),
		Position: new UDim2(0, 0, 0, 0),
		BackgroundTransparency: 1,
		Text: `Level: ${PlayerProgressionVO.PlayerLevel.get()} | Experience: ${PlayerProgressionVO.CurrentExperience.get()} / ${PlayerProgressionVO.ExperienceToNextLevel.get()}`,
		TextColor3: Color3.fromRGB(255, 255, 255),
		TextSize: 20,
		TextScaled: true,
		Font: Enum.Font.LuckiestGuy,
		TextStrokeColor3: Color3.fromRGB(0, 0, 0),
		TextStrokeTransparency: 0.5,
		AnchorPoint: new Vector2(0, 0),
		Active: true,
	});
}
