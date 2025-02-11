// import Logger from "shared/Utility/Logger";
// import ProgressBar from "shared/Epic UI/Progress Bar/ProgressBar";

// type ResourcePayload = { resourceId: string; current: number; max: number };

// export default class ResourceController {
// 	// Singleton
// 	private static _instance: ResourceController;

// 	// Registry
// 	private static _ResourceBars: Map<string, ProgressBar> = new Map();

// 	// Constructor
// 	private constructor() {
// 		Logger.Log(script, "CONSTRUCTOR()");
// 	}

// 	// Start
// 	public static Start() {
// 		if (this._instance === undefined) {
// 			this._instance = new ResourceController();
// 		}
// 	}

// 	// On Resource Updated
// 	public static OnResourceUpdated(progressBar: ProgressBar, payload: ResourcePayload) {
// 		progressBar.Update(payload);
// 	}
// }
