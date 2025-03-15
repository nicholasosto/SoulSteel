
# Class Design Descriptions

## 1. Panel Controllers (Client-Side)

Each panel in your GUI system can be managed by its own controller class. To promote code reuse and consistency, you might define an abstract base class (e.g., `PanelController`) with shared functionality such as initialization, event handling, and data fetching.

- **PanelController (abstract)**
  - **Responsibilities:**  
    - Common initialization logic  
    - Event binding/unbinding  
    - Fetching panel data via remote functions
  - **Key Methods:**  
    - `initialize()`
    - `bindEvents()`
    - `updatePanelData(data: TPanelData)`

- **SkillPanelController**
  - **Responsibilities:**  
    - Manages the unlocked skills list (using GameItem frames)  
    - Updates the details panel (e.g., skill description, cooldown, costs)  
    - Handles upgrade controls
  - **Key Methods:**  
    - `loadSkills()`
    - `displaySkillDetails(skillId: SkillId)`
    - `handleUpgrade(skillId: SkillId, upgradeType: number)`

- **ClassPanelController**
  - **Responsibilities:**  
    - Displays class information (name, description, experience)  
    - Renders and updates the talent tree using a collection of `TalentNodeButton` instances  
    - Processes talent upgrades and node interactions
  - **Key Methods:**  
    - `loadClassData()`
    - `updateTalentTree()`
    - `handleTalentActivation(nodeId: string)`

- **InventoryPanelController**
  - **Responsibilities:**  
    - Organizes items into categories (Armor & Accessories, Consumables, Familiars)  
    - Manages item selection and display updates
  - **Key Methods:**  
    - `loadInventoryItems()`
    - `filterByCategory(category: InventoryCategory)`
    - `selectItem(itemId: string)`

- **TeleportPanelController**
  - **Responsibilities:**  
    - Displays available teleport destinations  
    - Handles user selection and confirmation for teleport actions
  - **Key Methods:**  
    - `loadTeleportDestinations()`
    - `selectDestination(destinationId: string)`
    - `confirmTeleport()`

- **ShopPanelController**
  - **Responsibilities:**  
    - Displays catalog items with filtering options  
    - Manages purchase interactions and updates the UI accordingly
  - **Key Methods:**  
    - `loadShopItems()`
    - `filterItemsByCategory(category: ShopCategory)`
    - `initiatePurchase(itemId: string)`

---

## 2. UI Component Classes

For a modular and scalable design, create classes for the smaller UI components that are used within the panels:

- **GameItemFrame**
  - **Responsibilities:**  
    - Represents an interactive button for skills or other items  
    - Manages visual feedback (hover effects, selection state)
  - **Key Methods:**  
    - `render()`
    - `onClick()`
    - `updateDisplay(skillData: SkillData)`

- **TalentNodeButton**
  - **Responsibilities:**  
    - Represents a single node within the class talent tree  
    - Tracks activation status, upgrade availability, and interaction feedback
  - **Key Methods:**  
    - `activate()`
    - `updateState(isActive: boolean)`
    - `bindClickEvent()`

---

## 3. Data and Communication Controllers

Your design documents outline clear separation between server and client data handling. Consider implementing these classes:

- **PanelDataClient**
  - **Responsibilities:**  
    - Requests panel data from the server using remote functions (e.g., `GetPanelData`)  
    - Processes and caches received data for UI updates
  - **Key Methods:**  
    - `fetchPanelData(panelId: PanelId): Promise<TPanelData>`
    - `onDataReceived(data: TPanelData)`

- **PanelDataServer**
  - **Responsibilities:**  
    - Formats and sends panel data to clients upon request  
    - Interacts with `PlayerData` to build the appropriate payload
  - **Key Methods:**  
    - `setCallback(player: Player, panelId: PanelId)`
    - `formatPanelData(playerData: IPlayerData): TPanelData`

- **SlotMapClient & SlotMapServer**
  - **Responsibilities:**  
    - Manage the mapping between UI elements (e.g., skill slots, equipment slots) and their data identifiers  
    - Ensure synchronization between client and server slot data
  - **Key Methods:**  
    - For client: `fetchSlotMapData(slotMapId: SlotMapId)`
    - For server: `getSlotMapData(player: Player, slotMapId: SlotMapId)`

---

## 4. Instance Wrapper Classes

To encapsulate the behavior of Roblox Instances and integrate custom logic:

- **BaseInstanceController**
  - **Responsibilities:**  
    - Acts as a wrapper around a Roblox `Instance` to add custom behavior and data-binding  
    - Serves as a base for more specialized instance classes
  - **Key Methods:**  
    - `initialize(instance: Instance)`
    - `bindData(data: any)`
    - `cleanup()`

- **Specialized Instance Classes** (e.g., `SkillItemInstance`, `TalentNodeInstance`)
  - **Responsibilities:**  
    - Extend `BaseInstanceController` with panel-specific logic  
    - Handle specific UI behaviors for skills or talent nodes
  - **Key Methods:**  
    - For a skill item: `updateSkillVisuals()`
    - For a talent node: `toggleActivation()`

---

## 5. Utility and Factory Classes

To keep the code modular and support future expansion, consider the following:

- **PanelFactory**
  - **Responsibilities:**  
    - Dynamically instantiates panel controllers based on the panel type (Skill, Class, Inventory, etc.)
  - **Key Methods:**  
    - `createPanel(panelType: PanelType): PanelController`

- **UIComponentFactory**
  - **Responsibilities:**  
    - Centralizes the creation of UI components (GameItemFrame, TalentNodeButton, etc.)
  - **Key Methods:**  
    - `createComponent(componentType: UIComponentType, options: any): UIComponent`

---

## 6. Integration with Communication & Networking

Given your design for asynchronous communication between client and server, a dedicated networking class can simplify remote function calls:

- **NetworkManager**
  - **Responsibilities:**  
    - Encapsulates remote function calls (e.g., `GetPanelData`, `GetSlotMapData`)  
    - Provides a uniform API for sending and receiving data
  - **Key Methods:**  
    - `callGetPanelData(panelId: PanelId): Promise<TPanelData>`
    - `callGetSlotMapData(slotMapId: SlotMapId): Promise<TSlotMap>`
    - `updateTarget(targetId: string)`
    - `updatePosition(locationId: string)`

---

## Summary

These class suggestions provide a modular, scalable foundation for your game’s GUI system. By splitting responsibilities into panel controllers, UI component classes, data management controllers, instance wrappers, and utility factories, you ensure that each part of the system is maintainable and testable. This approach aligns well with the design principles outlined in your documents and the chosen TypeScript-to-Luau development environment.