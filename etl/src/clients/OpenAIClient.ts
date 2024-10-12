import OpenAI from 'openai';
import { z } from 'zod';
import { zodResponseFormat } from "openai/helpers/zod";

class OpenAIClient {
    private static instance: OpenAIClient;
    private client: OpenAI;
    private model: OpenAI.Chat.ChatModel

    private constructor(key: string, model: OpenAI.Chat.ChatModel) {
        this.client = new OpenAI({
            apiKey: key,
        });
        this.model = model
    }

    public static getInstance(key: string, model: OpenAI.Chat.ChatModel): OpenAIClient {
        if (!OpenAIClient.instance) {
            OpenAIClient.instance = new OpenAIClient(key, model);
        }
        return OpenAIClient.instance;
    }

    public async transformJobData(message: string, prompt: OpenAI.Chat.Completions.ChatCompletionMessageParam[]): Promise<string | null> {
        try {
            const response = await this.client.chat.completions.create({
                model: this.model,
                messages: [
                    ...prompt,
                    { role: "user", content: message }
                ]
            });

            return response.choices[0].message.content;
        } catch (error) {
            console.error('An error occurred:', error);
            return null;
        }
    }

    public async schemaBasedCompletion<T extends z.ZodType>(message: string, prompt: Array<OpenAI.Chat.ChatCompletionMessageParam>, schema: T,) {
        try {
            const response = await this.client.beta.chat.completions.parse({
                model: this.model,
                messages: [
                    ...prompt,
                    { role: "user", content: message }
                ],
                response_format: zodResponseFormat(schema, "entity"),
            })

            return response.choices[0].message.content;
        }
        catch (e) {
            console.log(e);

            return undefined
        }
    }
}

export default OpenAIClient

type PromptArray = OpenAI.Chat.Completions.ChatCompletionMessageParam

export { PromptArray }