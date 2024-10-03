import { getRecipes } from './api/fetch_recipes.js';
import { validateRecipes } from './api/validate_recipes.js';
import { initDropdown } from './dropdowns/init.js';
import { initRecipes } from './recipes/init.js';



async function init() {
    const { recipes } = await getRecipes();
    const validatedRecipes = validateRecipes(recipes);
    initDropdown(validatedRecipes);
    initRecipes(validatedRecipes);
}

init();
