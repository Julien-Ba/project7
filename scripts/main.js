import { getRecipes } from './api/fetch_recipes.js';
import { validateRecipes } from './api/validate_recipes.js';
import { updateDropdown } from './dropdowns/filter.js';
import { dropdownCategories, initDropdown, updateDropdownElements } from './dropdowns/init.js';
import { filterRecipes } from './recipes/filter.js';
import { initRecipes, recipesFilterTags } from './recipes/init.js';
import { displayRecipes } from './recipes/mutation.js';
import { capitalizeTitleCase, cleanString } from './utils/string.js';



/**
 * Initializes the application by fetching recipes, validating them,
 * and setting up the UI components.
 * @async
 * @function init
 */

async function init() {
    const { recipes } = await getRecipes();
    const validatedRecipes = validateRecipes(recipes);
    initDropdown(validatedRecipes, addRecipesFilterTag, removeRecipesFilterTag, updateRecipes, cleanString, capitalizeTitleCase);
    initRecipes(validatedRecipes, updateRecipes, cleanString, capitalizeTitleCase);
}

init();



/**
 * Updates the recipes display and dropdowns based on current filters.
 * @function updateRecipes
 */

function updateRecipes() {
    const matchingRecipes = filterRecipes();
    displayRecipes(matchingRecipes);
    updateDropdowns(matchingRecipes);
}



/**
 * Adds a new filter tag to the recipes filter.
 * @function addRecipesFilterTag
 * @param {string} tag - The tag to be added to the filter.
 */

function addRecipesFilterTag(tag) {
    recipesFilterTags.push(cleanString(tag));
}



/**
 * Removes a filter tag from the recipes filter.
 * @function removeRecipesFilterTag
 * @param {string} tag - The tag to be removed from the filter.
 */

function removeRecipesFilterTag(tag) {
    const index = recipesFilterTags.indexOf(tag);
    if (index > -1)
        recipesFilterTags.splice(index, 1);
}



/**
 * Updates all dropdowns based on the current recipes and filter tags.
 * @function updateDropdowns
 * @param {Array} recipes - The current set of recipes to base the update on.
 */

function updateDropdowns(recipes) {
    updateDropdownElements(recipes, recipesFilterTags);
    for (const category of Object.getOwnPropertyNames(dropdownCategories)) {
        updateDropdown(category);
    }
}
