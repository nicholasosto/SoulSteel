import Logger from "shared/Utility/Logger";
const creepyMoan = "rbxassetid://472763153";

export default class AudioController {
	public static PlayAudio(audioId: string, volume: number = 1): void {
		const sound = new Instance("Sound");
		sound.SoundId = audioId;
		sound.Volume = volume;
		sound.Parent = game.Workspace;

		sound.Play();
	}

	public static PlayCreepyMoan(): void {
		Logger.Log(script, "Playing creepy moan");
		this.PlayAudio(creepyMoan, 0.5);
	}
}
