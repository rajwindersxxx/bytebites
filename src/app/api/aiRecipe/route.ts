import { askAi } from "@/app/_servers/googleAiApi";
import { AiResponseSample } from "@/app/data/recipeAiData";
import { aiOutputToObject, makeAQuestion } from "@/app/_lib/apiFunctions";
import { NextResponse, NextRequest } from 'next/server';
import { simulateApiRequest } from "@/app/_helper/helper";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const Ingredients = searchParams.get('recipe');
    if (!Ingredients) {
      return NextResponse.json({ error: 'Recipe ingredient are required' }, { status: 400 });
    }
    // const generatedAIData = await askAi(makeAQuestion(Ingredients));
    const generatedAIData = await simulateApiRequest(AiResponseSample, 2000) as string;
    console.log(generatedAIData);
    const errorSplit = generatedAIData.split("__");
    if (errorSplit[1]) {
      return NextResponse.json({ error: errorSplit[1] }, { status: 400 }); // Or another appropriate status code
    }
    const jsonData = aiOutputToObject(generatedAIData);
    return NextResponse.json(jsonData);
  } catch (error) {
    console.error('Error in GET route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
