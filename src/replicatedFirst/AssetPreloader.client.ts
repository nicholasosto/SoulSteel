print("Preloading assets...");

import { ContentProvider, Workspace } from "@rbxts/services";
function preloadAssets(): void {
	// Wait for the folder to exist (in case it hasn't replicated yet)
	const assetsFolder = Workspace.WaitForChild("AOE_ORC_Camp_01") as Folder;
	// Collect all the assets inside the folder (this includes all descendants)
	const assets: Instance[] = assetsFolder.GetDescendants();

	print("Preloading assets...", assets as unknown as string);

	// Preload the assets.
	// PreloadAsync yields until all assets have been loaded.
	ContentProvider.PreloadAsync(assets);

	print("All assets have been preloaded!");
}
