// Roblox Services
import { Players, DataStoreService } from "@rbxts/services";

interface CharacterData {
	name: string;
	appearance: string; // Serialized HumanoidDescription or a list of selected parts
	level: number;
	class: string;
	inventory: string[]; // Array of item IDs
	position?: Vector3; // Optional: last saved position
}

interface PlayerData {
	characters: Map<number, CharacterData>; // Supports up to 3 characters
}
