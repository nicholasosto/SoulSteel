import { Players } from "@rbxts/services";
import { Logger } from "shared/Utility/Logger";
import  CharacterFrame from "shared/Character Frame/CharacterFrame";
import { ResourceId } from "shared/_References/Resources";
import { PlayerLevelUp, PlayerResourceUpdate, PlayerInfoUpdate } from "client/Indexes/RemotesIndex";

const player = Players.LocalPlayer;
let character = player.Character;


character = player.Character;