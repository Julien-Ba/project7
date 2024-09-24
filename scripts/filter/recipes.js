import { allDropdowns, allRecipes, filteredRecipes } from "../main.js";
import { displayDropdowns, displayRecipes } from "../utils/dom_mutation.js";
import { cleanString } from "../utils/string.js";

export function searchInRecipes(event) {
    const searchTerm = event.target.value;
    const matchingRecipes = (searchTerm && searchTerm.length > 2) ? filterRecipes(searchTerm, allRecipes) : allRecipes;
    filteredRecipes.length = 0;
    filteredRecipes.push(...matchingRecipes);
    displayRecipes(filteredRecipes, searchTerm);

    for (const key of Object.getOwnPropertyNames(allDropdowns)) {
        delete allDropdowns[key];
    }
    const matchingDropdowns = displayDropdowns(filteredRecipes);
    for (const key of Object.getOwnPropertyNames(matchingDropdowns)) {
        allDropdowns[key] = matchingDropdowns[key];
    }
}

function filterRecipes(str, recipes) {
    const matchingRecipes = [];
    recipes.forEach(recipe => {
        if (hasMatchingName(str, recipe.name)
            || hasMatchingIngredients(str, recipe.ingredients)
            || hasMatchingAppliance(str, recipe.appliance)
            || hasMatchingUtensils(str, recipe.ustensils))
            matchingRecipes.push(recipe);
    });
    return matchingRecipes;
}

function hasMatchingName(str, name) {
    return cleanString(name).includes(str);
}

function hasMatchingIngredients(str, ingredients) {
    return ingredients.some(ingredient => cleanString(ingredient.ingredient).includes(str));
}

function hasMatchingAppliance(str, appliance) {
    return cleanString(appliance).includes(str);
}

function hasMatchingUtensils(str, utensils) {
    return utensils.some(utensil => cleanString(utensil).includes(str));
}
