import Logger from "shared/Utility/Logger";
import { DataStoreService, Players } from "@rbxts/services";
import IDataManager from "shared/_Interfaces/Character Managers/IDataManager";
import IPlayerCharacter from "shared/_Interfaces/IPlayerCharacter";
import IPlayerData from "shared/_Interfaces/Player Data/IPlayerData";
import { Remotes, AttributePanelData } from "shared/net/Remotes";
import { SkillId, SkillPanelData, SkillSlotId } from "shared/_IDs/SkillIndex";
import { InfoFramePayload, TPanelData } from "shared/net/RemoteIndex";

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
	AvaliableAttributePoints: 110,
	SpentAttributePoints: 0,
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
	private _saveInterval = 15;
	private _player: Player;

	constructor(playerCharacter: IPlayerCharacter) {
		this._player = playerCharacter.player;
		this._userId = tostring(playerCharacter.player.UserId);
		this._playerData = this._LoadData();

		task.spawn(() => {
			warn("Player Data Save Service Started");
			while (this._userId !== undefined) {
				warn("Player Data Save Service Running");
				this._SaveData();
				wait(this._saveInterval);

				Remotes.Server.Get("SendPlayerData").SendToPlayer(this._player, this._playerData);
			}
		});
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

	public UpdateAttributesData(attributePanelData: AttributePanelData): void {
		this._playerData.CharacterStats = attributePanelData.characterStats;
		this._playerData.AvaliableAttributePoints = attributePanelData.availablePoints;
		this._playerData.SpentAttributePoints = attributePanelData.spentPoints;
		this._SaveData();
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

	public GetPayload(payloadId: string): unknown {
		switch (payloadId) {
			case "SkillPanel":
				return this._playerData.Skills;
			default:
				return undefined;
		}
	}

	public GetSkillPanelData(): SkillPanelData | undefined {
		const skillPanelData = {
			SlotMap: this.GetSkillSlotMap(),
			UnlockedSkills: this._playerData.Skills.unlockedSkills,
		};
		return skillPanelData as SkillPanelData | undefined;
	}

	public GetSkillSlotMap(): Map<SkillSlotId, SkillId> {
		const skillSlotMap = new Map<SkillSlotId, SkillId>();
		const slotPrefix = "Slot_";
		for (let i = 0; i < this._playerData.Skills.assignedSlots.size(); i++) {
			const slotId = `${slotPrefix}${string.format("%02d", i + 1)}` as SkillSlotId;
			const skillId = this._playerData.Skills.assignedSlots[i] as SkillId;
			skillSlotMap.set(slotId, skillId);
		}
		return skillSlotMap;
	}
}
