# Communication between Server and Client

## Index

0. [Back to Main](../SoulSteelGameDesign.md)
1. [Design Principles](<#design-principles>)
2. [Client to Server](<#client-to-server>)
3. [Server to Client](<#server-to-client>)

---

## Design Principles

### Client Initiated Requests

Use **Asynchronous Functions** when the client initiates a data request. Below are the main functions currently in use:

1. **GetPanelData(panelId)**:  
   Client → Server request. Calls the remote function handled on **PanelServer**.

    ```ts
    GetPanelData: Net.Definitions.ServerAsyncFunction<() => GetPanelData(panelId: PanelId)>()
    ```

2. **GetSlotMapData(slotMapId)**:  
   Client → Server request. Calls the remote function handled on **SlotMapServer**.

    ```ts
    GetSlotMapData: Net.Definitions.ServerAsyncFunction<() => GetSlotMapData(slotMapId: SlotMapId)>()
    ```

---

## Client to Server

### Observers of Server Data

1. **UI Panels:**  
   Inventory, Skills, Equipment, Character, Class, Familiars, Teleport

2. **HUD Information:**  
   Resource Bars, Experience Bar, Name Label, Currency Counters

### Client Function Calls

1. **GetPanelData(panelId)**
   - Called when a `ClientPanelController` is initialized.

2. **GetSlotMapData(slotMapId)**
   - Called once the client UI is fully loaded.

3. **UpdateTarget(targetId)**
   - Called when the player selects a valid target managed by the `ClientTargetManager`.

4. **UpdatePosition(locationId)**
   - Called when the player uses the `TeleportPanel`.

### Client Initiated Events

1. **ClientFullyLoaded**  
   Occurs when `main.client.ts` has finished loading all managers, controllers, and character event listeners. This event signals that the client is ready for user interaction.

---

## Server to Client

### Server Function Calls

The server does not invoke functions on the client directly. Instead, it implements callbacks to handle responses from client-initiated requests.

1. **GetPanelData** Callback example on **PanelServer**:

    ```ts
    GetPanelData.SetCallback((player, panelId) => { ... })
    ```

2. **GetSlotMapData** Callback example on **SlotMapServer**:

    ```ts
    GetSlotMapData.SetCallback((player, slotMapId) => { ... })
    ```

### Events

1. **SendSlotMapUpdate**  
   Sends SlotMap data when gameplay triggers an event, such as:
   - New Skill Acquired
   - Zone Entered
   - Equipment-related event

2. **SendPanelUpdate**  
   Sends Panel data updates when gameplay triggers an event, such as:
   - Stats Updated
   - World Event
