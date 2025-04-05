
/**
 * Generates a properly formatted question for an AI based on given ingredients.
 *
 * @param {string} ingredients - A comma-separated list of ingredients (e.g., "ingredient1, ingredient2, ...").
 * @returns {string} A structured question to send to the AI.
 */
export function makeAQuestion(ingredients: string | null): string {
  return `Make a recipe from ingredients "${ingredients}".
Format the response as **strict JSON**.
Only return JSON—no extra text, explanations, or comments.
The JSON should match this structure:

{
  "id": [random8DigitNumber],
  "image": "[if possible link otherwise '/fake.jpg']",
  "title": "[recipeTitle]",
  "readyInMinutes": [timeInMinutes],
  "servings": [servingsInNumber],
  "pricePerServing": [costInNumberOnly],
  "vegetarian": [true|false],
  "vegan": [true|false],
  "glutenFree": [true|false],
  "dairyFree": [true|false],
  "veryHealthy": [true|false],
  "veryPopular": [true|false],
  "sustainable": [true|false],
  "cookingMinutes": [timeInMinutes],
  "healthScore": [percentageInNumber],
  "cuisines": ["[cuisine1]", "[cuisine2]"],
  "extendedIngredients": [
    {
      "id": "[random8DigitNumber]",
      "image": "[if possible link otherwise '/fake.jpg']",
      "consistency": "[SOLID|LIQUID]",
      "name": "[ingredient1]",
      "amount": [amount1],
      "unit": "[unit1]",
      "measures": {
        "us": {
          "amount": [amount1],
          "unitShort": "[unit1Short]",
          "unitLong": "[unit1Long]"
        },
        "metric": {
          "amount": [amount1],
          "unitShort": "[unit1Short]",
          "unitLong": "[unit1Long]"
        }
      }
    },
    {
      "id": "[random8DigitNumber]",
      "image": "[if possible link otherwise '/fake.jpg']",
      "consistency": "[SOLID|LIQUID]",
      "name": "[ingredient2]",
      "amount": [amount2],
      "unit": "[unit2]",
      "measures": {
        "us": {
          "amount": [amount2],
          "unitShort": "[unit2Short]",
          "unitLong": "[unit2Long]"
        },
        "metric": {
          "amount": [amount2],
          "unitShort": "[unit2Short]",
          "unitLong": "[unit2Long]"
        }
      }
    }
  ],
  "dishTypes": ["[type1]", "[type2]"],
  "diets": ["[diet1]", "[diet2]"],
  "occasions": ["[occasion1]", "[occasion2]"],
  "analyzedInstructions": [
    {
      "name": "MADE BY AI",
      "steps": [
        {
          "number": 1,
          "step": "[stepInstruction]",
          "ingredients": [
            {
              "id": "[random6DigitNumber]",
              "name": "[ingredient1]",
              "image": "[if possible link otherwise 'fake.jpg']"
            },
            {
              "id": "[random6DigitNumber]",
              "name": "[ingredient2]",
              "image": "[if possible link otherwise 'fake.jpg']"
            }
          ],
          "equipment": [
            {
              "id": "[random6DigitNumber]",
              "name": "[equipment1]",
              "image": "[if possible link otherwise 'fake.jpg']"
            },
            {
              "id": "[random6DigitNumber]",
              "name": "[equipment2]",
              "image": "[if possible link otherwise 'fake.jpg']"
            }
          ]
        },
        {
          "number": 2,
          "step": "[stepInstruction2]",
          "ingredients": [
            {
              "id": "[random6DigitNumber]",
              "name": "[ingredient1]",
              "image": "[if possible link otherwise 'fake.jpg']"
            },
            {
              "id": "[random6DigitNumber]",
              "name": "[ingredient2]",
              "image": "[if possible link otherwise 'fake.jpg']"
            }
          ],
          "equipment": [
            {
              "id": "[random6DigitNumber]",
              "name": "[equipment1]",
              "image": "[if possible link otherwise 'fake.jpg']"
            },
            {
              "id": "[random6DigitNumber]",
              "name": "[equipment2]",
              "image": "[if possible link otherwise 'fake.jpg']"
            }
          ]
        }
      ]
    }
  ],
  "summary": "[Detailed recipe summary with health benefits, best eating time, popularity, variations, optional wine pairings]",
  "review": "[Short review highlighting what's special about the recipe]"
}

OR IF ANY ERROR OR INVALID input
{error: ['Your message']}
`;
}
/**
 * Converts an AI response (in JSON string format) to a JavaScript object.
 * @param {string} aiResponse - The AI response as a JSON string.
 * @returns {object} The parsed JSON object.
 */
export function aiOutputToObject(aiResponse: string) {
  const jsonMatch = aiResponse.match(/\{[\s\S]*\}/); // Matches JSON without /s flag
  if (jsonMatch) {
    try {
      const validJSON = JSON.parse(jsonMatch[0]); // Parse extracted JSON
      return validJSON;
    } catch (error) {
      console.error("Invalid JSON format:", error);
    }
  } else {
    console.error("No valid JSON found in the string.");
  }
  return null;
}
// debugging

// const question = makeAQuestion('pizza, butter, milk')
// const output = aiOutputToObject(question)
