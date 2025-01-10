import { CharacterNames } from "./FactoryIndex";

const firstNames = CharacterNames.FirstNames;
const lastNames = CharacterNames.LastNames;
const Monikors = CharacterNames.Monikors;

export function generateCharacterName(): string {
	const firstName = firstNames[math.floor(math.random() * firstNames.size())];
	const lastName = lastNames[math.floor(math.random() * lastNames.size())];
	const monikor = Monikors[math.floor(math.random() * Monikors.size())];
	return `${firstName} ${lastName} ${monikor}`;
}
