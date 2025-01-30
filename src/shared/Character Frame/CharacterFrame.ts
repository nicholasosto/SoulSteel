import { TCharacterFrame, ICharacterInfo, IProgressBar, ICharacterFrame } from "./Index";
import { StorageManager } from "shared/_References/Managers/StorageManager";
import ProgressBar from "shared/Character Frame/Helpers/ResourceBar";
import CharacterInfo from "shared/Character Frame/Helpers/CharacterInfo";

export default class CharacterFrame implements ICharacterFrame {
	bars: {
		stamina: IProgressBar;
		health: IProgressBar;
		mana: IProgressBar;
		experience: IProgressBar;
	};

	info: ICharacterInfo;

	constructor(player: Player) {
		const frame = StorageManager.CloneFromStorage("CharacterFrame_Template") as TCharacterFrame;
		const playerHUD = player.WaitForChild("PlayerGui").WaitForChild("HUD");
		frame.Parent = playerHUD;

		this.bars = {
			stamina: new ProgressBar(frame.Bars.Progress["Stamina Bar"]),
			health: new ProgressBar(frame.Bars.Progress["Health Bar"]),
			mana: new ProgressBar(frame.Bars.Progress["Mana Bar"]),
			experience: new ProgressBar(frame.Bars.Progress["Experience Bar"]),
		};

		this.info = new CharacterInfo(frame.Info);
	}
}
