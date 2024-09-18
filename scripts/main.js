import { getRecipes } from './api/fetch_recipes.js';
import { validateRecipes } from './api/validate_recipes.js';
import { getRecipeDOM } from './template/recipes.js';

function filterRecipes(recipes) {
    const filteredRecipes = [];
    recipes.forEach(recipe => {
        filteredRecipes.push(recipe);
    });
    return filteredRecipes;
}

function displayRecipes(recipes) {
    const container = document.querySelector('.cards');
    recipes.forEach(recipe =>
        container.appendChild(getRecipeDOM(recipe))
    );
}

function displayFilters(recipes) {
    const container = document.querySelector('.filters-lists');
    recipes.forEach(recipe => {

    });
}

async function init() {
    const { recipes } = await getRecipes();
    const validatedRecipes = validateRecipes(recipes);
    displayRecipes(validatedRecipes);
    displayFilters(validatedRecipes);
}

init();

const searchbox = document.querySelector('#search');
searchbox.addEventListener('keyup', search);

function search(event) {
    if (event.target.value.length > 2) {
        console.log(`search edited: ${event.target.value}`);
    }
}
