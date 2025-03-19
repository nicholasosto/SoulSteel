# Current Networking

## Client (ClientNetManager)

```ts
/* ClientNetManager.ts
 * Client Network Manager
 * Handles all client-side network interactions and UI updates
 */

/* Network Imports */
import { Players } from "@rbxts/services";
import { RemoteEvents, RemoteFunctions } from "shared/net/Remotes";
import * as Payload from "shared/net/RemoteIndex";
import { PlayerCurrency, PlayerStats, PlayerProgression, ResourceBars } from "shared/_ROACT/Components/DataValueObjects";

/* GUI Controllers */
import UIManager from "client/UI Controllers/UIManager";

/* Payloads */

/* FusionUpdates */
const OnSendResourceData = RemoteEvents.Client.Get("SendResourceData");

/* Remote Functions */
const GetSkillSlotMap = RemoteFunctions.Client.Get("GetSkillSlotMap"); // HUD - Skill Bar
const GetCharacterFrameData = RemoteFunctions.Client.Get("GetCharacterFrameData"); // Character Frame
const GetEquipmentSlotMap = RemoteFunctions.Client.Get("GetEquipmentSlotMap"); // Equipment Frame

/* Update Events */
const UpdateInfoFrame = RemoteEvents.Client.Get("UpdateInfoFrame"); // Info Frame
const UpdateSkillSlotMap = RemoteEvents.Client.Get("UpdateSkillSlotMap"); // HUD - Skill Bar
const SendPlayerData = RemoteEvents.Client.Get("SendPlayerData"); // Player Data Loaded

/* Skill Bar */

/* Character Frame - Resource Bars */

export default class ClientNetManager {
 private static _instance: ClientNetManager;

 /* Data Connections */
 private static _onSendPlayerData: RBXScriptConnection | undefined;

 /*Fusion Updates */
 private static _onResourceData: RBXScriptConnection | undefined;

 /* Panel Connections */
 private static _updateSkillPanel: RBXScriptConnection | undefined;

 /* HUD - GUI Element Updates */
 private static _updateSkillSlotMap: RBXScriptConnection | undefined;
 private static _updateCharacterFrame: RBXScriptConnection | undefined;
 private static _updatePlayerProgression: RBXScriptConnection | undefined;

 /* Constructor */
 private constructor() {}

 /* Start */
 public static async Start() {
  if (this._instance === undefined) {
   /* Client Network Manager */
   this._instance = new ClientNetManager();
   this.InitializeListeners();
   this._InitializePanelData();
  }
 }

 /* Initialize Listeners */
 private static InitializeListeners() {
  /* Fusion Updates */
  this._onResourceData?.Disconnect();
  this._onResourceData = OnSendResourceData.Connect((resourceData) => {
   // Handle the resource data received
   warn("NetManager: Received resource data:", resourceData);
   ResourceBars.PlayerHealth.playerCurrentHealth.set(resourceData.Health);
  });
  /* Player Data Loaded */
  this._onSendPlayerData?.Disconnect();
  this._onSendPlayerData = SendPlayerData.Connect((playerData) => {
   // Handle the player data received
   warn("NetManager: Received player data:", playerData);
   UIManager.OnPlayerDataLoaded(playerData);
   PlayerProgression.playerLevel.set(playerData.ProgressionStats.Level);
   PlayerProgression.playerExperience.set(playerData.ProgressionStats.Experience);
   PlayerStats.playerAttributePoints.set(playerData.AvaliableAttributePoints);
   PlayerStats.playerStrength.set(playerData.CharacterStats.Strength);
   PlayerStats.playerDexteriy.set(playerData.CharacterStats.Dexterity);
   PlayerStats.playerIntelligence.set(playerData.CharacterStats.Intelligence);
   PlayerStats.playerConstitution.set(playerData.CharacterStats.Constitution);
   PlayerCurrency.playerSoulChips.set(100);
   PlayerCurrency.playerSoulShards.set(50);
   PlayerCurrency.playerSoulGems.set(10);
  });
  /* Update Skill Slot Map */
  this._updateSkillSlotMap?.Disconnect();
  this._updateSkillSlotMap = UpdateSkillSlotMap.Connect((slotMap) => {
   warn("NetManager: Received skill slot map:", slotMap);
   UIManager.UpdateSkillBar(slotMap);
  });

  /* Resource Bar Connection */
  this._updateCharacterFrame?.Disconnect();
  this._updateCharacterFrame = UpdateInfoFrame.Connect((payload) => {
   // Handle the update info frame event
   UIManager.UpdateInfoFrame(payload);
  });
 }

 /* Initialize Panel Data */
 private static async _InitializePanelData() {
  /* Skill Slot Map */
  const skillSlotMap = await this.GetSkillSlotMap();
  if (skillSlotMap) {
   UIManager.UpdateSkillBar(skillSlotMap);
  }

  /* Character Frame Data */
  const characterFrameData = await this.GetCharacterFrameData();
  if (characterFrameData) {
   UIManager.UpdateInfoFrame(characterFrameData);
  }
 }

 /* Get Skill Slot Map */
 public static async GetSkillSlotMap() {
  const slotMap = await GetSkillSlotMap.CallServerAsync().then((result) => {
   return result as Payload.PSkillSlotMap | undefined;
  });
  return slotMap;
 }

 /* Get Equipment Slot Map */
 public static async GetEquippedItems() {
  const equipmentSlotMap = await GetEquipmentSlotMap.CallServerAsync().then((result) => {
   return result as Payload.PEquipmentSlotMap | undefined;
  });
  return equipmentSlotMap;
 }

 /* Get Equipment Inventory */
 public static async GetEquipmentInventory() {
  //TODO: Implement
  // StorageManager GetEquipmentInventory??
 }

 /* Get Character Frame Data */
 public static async GetCharacterFrameData() {
  const characterFrameData = await GetCharacterFrameData.CallServerAsync().then((result) => {
   return result as Payload.PInfoFrame | undefined;
  });
  return characterFrameData;
 }
}

Players.LocalPlayer.CharacterAdded.Connect(() => {
 ClientNetManager.Start();
 warn("Starting UIManager - Character Added");
 UIManager.Start();
 const skillSlotMap = ClientNetManager.GetSkillSlotMap().await()[1] as Payload.PSkillSlotMap | undefined;
 if (skillSlotMap) {
  UIManager.UpdateSkillBar(skillSlotMap);
 }
 const characterFrameData = ClientNetManager.GetCharacterFrameData().await()[1] as Payload.PInfoFrame | undefined;
 if (characterFrameData) {
  UIManager.UpdateInfoFrame(characterFrameData);
 }
});

Players.LocalPlayer.CharacterRemoving.Connect(() => {
 warn("Cleaning up UIManager - Character Removed");
});


```

## Server

```ts
import { RemoteEvents, RemoteFunctions } from "shared/net/Remotes";
import { SkillPanelData, SkillSlotMap } from "shared/_IDs/SkillIndex";
import { GetGameCharacter } from "shared/_Registry/EntityRegistration";
import PlayerCharacter from "server/Character/PlayerCharacter";
import * as Payloads from "shared/net/RemoteIndex";
import IPlayerData from "shared/_Interfaces/Player Data/IPlayerData";

/* Remote Functions */
const GetSlotMapData = RemoteFunctions.Server.Get("GetSkillSlotMap");
const GetEquipmentSlotMap = RemoteFunctions.Server.Get("GetEquipmentSlotMap");
const GetInfoFrameData = RemoteFunctions.Server.Get("GetCharacterFrameData");

/* Remote Events */
const UpdateSkillSlotMapEvent = RemoteEvents.Server.Get("UpdateSkillSlotMap");
const UpdateInfoFrameEvent = RemoteEvents.Server.Get("UpdateInfoFrame");
const SendPlayerData = RemoteEvents.Server.Get("SendPlayerData");
const TestSendEvent = RemoteEvents.Server.Get("TestSendEvent");

/* Fusion Updates */
const SendResourceData = RemoteEvents.Server.Get("SendResourceData");

/*Singleton*/
export default class ServerNetManager {
 /*Instance*/
 private static _instance: ServerNetManager;

 /* Data Connections */
 private static _onTestSend: RBXScriptConnection | undefined;

 /* Constructor */
 private constructor() {
  warn("ServerNetManager: Instantiated");
 }

 /* Start */
 public static Start() {
  if (this._instance === undefined) {
   this._instance = new ServerNetManager();
   print("ServerNetManager: Started");
   this.initializeListeners();
   this.InitializeCallbacks();
  }
 }

 private static initializeListeners() {
  /* Test Send Event */
  this._onTestSend?.Disconnect();
  this._onTestSend = TestSendEvent.Connect((player: Player, eventName: string) => {
   this._HandleTestSend(player, eventName);
  });
 }

 private static _HandleTestSend(player: Player, eventName: string) {
  switch (eventName) {
   case "EquipSkill":
    print(`TestSendEvent: ${player.Name} triggered EquipSkill`);
    break;
   case "UnequipSkill":
    print(`TestSendEvent: ${player.Name} triggered UnequipSkill`);
    break;
   default:
    print(`TestSendEvent: ${player.Name} triggered an unknown event: ${eventName}`);
    break;
  }
 }

 private static _getSkillPanelData(player: Player): SkillPanelData | undefined {
  const character = GetGameCharacter(tostring(player.UserId)) as PlayerCharacter | undefined;
  const skillPanelData = character?.dataManager?.GetSkillPanelData() as SkillPanelData | undefined;
  return skillPanelData;
 }

 private static _getSkillSlotMap(player: Player): Payloads.PSkillSlotMap | undefined {
  const character = GetGameCharacter(tostring(player.UserId)) as PlayerCharacter | undefined;
  const skillSlotMap = character?.dataManager?.GetSkillSlotMap() as SkillSlotMap | undefined;
  return skillSlotMap;
 }

 private static _getEquipmentSlotMap(player: Player): Payloads.PEquipmentSlotMap | undefined {
  const character = GetGameCharacter(tostring(player.UserId)) as PlayerCharacter | undefined;
  const equipmentSlotMap = character?.dataManager?.GetEquipmentSlotMap() as
   | Payloads.PEquipmentSlotMap
   | undefined;
  return equipmentSlotMap;
 }

 private static _getInfoFrameData(player: Player): Payloads.PInfoFrame | undefined {
  const character = GetGameCharacter(tostring(player.UserId)) as PlayerCharacter | undefined;
  const infoFrameData = character?.GetInfoFrameData() as Payloads.PInfoFrame | undefined;
  return infoFrameData;
 }

 /* Initialize Callbacks */
 private static InitializeCallbacks() {
  /*Get Skill Slot Map*/
  GetSlotMapData.SetCallback(async (player: Player) => {
   const skillSlotMap = this._getSkillSlotMap(player);
   return skillSlotMap;
  });

  /*Get Equipment Slot Map*/
  GetEquipmentSlotMap.SetCallback(async (player: Player) => {
   const skillPanelData = this._getEquipmentSlotMap(player);
   return skillPanelData;
  });

  /*Get InfoFrame Data*/
  GetInfoFrameData.SetCallback(async (player: Player) => {
   const infoFrameData = this._getInfoFrameData(player);
   return infoFrameData;
  });
 }

 public static SendPlayerData(player: Player, playerData: IPlayerData) {
  SendPlayerData.SendToPlayer(player, playerData);
 }

 /* Fusion Updates */
 public static SendResourceData(player: Player, resourceData: Payloads.PCurrentResourceAmounts) {
  SendResourceData.SendToPlayer(player, resourceData);
 }

 /* Send InfoFrame Update */
 public static SendInfoFrameUpdate(player: Player) {
  const infoFrameData = this._getInfoFrameData(player);
  if (infoFrameData !== undefined) {
   UpdateInfoFrameEvent.SendToPlayer(player, infoFrameData);
  }
 }

 /* Skill Slot Map (SkillBar) */
 public static SendSkillSlotMapUpdate(player: Player) {
  const skillSlotMap = this._getSkillSlotMap(player);
  if (skillSlotMap !== undefined) {
   UpdateSkillSlotMapEvent.SendToPlayer(player, skillSlotMap);
  }
 }
}


```

## Shared

### Payloads

```ts
import { SkillId, SkillSlotId } from "shared/_IDs/SkillIndex";
import { EquipmentId, EquipmentSlotId } from "shared/_IDs/EquipmentIndex";

type ResourceId = "Health" | "Stamina" | "SoulPower" | "DomainEssence" | "Experience";

/* Payloads */
/* Resource Bars */
type PResourceBar = {
 resourceId: ResourceId;
 current: number;
 max: number;
};
/* Resource Bars */
type PResourceBars = {
 [resourceId: string]: PResourceBar;
};

type PCurrentResourceAmounts = {
 Health: number;
 Stamina: number;
 SoulPower: number;
 DomainEssence: number;
 Experience: number;
};

/* Payload - InfoFrame */
interface PInfoFrame {
 Level: number;
 Name: string;
 Health: PResourceBar;
 Stamina: PResourceBar;
 SoulPower: PResourceBar;
 DomainEssence: PResourceBar;
 Experience: PResourceBar;
}

/* Payload - Generic Slot Map */
type PSkillSlotMap = Map<SkillSlotId, SkillId>;
type PEquipmentSlotMap = Map<EquipmentSlotId, EquipmentId>;

export {
 ResourceId,
 SkillId,
 PResourceBar,
 PResourceBars,
 PInfoFrame,
 PSkillSlotMap,
 PEquipmentSlotMap,
 PCurrentResourceAmounts,
};

```

### Remotes

```ts
/* Net Module */
import Net, { Definitions } from "@rbxts/net";

/* ID's */
import * as Payload from "shared/net/RemoteIndex";

/* Interfaces */
import IPlayerData from "shared/_Interfaces/Player Data/IPlayerData";

const RemoteEvents = Net.CreateDefinitions({
 /* ======== Client To Server Events =========*/
 ClientUpdateTarget: Net.Definitions.ClientToServerEvent<[target: string]>(),
 TestSendEvent: Net.Definitions.ClientToServerEvent<[eventName: string]>(),

 /* ======== Server To Client Events =========*/
 SendResourceData: Net.Definitions.ServerToClientEvent<[resourceData: Payload.PCurrentResourceAmounts]>(),

 /* Player Data */
 ServerTargetUpdate: Net.Definitions.ServerToClientEvent<[targetId: string]>(),
 SendPlayerData: Net.Definitions.ServerToClientEvent<[playerData: IPlayerData]>(),

 /* Character Creation */
 GameCharacterCreated: Definitions.ServerToClientEvent<[]>(),
 GameCharacterDestroyed: Definitions.ServerToClientEvent<[]>(),

 UpdateSkillSlotMap: Net.Definitions.ServerToClientEvent<[skillSlotMap: Payload.PSkillSlotMap]>(),
 UpdateInfoFrame: Net.Definitions.ServerToClientEvent<[payload: Payload.PInfoFrame]>(),
});

const RemoteFunctions = Net.CreateDefinitions({
 // Client-to-server remote function to initialize panel data
 GetSkillSlotMap: Net.Definitions.ServerAsyncFunction<() => Payload.PSkillSlotMap | undefined>(),
 GetEquipmentSlotMap: Net.Definitions.ServerAsyncFunction<() => Payload.PEquipmentSlotMap | undefined>(),
 GetCharacterFrameData: Net.Definitions.ServerAsyncFunction<() => Payload.PInfoFrame | undefined>(),
});

/* Exports */
export { RemoteFunctions, RemoteEvents };

```
