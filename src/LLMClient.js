import { GoogleGenAI, ThinkingLevel } from "@google/genai";

class LLMClient {
    constructor() {
        this.apiKey = process.env.GEMINI_API_KEY;
        this.modelName = process.env.GEMINI_MODEL || 'gemini-1.5-pro-latest';

        if (!this.apiKey) {
            console.warn('WARNING: GEMINI_API_KEY is not set. AI features will not work.');
        } else {
            this.genAI = new GoogleGenAI({ apiKey: this.apiKey });
            this.modelConfig = {
                thinkingConfig: {
                    thinkingLevel: ThinkingLevel.LOW
                }
            };
        }
    }

    async generateContent(prompt, imageBase64 = null) {
        if (!this.apiKey) return { error: 'No API Key' };

        try {
            let response;
            if (imageBase64) {
                response = await this.genAI.models.generateContent({
                    model: this.modelName,
                    contents: [
                        {
                            inlineData: {
                                mimeType: "image/png",
                                data: imageBase64
                            },
                        },
                        {
                            text: prompt
                        }
                    ]
                });
            } else {
                response = await this.genAI.models.generateContent({
                    model: this.modelName,
                    contents: prompt,
                });
            }

            const text = response.text;

            // Attempt to parse JSON if the prompt requested it
            try {
                // Remove markdown code block syntax if present
                const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
                return JSON.parse(cleanText);
            } catch (e) {
                // If not JSON, return text
                return text;
            }

        } catch (e) {
            console.error("LLM Generation Error:", e);
            throw e;
        }
    }
}

export default LLMClient;
