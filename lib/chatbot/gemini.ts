import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { PromptTemplate } from '@langchain/core/prompts';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { z } from 'zod';

export interface PaymentIntent {
    isPayment: boolean;
    amount?: string;
    recipient?: string;
    currency?: string;
    note?: string;
    confidence: number;
}

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
}

// Initialize LangChain with Google Generative AI
const model = new ChatGoogleGenerativeAI({
    modelName: 'gemini-pro',
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    temperature: 0.7,
});

// Define payment intent schema
const paymentIntentSchema = z.object({
    isPayment: z.boolean().describe('Whether this message contains a payment request'),
    amount: z.string().optional().describe('The payment amount as a number string'),
    recipient: z.string().optional().describe('The recipient wallet address (starts with 0x for Ethereum)'),
    currency: z.string().optional().describe('The cryptocurrency (ETH, USDT, etc.)'),
    note: z.string().optional().describe('Any note or description for the payment'),
    confidence: z.number().describe('Confidence score between 0 and 1'),
});

const paymentParser = StructuredOutputParser.fromZodSchema(paymentIntentSchema);

export async function analyzePaymentIntent(message: string): Promise<PaymentIntent> {
    try {
        const formatInstructions = paymentParser.getFormatInstructions();
        const prompt = PromptTemplate.fromTemplate(`Analyze the following message for cryptocurrency payment intent. Extract: amount, recipient address, currency, note. Message: "{message}" {format_instructions}`);
        const input = await prompt.format({ message, format_instructions: formatInstructions });
        const response = await model.invoke(input);
        const parsed = await paymentParser.parse(response.content as string);
        return parsed as PaymentIntent;
    } catch (error) {
        console.error('Payment intent analysis error:', error);
        const ethAddressRegex = /0x[a-fA-F0-9]{40}/;
        const amountRegex = /(\d+\.?\d*)\s*(ETH|eth|ADA|ada)/i;
        const hasAddress = ethAddressRegex.test(message);
        const amountMatch = message.match(amountRegex);
        const hasPaymentKeywords = /send|pay|transfer/i.test(message);
        if (hasAddress && amountMatch && hasPaymentKeywords) {
            return {
                isPayment: true,
                amount: amountMatch[1],
                recipient: message.match(ethAddressRegex)?.[0],
                currency: amountMatch[2]?.toUpperCase() || 'ETH',
                confidence: 0.8,
            };
        }
        return { isPayment: false, confidence: 0 };
    }
}

export async function generateChatResponse(message: string, conversationHistory: ChatMessage[]): Promise<string> {
    try {
        const prompt = PromptTemplate.fromTemplate(`You are a helpful AI assistant for Vibechain AI, a blockchain financial platform. Be friendly and concise. Conversation: {history}\nUser: {message}\nAssistant:`);
        const history = conversationHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n');
        const input = await prompt.format({ message, history });
        const response = await model.invoke(input);
        return response.content as string;
    } catch (error) {
        console.error('Chat response error:', error);
        return 'Sorry, I encountered an error. Please try again.';
    }
}
