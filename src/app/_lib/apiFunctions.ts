// convert input Ingredient to AI understandable text
// FUNCTIONS USED BY AI
export function makeAQuestion(ingredients: string | null) {
  return `make a recipe from ingredients  "${ingredients}" follow by the template given
  OUTPUT: singleString, ,
  () :  description of what i want , and  you can add anything
  [] : this the placeholder you replace , output should not included any [] for eg [text] replace by yourOutput
  summary  : in summary you can add html tags  ,   150 words if possible, should a paragraph, you can bold , italic, underline if needed, write it in natural language
  IF( any invalid Ingredients ) RETURN __[your error message(error should be one short line)]__
  ELSE follow template below
  TEMPLATE GIVEN BELOW --------
  title=[recipeTitle]++++type=[recipeType]++++readyInMinutes=[time in minutes]++++servings=[servings in number]++++pricePerServingIn$=[cost in number only]++++vegetarian=[true|false]++++cuisines=[string1,string2, ....]++++ingredients=[ingredient1]--[amount1(in Int or decimal)]--[measuresUnits1]--[SOLID|LIQUID], [ingredient2]--[amount2(in Int or decimal)]--[measureUnits2]--[SOLID|LIQUID],[so on .....]--[so on ...]--[so on ...]--[so on ...]++++Instructions=[stepNumber1]--[step name1]--[stepInstruction1]--[ingredient1,ingredient2, ....]--[equipment1, equipment2, ...]//[stepNumber2]--[step name2]--[stepInstruction2]--[ingredient1,ingredient2]--[equipment1, equipment2, ....]++++summary=[summaryInDetails(steps in short , health benefits, eating time like breakfast, lunch etc  , popularity, extra ingredient advice, some similar recipes , optional wine combinations , an information which give insight of recipe)]++++review=[a introduction of recipe (whats special , basic review of recipe , 100 words enough  )]`;
}
// convert string back to json
export function aiOutputToObject(input: string) {
  const data = input.replace(/[\[\]\*]/g, "");
  const level1Data = data.split("++++");
  const extendedIngredients = level1Data[7]
    .split("=")[1]
    .split(",")
    .map((item) => {
      return {
        id: Math.ceil(Math.random() * 100000),
        name: item.split("--")[0],
        amount: Number(item.split("--")[1]),
        consistency: item.split("--")[3],
        image: `${item.split("--")[0]}.jpg`, //added fake image or wrong link
        unit: item.split("--")[2],
        measures: {
          metric: {
            unitShort: item.split("--")[2],
            amount: Number(item.split("--")[1]),
          },
          us: {
            unitShort: item.split("--")[2],
            amount: Number(item.split("--")[1]),
          },
        },
      };
    });
  const output: {
    number: string;
    step: string;
    ingredients: { name: string }[];
    equipment: { name: string }[];
  }[] = [];
  level1Data[8]
    .split("=")[1]
    .split("//")
    .map((item) => {
      const data = item.split("--");
      const object = {
        number: data[0],
        step: data[2],
        ingredients: data[3]
          .split(",")
          .filter((item) => item.trim())
          .map((item) => ({
            id: Math.ceil(Math.random() * 100000),
            name: item.trim(),
          })),
        equipment: data[4]
          .split(",")
          .filter((item) => item.trim())
          .map((item) => ({
            id: Math.ceil(Math.random() * 100000),
            name: item.trim(),
          })),
      };
      output.push(object);
    });
  return {
    id: null,
    title: level1Data[0].split("=")[1],
    image: "/missingImage.jpg",
    dishTypes: [level1Data[1].split("=")[1]],
    readyInMinutes: level1Data[2].split("=")[1],
    servings: level1Data[3].split("=")[1],
    pricePerServing: level1Data[4].split("=")[1],
    vegetarian: level1Data[5].split("=")[1],
    cuisines: level1Data[6].split("=")[1].split(","),
    summary: level1Data[9].split("=")[1],
    extendedIngredients: extendedIngredients,
    analyzedInstructions: [{ name: "AI generated", steps: output }],
    review: level1Data[10].split("=")[1],
  };
}
// debugging

// const question = makeAQuestion('pizza, butter, milk')
// const output = aiOutputToObject(question)
// console.log(output)
