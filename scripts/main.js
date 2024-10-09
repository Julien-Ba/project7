import { getRecipes } from './api/fetch_recipes.js';
import { validateRecipes } from './api/validate_recipes.js';
import { updateDropdown } from './dropdowns/filter.js';
import { dropdownCategories, initDropdown, updateDropdownElements } from './dropdowns/init.js';
import { populateDropdown } from './dropdowns/mutation.js';
import { filterRecipes } from './recipes/filter.js';
import { initRecipes, recipesFilterTags } from './recipes/init.js';
import { displayRecipes } from './recipes/mutation.js';
import { capitalizeTitleCase, cleanString } from './utils/string.js';



async function init() {
    const { recipes } = await getRecipes();
    const validatedRecipes = validateRecipes(recipes);
    initDropdown(validatedRecipes);
    initRecipes(validatedRecipes);
}

init();

export function updateRecipes() {
    const matchingRecipes = filterRecipes();
    displayRecipes(matchingRecipes);
    updateDropdowns(matchingRecipes);
}

export function isRecipesFilterTag(tag) {
    return recipesFilterTags.includes(cleanString(tag))
}

export function addRecipesFilterTag(tag) {
    recipesFilterTags.push(cleanString(tag));
}

export function removeRecipesFilterTag(tag) {
    const index = recipesFilterTags.indexOf(tag);
    if (index > -1)
        recipesFilterTags.splice(index, 1);
}

export function updateDropdowns(recipes) {
    updateDropdownElements(recipes);
    for (const category of Object.getOwnPropertyNames(dropdownCategories)) {
        updateDropdown(category);
    }
}

export function getCapitalizedTitleCase(string) {
    return capitalizeTitleCase(string);
}

export function getCleanString(string) {
    return cleanString(string);
}
