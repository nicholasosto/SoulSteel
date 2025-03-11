// SUBJECT: ScoreManager maintains player scores and notifies observers on change.
export default class ScoreManager {
	// List of observers (functions or objects interested in score updates)
	private observers: ((player: Player, newScore: number) => void)[] = [];

	// Attach a new observer (subscribe to score updates)
	public attach(observer: (player: Player, newScore: number) => void) {
		this.observers.push(observer);
	}

	// Detach an observer (unsubscribe from updates)
	public detach(observer: (player: Player, newScore: number) => void) {
		const index = this.observers.indexOf(observer);
		if (index > -1) this.observers.remove(index);
	}

	// Notify all observers about a score change (dispatch event to observers)
	public notify(player: Player, newScore: number) {
		for (const observerFunc of this.observers) {
			// Invoke each observer callback with the updated data
			observerFunc(player, newScore);
		}
	}

	// Example function: update a player's score and notify observers.
	public setPlayerScore(player: Player, newScore: number) {
		// Imagine we update the internal score state here...
		print(`${player.Name}'s score is now ${newScore}.`);

		// After changing state, notify all observers of this change.
		this.notify(player, newScore);
	}
}

// Example usage of the Subject on the server:
const scoreManager = new ScoreManager();

// Attach an example observer (could be a server-side logging function or similar)
scoreManager.attach((player, score) => {
	print(`(Observer) Logging: ${player.Name} score changed to ${score}`);
});
