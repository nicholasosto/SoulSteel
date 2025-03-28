import Fusion from "@rbxts/fusion";

const { New, Children, Value, Computed, OnEvent } = Fusion;

// Style constants (following your Core Style Guide)
const Styles = {
	Colors: {
		PrimaryBase: Color3.fromHex("141414"),
		PrimaryAccent: Color3.fromHex("FFD23F"),
		SecondaryAccent: Color3.fromHex("50C2C9"),
		Panel: Color3.fromHex("1E1E1E"),
		Text: Color3.fromHex("FFFFFF"),
		MutedText: Color3.fromHex("CFCFCF"),
	},
	Fonts: {
		Title: Enum.Font.GothamBold,
		Body: Enum.Font.Gotham,
	},
	TextSizes: {
		Title: 32,
		Body: 18,
		Caption: 14,
	},
	Spacing: {
		Padding: 16,
		Margin: 8,
	},
};

interface CharacterCreationProps {
	displayName: string;
	onCreate: () => void;
}

const Races = ["Human", "Elf", "Dwarf", "Orc"];
const Locations = ["Highlands", "Coast", "Desert"];

export default function CharacterCreationScreen(props: CharacterCreationProps) {
	const selectedRace = Value("Human");
	const selectedLocation = Value("Highlands");

	const detailsText = Computed(() => {
		const race = selectedRace.get();
		const location = selectedLocation.get();
		const abilities = race === "Elf" ? "Invisibility" : race === "Dwarf" ? "Stone Skin" : "Heal";
		const statMod = race === "Elf" ? "+2 Agility" : race === "Dwarf" ? "+2 Strength" : "+2 Dexterity";
		return `${location} — ${race}\nStarting Abilities: ${abilities}\nStat Modifiers: ${statMod}`;
	});

	return New("ScreenGui")({
		ResetOnSpawn: false,
		Name: "CharacterCreationScreen",
		IgnoreGuiInset: true,
		[Children]: [
			New("Frame")({
				Size: UDim2.fromOffset(600, 500),
				Position: UDim2.fromScale(0.5, 0.5),
				AnchorPoint: new Vector2(0.5, 0.5),
				BackgroundColor3: Styles.Colors.PrimaryBase,
				BorderSizePixel: 0,
				[Children]: [
					New("TextLabel")({
						Text: "Player Character Creation",
						Font: Styles.Fonts.Title,
						TextSize: Styles.TextSizes.Title,
						TextColor3: Styles.Colors.Text,
						BackgroundTransparency: 1,
						Size: UDim2.fromScale(1, 0.1),
						Position: UDim2.fromScale(0, 0),
					}),
					New("TextBox")({
						PlaceholderText: "Enter Display Name",
						Font: Styles.Fonts.Body,
						TextSize: Styles.TextSizes.Body,
						TextColor3: Styles.Colors.Text,
						BackgroundColor3: Styles.Colors.Panel,
						Size: UDim2.fromScale(1, 0.1),
						Position: UDim2.fromScale(0, 0.1),
					}),
					// Race Selection
					...Races.map((race, index) =>
						New("TextButton")({
							Text: race,
							Size: UDim2.fromScale(0.3, 0.07),
							Position: UDim2.fromOffset(20, 150 + index * 40),
							Font: Styles.Fonts.Body,
							TextSize: Styles.TextSizes.Body,
							BackgroundColor3: Computed(() =>
								selectedRace.get() === race ? Styles.Colors.PrimaryAccent : Styles.Colors.Panel,
							),
							TextColor3: Styles.Colors.Text,
							[OnEvent("MouseButton1Click")]: () => {
								print("Clickity Clack");
							},
						}),
					),

					// Location Selection
					...Locations.map((loc, index) =>
						New("TextButton")({
							Text: loc,
							Size: UDim2.fromScale(0.3, 0.07),
							Position: UDim2.fromOffset(220, 150 + index * 40),
							Font: Styles.Fonts.Body,
							TextSize: Styles.TextSizes.Body,
							BackgroundColor3: Computed(() =>
								selectedLocation.get() === loc ? Styles.Colors.SecondaryAccent : Styles.Colors.Panel,
							),
							TextColor3: Styles.Colors.Text,
							[OnEvent("MouseButton1Click")]: () => {
								print("Clickity Clack 2");
							},
						}),
					),

					// Details Box
					New("TextLabel")({
						Text: detailsText,
						Size: UDim2.fromScale(0.9, 0.2),
						Position: UDim2.fromScale(0.05, 0.7),
						Font: Styles.Fonts.Body,
						TextSize: Styles.TextSizes.Body,
						TextWrapped: true,
						TextColor3: Styles.Colors.Text,
						BackgroundColor3: Styles.Colors.Panel,
						BorderSizePixel: 0,
					}),

					// Create Button
					New("TextButton")({
						Text: "Create",
						Font: Styles.Fonts.Body,
						TextSize: Styles.TextSizes.Body,
						TextColor3: Color3.fromRGB(0, 0, 0),
						BackgroundColor3: Styles.Colors.PrimaryAccent,
						Size: UDim2.fromOffset(160, 40),
						Position: UDim2.fromScale(0.5, 0.93),
						AnchorPoint: new Vector2(0.5, 1),
						[OnEvent("MouseButton1Click")]: () => {
							print("Character Created!");
							props.onCreate();
						},
					}),
				],
			}),
		],
	});
}
