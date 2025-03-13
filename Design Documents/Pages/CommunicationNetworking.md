# Communication between Server and Client

-Main document <[Back to Main](../SoulSteelGameDesign.md)>

## Client to Server Async Functions

1. GetPanelData(panelId: panelId)
2. UpdateSlotMap(slotmapId: SlotMapId, slotMap: TSlotMap)

```ts
// Slot maps consist of a slotId and an itemId
// TSlot map combines those types
type TSlotMap = SkillSlotMap | EquipmentSlotMap // ect

type PanelId = "_SkillPanel" | "_EquipmentPanel" //ect

const RemoteFunctions = Net.CreateDefinitions({
 // Client-to-server remote function to initialize panel data
 GetPanelData: Net.Definitions.ServerAsyncFunction<() => GetPanelData(panelId: PanelId)>(),
});
```

## Client to Server Events

1. UpdateAssignedSkillsRequest
2. UpdateAssignedEquipmentRequest
3. UpdateAssignedMobilitySkillsRequest
4. UpdateActiveQuestsRequest
5. UpdateCharacterStatsRequest
6. UpdateCharacterTargetRequest
7. UpdateCharacterLocationRequest

## Server to Client Events

1. SendPayload
