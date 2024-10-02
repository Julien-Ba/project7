import { getRecipes } from './api/fetch_recipes.js';
import { validateRecipes } from './api/validate_recipes.js';
import { dropdown } from './dropdowns/init.js';
import { initRecipes } from './recipes/init.js';



async function init() {
    const { recipes } = await getRecipes();
    const validatedRecipes = validateRecipes(recipes);
    dropdown(validatedRecipes);
    initRecipes(validatedRecipes);
    //filter(validatedRecipes);
    //allDropdowns = displayDropdowns(validatedRecipes);
}

init();
