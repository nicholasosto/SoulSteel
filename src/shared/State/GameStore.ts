import { Players } from "@rbxts/services";
import Net from "@rbxts/net";
import { Remotes } from "shared/net/Remotes";
import Logger from "shared/Utility/Logger";

type PlayerState = {
	health: number;
	mana: number;
	stamina: number;
	level: number;
	[key: string]: unknown;
};

export interface GameState {
	specialButton: boolean;
	players: Map<Player, PlayerState>;
	cooldownTimers: Map<Player, Map<string, number>>;
	uiVisibility: Map<Player, Record<string, boolean>>;
}

type GameAction =
	| { type: "UPDATE_PLAYER_STATE"; player: Player; updates: Partial<PlayerState> }
	| { type: "SET_UI_VISIBILITY"; player: Player; element: string; visible: boolean }
	| { type: "SET_SKILL_COOLDOWN"; player: Player; skillId: string; cooldown: number };

class GameStore {
	private static instance: GameStore;

	private state: GameState = {
		specialButton: false,
		players: new Map(),
		cooldownTimers: new Map(),
		uiVisibility: new Map(),
	};

	private stateChangedEvent = Remotes.Server.Get("StateChanged");

	private constructor() {
		Players.PlayerRemoving.Connect((player) => this.cleanupPlayer(player));
	}

	public static getInstance(): GameStore {
		if (!this.instance) {
			this.instance = new GameStore();
		}
		return this.instance;
	}

	public initializePlayer(player: Player, initialData: PlayerState) {
		this.state.players.set(player, initialData);
		this.state.uiVisibility.set(player, {});
		this.state.cooldownTimers.set(player, new Map());
		Logger.Log(script, "Initialized player: " + player.Name);
	}

	public dispatch(action: GameAction) {
		Logger.Log(script, "Dispatching action: " + action.type);
		switch (action.type) {
			case "UPDATE_PLAYER_STATE":
				this.updatePlayerState(action.player, action.updates);
				break;
			case "SET_UI_VISIBILITY":
				this.setUIVisibility(action.player, action.element, action.visible);
				break;
			default:
				break;
		}
	}

	private updatePlayerState(player: Player, updates: Partial<PlayerState>) {
		const currentState = this.state.players.get(player);
		if (currentState) {
			const newState = { ...currentState, ...updates };
			this.state.players.set(player, newState);
			this.stateChangedEvent.SendToPlayer(player, "players", newState);
		}
	}

	private setUIVisibility(player: Player, element: string, visible: boolean) {
		let uiState = this.state.uiVisibility.get(player);
		if (!uiState) {
			uiState = {};
			this.state.uiVisibility.set(player, uiState);
		}
		uiState[element] = visible;
		this.stateChangedEvent.SendToPlayer(player, "uiVisibility", { [element]: visible });
	}

	private cleanupPlayer(player: Player) {
		this.state.players.delete(player);
		this.state.uiVisibility.delete(player);
		this.state.cooldownTimers.delete(player);
	}
}

export default GameStore.getInstance();
