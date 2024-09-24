import { getRecipes } from './api/fetch_recipes.js';
import { validateRecipes } from './api/validate_recipes.js';
import { searchInDropdowns } from './filter/dropdowns.js';
import { searchInRecipes } from './filter/recipes.js';
import { closeDropdown, displayDropdowns, displayDropdownTag, displayRecipes, removeDropdownTag, toggleDropdown } from './utils/dom_mutation.js';





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
const searchForm = document.querySelector('.header-search');
searchForm.addEventListener('reset', searchInRecipes);

const searchInput = document.querySelector('#search');
searchInput.addEventListener('keyup', searchInRecipes);


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
    const searchForm = document.querySelector(`#search-filter-${category}`);
    searchForm.addEventListener('reset', event => searchInDropdowns(event, category));

    const searchInput = document.querySelector(`#search-${category}`);
    searchInput.addEventListener('keyup', event => searchInDropdowns(event, category));
});


// dropdowns tags
filterCategories.forEach(category => {
    const listContainer = document.querySelector(`.filters-${category}-list`);
    listContainer.addEventListener('click', event => displayDropdownTag(category, event));

    const selectedContainer = document.querySelector(`.filters-${category}-selected`);
    selectedContainer.addEventListener('click', event => removeDropdownTag(category, event));
});
