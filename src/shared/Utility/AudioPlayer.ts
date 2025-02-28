import Logger from "shared/Utility/Logger";

const AudioAssets = {
	SoundEffects: {
		FINGER_SNAP: "rbxassetid://9114427906",
	},
	Music: {
		CreepyMoan: "rbxassetid://472763153",
	},
};

type AudioFile = {
	id: string;
	volume: number;
};

const AudioFiles: Map<string, AudioFile> = new Map([
	["creepyMoan", { id: AudioAssets.Music.CreepyMoan, volume: 0.2 }],
	["fingerSnap", { id: AudioAssets.SoundEffects.FINGER_SNAP, volume: 2 }],
]);

export default class AudioPlayer {
	public static PlayAudio(audioFile: AudioFile): void {
		const sound = new Instance("Sound");
		sound.SoundId = audioFile.id;
		sound.Volume = audioFile.volume;
		sound.Parent = game.Workspace;

		sound.Play();
	}

	public static PlayCreepyMoan(): void {
		Logger.Log(script, "Playing creepy moan");
		this.PlayAudio(AudioFiles.get("creepyMoan") as AudioFile);
	}
}

export { AudioFiles, AudioFile };
