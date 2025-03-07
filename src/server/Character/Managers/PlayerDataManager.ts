import Logger from "shared/Utility/Logger";
import { DataStoreService } from "@rbxts/services";
import IDataManager from "shared/_Interfaces/Character Managers/IDataManager";
import IPlayerCharacter from "shared/_Interfaces/IPlayerCharacter";
import IPlayerData from "shared/_Interfaces/Player Data/IPlayerData";

const PlayerDataStore = DataStoreService.GetDataStore("PlayerData-X01");

const DefualtData: IPlayerData = {
	key: "Datatemplate",
	version: 1,

	CharacterIdentity: {
		CharacterId: "Player",
		CharacterName: "Player",
	},
	ProgressionStats: {
		Level: 1,
		Experience: 0,
		ExperienceToNextLevel: 100,
	},
	CharacterClass: {
		ClassId: "Vampire",
		ClassLevel: 1,
		ClassPoints: 0,
		ClassExperience: 0,
		ClassExperienceToNextLevel: 100,
	},
	CharacterStats: {
		Strength: 14,
		Speed: 9,
		Dexterity: 3,
		Intelligence: 5,
		Constitution: 7,
	},
	Skills: {
		unlockedSkills: ["BasicHold", "BasicMelee", "BasicRanged", "HallowHold"],
		assignedSlots: ["HallowHold", "BasicMelee", "BasicRanged"],
	},
	Equipment: {
		EquipmentSlots: [],
	},
	Inventory: {
		InventorySlots: [],
	},
	QuestData: {
		activeQuests: [],
		completedQuests: [],
	},
};

export default class PlayerDataManager implements IDataManager {
	//private _playerCharacter: IPlayerCharacter;
	private _userId: string;
	private _playerData: IPlayerData = DefualtData;
	private _lastSaveTime: number = 0;
	private _saveInterval = 5;

	constructor(playerCharacter: IPlayerCharacter) {
		this._userId = tostring(playerCharacter.player.UserId);
		this._playerData = this._LoadData();
	}

	/* Update Identity */
	public UpdateCharacterName(newIdentity: IPlayerData["CharacterIdentity"]["CharacterName"]): void {
		this._playerData.CharacterIdentity.CharacterName = newIdentity;
	}

	/* Update Progression Stats */
	public UpdateProgressionStats(newStats: IPlayerData["ProgressionStats"]): void {
		this._playerData.ProgressionStats = newStats;
	}

	/* Get Data */
	public GetData(): IPlayerData {
		return this._playerData as IPlayerData;
	}

	/* On Death */
	public OnDeath(): void {
		warn("Player Died - Data Manager");
		this._SaveData();
	}

	/* Save Data */
	private _SaveData(): void {
		/* Calculate Save Interval */
		const timeSinceLastSave = tick() - this._lastSaveTime;

		/* Check Save Interval */
		if (timeSinceLastSave < this._saveInterval) {
			print("Time Check - Save Interval Not Met: " + timeSinceLastSave);
			return;
		} else {
			print("Time Check - Save Interval Met: " + timeSinceLastSave);

			/* Save Data */
			this._lastSaveTime = tick();
			PlayerDataStore.SetAsync(this._userId, this._playerData);
		}
	}

	/* Load Data */
	private _LoadData(): IPlayerData {
		/* Load Data */
		const playerData = PlayerDataStore.GetAsync(this._userId)[0] as IPlayerData;
		if (playerData === undefined) {
			warn("Player Data is nil, returning default data");
			this._playerData = DefualtData;
			this._SaveData();
			return DefualtData;
		}
		return playerData;
	}
}
