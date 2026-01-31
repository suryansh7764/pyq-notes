import { GoogleGenAI } from "@google/genai";

// Initialize the API client strictly as per guidelines using process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateStudyPlan = async (subject: string, course: string, semester: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API Key is missing. Please configure the environment variable.";
  }

  try {
    const prompt = `
      I am a student of Ranchi University studying ${course}, ${semester}.
      Please generate a concise study plan and list of important topics for the subject "${subject}" based on standard Indian university curriculum.
      Format the response with Markdown headers and bullet points. Keep it under 300 words.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } 
      }
    });

    return response.text || "No content generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Failed to generate study plan. Please try again later.";
  }
};

export const askAIQuestion = async (question: string, context: string): Promise<string> => {
   if (!process.env.API_KEY) {
    return "API Key is missing.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Context: ${context}. User Question: ${question}. Answer concisely.`,
    });
    return response.text || "No answer found.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error communicating with AI.";
  }
}