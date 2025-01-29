import { CharacterStats } from "./CharacterResourceTypes";

export function getDefaultCharacterStats(): CharacterStats {
    return {
        Strength: 10,
        Speed: 10,
        Dexterity: 10,
        Intelligence: 10,
        Constitution: 200,
    };
}
