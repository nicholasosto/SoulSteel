import { HttpService } from "@rbxts/services";

const OpenAIKey = HttpService.GetSecret("OpenAISecret");

if (OpenAIKey === undefined) {
	throw "OpenAI Key is undefined!";
}

export default OpenAIKey;
