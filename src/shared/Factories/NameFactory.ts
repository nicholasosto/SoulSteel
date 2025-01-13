import { Logger } from "shared/Utility/Logger";
import { CharacterNames } from "./FactoryIndex";

const firstNames = CharacterNames.FirstNames;
const lastNames = CharacterNames.LastNames;
const Monikors = CharacterNames.Monikors;

const EntityRegistryMap: Map<string, Instance> = new Map();
let entityIdNum = 0;

export enum EntityRegistryResponseCode {
	Success,
	AlreadyExists,
	InvalidEntity,
}

export function generateCharacterName(): string {
	const firstName = firstNames[math.floor(math.random() * firstNames.size())];
	const lastName = lastNames[math.floor(math.random() * lastNames.size())];
	const monikor = Monikors[math.floor(math.random() * Monikors.size())];
	return `${firstName} ${lastName} ${monikor}`;
}

export function RegisterEntity(instance: Instance) {
	const entityId = `Entity_${entityIdNum++}`;

	EntityRegistryMap.set(entityId, instance);
	Logger.Log(script, `Registered Entity: ${entityId}`);
}

export function GetEntity(entityId: string): Instance | undefined {
	return EntityRegistryMap.get(entityId);
}

export function RegisterEntityReference(entityId: string, entity: ObjectValue) : EntityRegistryResponseCode {
	const existingEntity = EntityRegistryMap.get(entityId);

	if (existingEntity) {
		return EntityRegistryResponseCode.AlreadyExists;
	}

	EntityRegistryMap.set(entityId, entity);
	return EntityRegistryResponseCode.Success;
}