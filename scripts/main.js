import { getRecipes } from './api/fetch_recipes.js';
import { Recipe } from './template/recipes.js';

function displayRecipes(recipes) {
    const container = document.querySelector('.cards');

    recipes.forEach(recipe => {
        const recipeTemplate = new Recipe(recipe);
        container.appendChild(recipeTemplate.getRecipeDOM());
    });
}

async function init() {
    const recipes = await getRecipes();
    displayRecipes(recipes);
}

init();
