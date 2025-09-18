
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is set in the environment variables
const apiKey = process.env.API_KEY;

if (!apiKey) {
    console.warn("API_KEY environment variable not set. Gemini API features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || '' });

export const suggestMentorSearchQuery = async (currentRole: string): Promise<string> => {
    if (!apiKey) {
        return "AI suggestions disabled. API key not found.";
    }
    try {
        const prompt = `I am a student with a major in ${currentRole}. Suggest a concise and effective search query to find a mentor on a professional networking platform. The query should focus on a specific job title and a key skill. For example: "Product Manager with experience in agile development". Give me just one suggestion.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                thinkingConfig: { thinkingBudget: 0 } // For low latency
            }
        });

        return response.text.trim().replace(/"/g, ''); // Clean up response
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "Could not generate AI suggestion.";
    }
};
