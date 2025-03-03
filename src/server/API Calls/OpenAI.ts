import { HttpService } from "@rbxts/services";
import OpenAIKey from "./_Secrets";
import Logger from "shared/Utility/Logger";

const OPENAI_API_KEY = OpenAIKey;
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

function sendMessageToOpenAI(message: string): string {
	const headers = {
		//["Content-Type"]: "application/json",
		["Authorization"]: `Bearer ${OPENAI_API_KEY}`,
	};

	const body = HttpService.JSONEncode({
		model: "gpt-3.5-turbo",
		messages: [{ role: "user", content: message }],
	});

	const response = HttpService.PostAsync(OPENAI_API_URL, body, Enum.HttpContentType.ApplicationJson, false, headers);
	const decoded = HttpService.JSONDecode(response) as unknown as { choices: [{ message: { content: string } }] };
	Logger.Log("OPENAI", decoded as unknown as string);
	return decoded.choices[0].message.content;
}

export { sendMessageToOpenAI };
