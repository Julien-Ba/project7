import { getRecipes } from './api/fetch_recipes.js';
import { validateRecipes } from './api/validate_recipes.js';
import { searchInDropdowns } from './filter/dropdowns.js';
import { searchInRecipes } from './filter/recipes.js';
import { closeDropdown, displayDropdowns, displayRecipes, toggleDropdown } from './utils/dom_mutation.js';





// ----- init ----- \\


export const filterCategories = ['ingredients', 'appliances', 'utensils'];
export let allRecipes = [];
export let allDropdowns = {};
export let filteredRecipes = [];
export let filteredDropdowns = {};

async function init() {
    const { recipes } = await getRecipes();
    const validatedRecipes = validateRecipes(recipes);
    allRecipes = displayRecipes(validatedRecipes);
    allDropdowns = displayDropdowns(validatedRecipes);
}

init();





// ----- Event Listeners ----- \\


// main searchbox
const searchbox = document.querySelector('#search');
searchbox.addEventListener('keyup', searchInRecipes);


// open/close dropdowns
filterCategories.forEach(category => {
    const container = document.querySelector(`.filters-${category}`);
    container.firstElementChild.addEventListener('click', () => toggleDropdown(container));
});

document.body.addEventListener('click', closeDropdown);

document.addEventListener('keydown', event => {
    closeDropdown(event);
});


// dropdowns searboxes
filterCategories.forEach(category => {
    const searchbox = document.querySelector(`#search-${category}`);
    searchbox.addEventListener('keyup', event => searchInDropdowns(event, category));
});
