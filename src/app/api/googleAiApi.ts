import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GOOGLE_AI_API_KEY;
export async function askAi(question: string) {
  if (!apiKey) {
    throw new Error('GOOGLE_AI_API_KEY is not defined');
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  const result = await model.generateContent(question);
  return result.response.text();
}
