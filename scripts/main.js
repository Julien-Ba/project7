import { getRecipes } from './api/fetch_recipes.js';
import { validateRecipes } from './api/validate_recipes.js';
import { filterRecipes } from './filter/recipes.js';
import { closeDropdown, displayDropdowns, displayRecipes, toggleDropdown } from './utils/dom_mutation.js';

const filterCategories = ['ingredients', 'appliances', 'utensils'];
const allRecipes = [];

async function init() {
    const { recipes } = await getRecipes();
    const validatedRecipes = validateRecipes(recipes);
    displayRecipes(validatedRecipes);
    displayDropdowns(filterCategories, validatedRecipes);
    validatedRecipes.forEach(recipe => allRecipes.push(recipe));
}

init();

const searchbox = document.querySelector('#search');
searchbox.addEventListener('keyup', search);

function search(event) {
    const searchTerm = event.target.value;
    const matchingRecipes = searchTerm.length > 2 ? filterRecipes(searchTerm, allRecipes) : allRecipes;
    return displayRecipes(matchingRecipes);
}

filterCategories.forEach(category => {
    const container = document.querySelector(`.filters-${category}`);
    container.firstElementChild.addEventListener('click', () => toggleDropdown(container));
});

document.body.addEventListener('click', closeDropdown);
