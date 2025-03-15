# Class Design Reference

This document provides a technical overview of the class design patterns and data controllers used in the system. It outlines the roles of data objects, server classes, client classes, and instance classes in managing and transmitting data between various components of the application.

---

## Table of Contents

1. [Data Controllers](#data-controllers)
   - [Data Objects](#data-objects)
2. [Server Classes](#server-classes)
3. [Client Classes](#client-classes)
4. [Instance Classes](#instance-classes)

---

## Data Controllers

### Data Objects

Refer to the [Interfaces and Types](Pages/Interfaces and Types.md) document for further details on underlying types. The primary data objects include:

- **SlotMap:**  
  A generic map object defined as `Map<string, string>`. This is used for mapping various identifiers within the system.

- **PanelData:**  
  A generic type designed to handle various panel data formats. Predefined panel types include:
  - `EquipmentPanelData`
  - `SkillPanelData`
  - `QuestPanelData`
  - `ClassPanelData`

---

## Server Classes

Server-side classes manage the formatting and communication of data from the server to the client.

1. **PanelDataServer:**  
   - **Purpose:**  
     Formats and sends panel data to the client.
   - **Requirements:**  
     - Depends on a generic type `TPanelData`.
     - Accesses `PlayerData` to generate the appropriate `TPanelData` payload.
   - **Networking:**  
     - Utilizes the remote function `GetPanelData(panelId: PanelId)` to deliver data.
     - Listens for client requests to trigger data updates.

2. **SlotMapServer:**  
   - **Purpose:**  
     Manages slot map data for transmission from the server to the client.
   - **Requirements:**  
     - Also depends on a generic type (e.g., `TPanelData` or a related type) for data formatting.
     - Uses `PlayerData` to construct the proper return payload.
   - **Networking:**  
     - Uses the remote function `GetPanelData(panelId: PanelId)` for data exchange.

---

## Client Classes

Client-side classes are responsible for receiving and processing data from the server. Their implementations are in progress:

1. **PanelDataClient:**  
   - **Status:**  
     Implementation pending (#TODO).

2. **SlotMapClient:**  
   - **Status:**  
     Implementation pending (#TODO).

---

## Instance Classes

### General Overview

Instance classes enhance a given `Instance` object by adding custom behaviors. When an instance class is constructed, it takes a Roblox `Instance` as a parameter and extends its functionality to better integrate with the application’s data flow and user interactions.
