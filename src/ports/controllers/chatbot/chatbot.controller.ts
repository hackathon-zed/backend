import { Controller, Post, Body, Res } from 'routing-controllers';
import { Service } from 'typedi';
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


    private mithilaKeywords = [
        'mithila', 'maithili', 'madhubani', 'sita', 'janakpur', 'mithila art', 'mithila festivals',
        'mithila language', 'mithila customs', 'madhubani paintings', 'mithila history', 'mithila music',
        'mithila dance', 'mithila food', 'mithila culture', 'mithila traditions', 'mithila literature', 'mithila poetry', 'mithila songs',
        'mithila architecture', 'mithila sculptures', 'mithila temples', 'mithila rituals', 'mithila beliefs', 'mithila mythology', 'mithila legends', "maithili language", "maithili art", "maithili festivals", "maithili customs", "maithili history", "maithili music", "maithili dance", "maithili food", "maithili culture", "maithili traditions", "maithili literature", "maithili poetry", "maithili songs", "maithili architecture", "maithili sculptures", "maithili temples", "maithili rituals", "maithili beliefs", "maithili mythology", "maithili legends", "madhubani art", "madhubani festivals", "madhubani customs", "madhubani history", "madhubani music", "madhubani dance", "madhubani food", "madhubani culture", "madhubani traditions", "madhubani literature", "madhubani poetry", "madhubani songs", "madhubani architecture", "madhubani sculptures", "madhubani temples", "madhubani rituals", "madhubani beliefs", "madhubani mythology", "madhubani legends"


    ];


    private isMithilaRelated(input: string): boolean {
        return this.mithilaKeywords.some(keyword => input.toLowerCase().includes(keyword));
    }

    @Post('/message')
    async chat(@Body() { chatHistory, userPrompt }: ChatRequest, @Res() res: Response) {

        if (!chatHistory || !userPrompt) {
            throw new BadRequestError('Missing required fields.');
        }


        // Check if the user prompt is related to Mithila culture
        if (!this.isMithilaRelated(userPrompt)) {
            return res.json({
                assistantResponse: 'This chatbot is dedicated to providing information about Mithila culture only. Please ask questions related to Mithila art, language, festivals, history, or customs.'
            });
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
