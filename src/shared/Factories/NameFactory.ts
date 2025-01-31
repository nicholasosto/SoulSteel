import Logger from "shared/Utility/Logger";
import { FirstNames, LastNames, Monikors } from "shared/Factories/FactoryParts/CharacterNames";

const EntityRegistryMap: Map<string, Instance> = new Map();
let entityIdNum = 0;

export enum EntityRegistryResponseCode {
	Success,
	AlreadyExists,
	InvalidEntity,
}

export function generateCharacterName(): string {
	const firstName = FirstNames[math.floor(math.random() * FirstNames.size())];
	const lastName = LastNames[math.floor(math.random() * LastNames.size())];
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

export function RegisterEntityReference(entityId: string, entity: ObjectValue): EntityRegistryResponseCode {
	const existingEntity = EntityRegistryMap.get(entityId);

	if (existingEntity) {
		return EntityRegistryResponseCode.AlreadyExists;
	}

	EntityRegistryMap.set(entityId, entity);
	return EntityRegistryResponseCode.Success;
}
