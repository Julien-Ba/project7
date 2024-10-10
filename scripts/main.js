import { getRecipes } from './api/fetch_recipes.js';
import { validateRecipes } from './api/validate_recipes.js';
import { updateDropdown } from './dropdowns/filter.js';
import { dropdownCategories, initDropdown, updateDropdownElements } from './dropdowns/init.js';
import { filterRecipes } from './recipes/filter.js';
import { initRecipes, recipesFilterTags } from './recipes/init.js';
import { displayRecipes } from './recipes/mutation.js';
import { capitalizeTitleCase, cleanString } from './utils/string.js';



async function init() {
    const { recipes } = await getRecipes();
    const validatedRecipes = validateRecipes(recipes);
    initDropdown(validatedRecipes, addRecipesFilterTag, removeRecipesFilterTag, updateRecipes, cleanString, capitalizeTitleCase);
    initRecipes(validatedRecipes, updateRecipes, cleanString, capitalizeTitleCase);
}

init();

function updateRecipes() {
    const matchingRecipes = filterRecipes();
    displayRecipes(matchingRecipes);
    updateDropdowns(matchingRecipes);
}

function addRecipesFilterTag(tag) {
    recipesFilterTags.push(cleanString(tag));
}

function removeRecipesFilterTag(tag) {
    const index = recipesFilterTags.indexOf(tag);
    if (index > -1)
        recipesFilterTags.splice(index, 1);
}

function updateDropdowns(recipes) {
    updateDropdownElements(recipes, recipesFilterTags);
    for (const category of Object.getOwnPropertyNames(dropdownCategories)) {
        updateDropdown(category);
    }
}
