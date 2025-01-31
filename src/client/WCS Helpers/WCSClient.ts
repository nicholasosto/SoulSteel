// WCS Imports
import { ReplicatedStorage } from "@rbxts/services";
import { CreateClient } from "@rbxts/wcs";
import Logger from "shared/Utility/Logger";

// WCS Client
const WcsClient = CreateClient();

/* Register the Directories */

// Parent WCS Directory
const ParentWCSDirectory = ReplicatedStorage.WaitForChild("TS").WaitForChild("Skills");

// Skills, Status, Movesets - Directory
const SkillsDirectorory = ParentWCSDirectory.WaitForChild("WCSSkills");
const StatusDirectory = ParentWCSDirectory.WaitForChild("WCSStatus");

// Register Directories
WcsClient.RegisterDirectory(SkillsDirectorory);
WcsClient.RegisterDirectory(StatusDirectory);

// Start the Client
WcsClient.Start();
Logger.Log(script, "WCS Client Started: ", WcsClient as unknown as string);

export default WcsClient;
