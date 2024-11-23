import { Controller, Post, Body, Res } from 'routing-controllers';
import {  Service } from 'typedi';
import { Response } from 'express';
import { BadRequestError } from 'routing-controllers';
import Groq from 'groq-sdk';
import { enviroment } from '../../../infra/enviroment';

// Define the request body structure
interface ChatRequest {
    chatHistory: Array<{ role: string; content: string }>;
    userPrompt: string;
}

// ChatbotController with POST method to handle chat messages
@Service()
@Controller('/chatbot')
export class ChatbotController {
    // POST endpoint to handle the chat with Groq API

    private client = new Groq({
        apiKey: enviroment.groq.apiKey,
    });

    @Post('/message')
    async chat(@Body() { chatHistory, userPrompt }: ChatRequest, @Res() res: Response) {

        if (!chatHistory || !userPrompt) {
            throw new BadRequestError('Missing required fields.');
        }
        try {
            const messages = [
                { role: 'system', content: 'You are a helpful assistant' },
                ...chatHistory, // Include previous chat history
                { role: 'user', content: userPrompt } // Add the current user input
            ];

            const params: any = {
                messages: messages,
                model: 'llama3-70b-8192',
            };

            // Get the response from the API
            const response: Groq.Chat.ChatCompletion = await this.client.chat.completions.create(params);

            const assistantResponse = response.choices[0].message.content;

            // Return the assistant's response
            return res.json({ assistantResponse });
        } catch (error) {

            // If an error occurs, return a 500 status with a message
            throw new BadRequestError('Error communicating with the Groq API');
        }
    }
}
