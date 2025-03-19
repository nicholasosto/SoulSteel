import Fusion, { Computed, Children } from "@rbxts/fusion";
import { ResourceBars, PlayerProgression } from "shared/_ROACT/Components/DataValueObjects";
import { Players, ContextActionService } from "@rbxts/services";

const { Value } = Fusion;

const LocalPlayer = Players.LocalPlayer;
const playerAvatar = Value(
	Players.GetUserThumbnailAsync(LocalPlayer.UserId, Enum.ThumbnailType.HeadShot, Enum.ThumbnailSize.Size420x420)[0],
);

const { New } = Fusion;

/**
 * Example computed values for each bar's fill percentage.
 * Adjust these to match your actual stats.
 */
const healthPct = Computed(
	() => ResourceBars.PlayerHealth.playerCurrentHealth.get() / ResourceBars.PlayerHealth.playerMaxHealth.get(),
);
const staminaPct = Computed(
	() => ResourceBars.PlayerStamina.playerCurrentStamina.get() / ResourceBars.PlayerStamina.playerMaxStamina.get(),
);
const soulPowerPct = Computed(
	() =>
		ResourceBars.PlayerSoulPower.playerCurrentSoulPower.get() /
		ResourceBars.PlayerSoulPower.playerMaxSoulPower.get(),
);
const xpPct = Computed(() => PlayerProgression.playerExperience.get() / PlayerProgression.experienceToNextLevel.get());

const healthText = Computed(
	() =>
		`${math.floor(healthPct.get() * 100)}% (${ResourceBars.PlayerHealth.playerCurrentHealth.get()} / ${ResourceBars.PlayerHealth.playerMaxHealth.get()})`,
);

const staminaText = Computed(
	() =>
		`${math.floor(staminaPct.get() * 100)}% (${ResourceBars.PlayerStamina.playerCurrentStamina.get()} / ${ResourceBars.PlayerStamina.playerMaxStamina.get()})`,
);

const soulPowerText = Computed(
	() =>
		`${math.floor(soulPowerPct.get() * 100)}% (${ResourceBars.PlayerSoulPower.playerCurrentSoulPower.get()} / ${ResourceBars.PlayerSoulPower.playerMaxSoulPower.get()})`,
);

const xpText = Computed(
	() =>
		`${math.floor(xpPct.get() * 100)}% (${PlayerProgression.playerExperience.get()} / ${PlayerProgression.experienceToNextLevel.get()})`,
);

// Helper function to create a bar frame
function createBar(color: Color3, percentage: Computed<number>, labelText?: Computed<string> | string): Instance {
	const textToDisplay = labelText
		? typeIs(labelText, "string")
			? labelText
			: Computed(() => labelText.get())
		: Computed(() => `${math.floor(percentage.get() * 100)}%`);

	return New("Frame")({
		Size: new UDim2(1, 0, 0, 20),
		BackgroundColor3: new Color3(0.2, 0.2, 0.2),
		BorderSizePixel: 0,
		[Children]: [
			// The colored fill
			New("Frame")({
				Size: Computed(() => new UDim2(percentage.get(), 0, 1, 0)),
				BackgroundColor3: color,
				BorderSizePixel: 0,
				[Children]: [
					New("UICorner")({
						CornerRadius: new UDim(0, 4),
					}),
				],
			}),
			// Label on top
			New("TextLabel")({
				Text: textToDisplay,
				Size: new UDim2(1, 0, 1, 0),
				BackgroundTransparency: 1,
				TextColor3: new Color3(1, 1, 1),
				Font: Enum.Font.GothamBold,
				TextScaled: true,
				ZIndex: 2,
			}),
			// Rounded corners for the bar container
			New("UICorner")({
				CornerRadius: new UDim(0, 4),
			}),
		],
	});
}

const CharacterFrame = New("Frame")({
	Size: new UDim2(0, 420, 0, 110),
	Position: new UDim2(0.05, 0, 0.05, 0), // Example position; adjust as needed
	BackgroundColor3: new Color3(0.07, 0.07, 0.07),
	BorderSizePixel: 0,
	[Children]: [
		// Rounded corners for the overall frame
		New("UICorner")({
			CornerRadius: new UDim(0, 8),
		}),
		// Player name label
		New("TextLabel")({
			Text: "PLAYER",
			Position: new UDim2(0, 95, 0, 5),
			Size: new UDim2(0, 300, 0, 30),
			BackgroundTransparency: 1,
			TextColor3: new Color3(1, 1, 1),
			Font: Enum.Font.GothamBold,
			TextScaled: true,
			TextXAlignment: Enum.TextXAlignment.Left,
			ZIndex: 2,
		}),
		// The circular avatar ring
		New("ImageLabel")({
			// Replace with your metallic ring image asset
			Image: "rbxassetid://12363845618",
			Position: new UDim2(0, 10, 0, 10),
			Size: new UDim2(0, 80, 0, 80),
			BackgroundTransparency: 1,
			ZIndex: 1,
			[Children]: [
				// The avatar image
				New("ImageLabel")({
					// Replace with the player's avatar or your own placeholder image
					Image: playerAvatar,
					Size: new UDim2(0.8, 0, 0.8, 0),
					AnchorPoint: new Vector2(0.5, 0.5),
					Position: new UDim2(0.5, 0, 0.5, 0),
					BackgroundTransparency: 1,
					ZIndex: 2,
					[Children]: [
						// Make the avatar image a circle
						New("UICorner")({
							CornerRadius: new UDim(1, 0),
						}),
					],
				}),
			],
		}),
		// Level circle
		New("Frame")({
			Position: new UDim2(0, 60, 0, 60), // Slightly overlapping the bottom-right of the ring
			Size: new UDim2(0, 30, 0, 30),
			BackgroundColor3: new Color3(0.2, 0.2, 0.2),
			BorderSizePixel: 0,
			ZIndex: 3,
			[Children]: [
				New("UICorner")({
					CornerRadius: new UDim(1, 0),
				}),
				New("TextLabel")({
					Text: Computed(() => `${PlayerProgression.playerLevel.get()}`),
					Size: new UDim2(1, 0, 1, 0),
					BackgroundTransparency: 1,
					TextColor3: new Color3(1, 1, 1),
					Font: Enum.Font.GothamBold,
					TextScaled: true,
					ZIndex: 4,
				}),
			],
		}),
		// Resource bars container
		New("Frame")({
			Position: new UDim2(0, 95, 0, 40),
			Size: new UDim2(1, -105, 1, -50),
			BackgroundTransparency: 1,
			[Children]: [
				// Stack the bars vertically
				New("UIListLayout")({
					Padding: new UDim(0, 5),
					FillDirection: Enum.FillDirection.Vertical,
					SortOrder: Enum.SortOrder.LayoutOrder,
				}),
				// Health bar (red)
				createBar(new Color3(1, 0, 0), healthPct, healthText),
				// Stamina bar (blue)
				createBar(new Color3(1, 0.6, 0), staminaPct, staminaText),
				// Soul Power bar (yellow)
				createBar(new Color3(0.81, 0.06, 0.75), soulPowerPct, soulPowerText),
				// XP bar (green) with custom text
				createBar(new Color3(0, 1, 0), xpPct, xpText),
			],
		}),
	],
});

export { CharacterFrame };
