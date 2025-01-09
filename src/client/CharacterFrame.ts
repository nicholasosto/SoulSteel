import { Players } from "@rbxts/services";
import { Logger } from "shared/Utility/Logger";
import { StorageManager } from "shared/_References/Managers/StorageManager";
import { CharacterFrameData } from "shared/Remotes";

export default class CharacterFrame {
	// Singleton
	private static instance: CharacterFrame;
	private static _player: Player = Players.LocalPlayer;
	private static _playerHUD: ScreenGui;

	private static _frameTemplate = StorageManager.CloneFromStorage("CharacterFrame_Template") as Frame;
	private static _frameData: CharacterFrameData | undefined;

	//UI Elements
	private static _profileImage: ImageLabel;
	private static _healthBar: Frame;
	private static _manaBar: Frame;
	private static _staminaBar: Frame;
	private static _expBar: Frame;
	private static _levelText: TextLabel;

	private constructor() {
		Logger.Log(script, "CharacterFrame created");

		// Get the player HUD
		CharacterFrame._playerHUD = Players.LocalPlayer.WaitForChild("PlayerGui").WaitForChild("HUD") as ScreenGui;
		CharacterFrame._frameTemplate.Parent = CharacterFrame._playerHUD;

		// Get the UI Elements
		CharacterFrame._profileImage = CharacterFrame._frameTemplate.FindFirstChild("ProfilePic", true) as ImageLabel;
		CharacterFrame._healthBar = CharacterFrame._frameTemplate.FindFirstChild("Health Bar", true) as Frame;
		CharacterFrame._manaBar = CharacterFrame._frameTemplate.FindFirstChild("Mana Bar", true) as Frame;
		CharacterFrame._staminaBar = CharacterFrame._frameTemplate.FindFirstChild("Stamina Bar", true) as Frame;
		CharacterFrame._expBar = CharacterFrame._frameTemplate.FindFirstChild("ExperienceBar", true) as Frame;

		assert(CharacterFrame._expBar !== undefined, "ExpBar not found");
		assert(CharacterFrame._healthBar !== undefined, "HealthBar not found");
		assert(CharacterFrame._manaBar !== undefined, "ManaBar not found");
		assert(CharacterFrame._staminaBar !== undefined, "StaminaBar not found");
		assert(CharacterFrame._profileImage !== undefined, "ProfilePic not found");
	}

	public static Start() {
		if (this.instance === undefined) {
			this.instance = new CharacterFrame();
		}
	}

	public static Update(frameData: CharacterFrameData) {
		Logger.Log(script, "CharacterFrame Updated: ", frameData as unknown as string);
		if (CharacterFrame._frameData === undefined) {
			CharacterFrame._frameData = frameData;
		}
		this._updateResourceBars(frameData);
		this._updateProfileImage();
	}

	private static async _updateProfileImage() {
		const userThumbnail = await Players.GetUserThumbnailAsync(
			this._player.UserId,
			Enum.ThumbnailType.AvatarBust,
			Enum.ThumbnailSize.Size420x420,
		);

		while (userThumbnail === undefined) {
			wait(1);
			Logger.Log(script, "Waiting for Profile Image to be ready");
			Logger.Log(script, "Profile Image Ready:Thumbnail: ", userThumbnail);
		}
		this._profileImage.Image = userThumbnail[0] as string;
	}

	private static _updateResourceBars(frameData: CharacterFrameData) {
		Logger.Log(script, "Updating Resource Bars" + CharacterFrame._frameData as unknown as string);
		const Health = {
			current: frameData.Health.Current,
			max: frameData.Health.Max,
		};
		wait(1);
		this._updateResourceBar("Health" , this._healthBar, Health.current, Health.max);
		this._updateResourceBar("Mana" ,this._manaBar, frameData.Mana.Current, frameData.Mana.Max);
		this._updateResourceBar("Stamina" ,this._staminaBar, frameData.Stamina.Current, frameData.Stamina.Max);
		this._updateResourceBar("XP" ,this._expBar, frameData.Experience.Current, frameData.Experience.Max);
	}

	private static _updateResourceBar(text:string, bar: Frame, current: number, max: number) {
		//Logger.Log(script, "Updating Resource Bar: ", bar.Name, current, max);
		const percentage = current / max;
		bar.SetAttribute("BarPercent", percentage * 100);
		bar.SetAttribute("TextValue", `${text}: ${current}/${max}`);
	}
}
