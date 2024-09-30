import { cleanString } from "../utils/string.js";
import { allRecipes, recipesFilterTags } from "./init.js";
import { displayRecipes } from "./mutation.js";



let previousSearchTerm = '';

export function searchInRecipes(event) {
    removePreviousSearchTerm(previousSearchTerm);
    const searchTerm = cleanString(event.target.value);
    if (searchTerm?.length > 2) {
        addSearchTerm(searchTerm);
        previousSearchTerm = searchTerm;
    }
    const matchingRecipes = filterRecipes();
    return displayRecipes(matchingRecipes, searchTerm);
}

function addSearchTerm(searchTerm) {
    if (!recipesFilterTags.includes(searchTerm)) {
        recipesFilterTags.push(searchTerm);
    }
}

function removePreviousSearchTerm(searchTerm) {
    if (recipesFilterTags?.length) {
        const index = recipesFilterTags.indexOf(searchTerm);
        if (index > -1) {
            recipesFilterTags.splice(index, 1);
        }
    }
}

function filterRecipes() {
    return recipesFilterTags?.length
        ? allRecipes.filter(recipe =>
            recipesFilterTags.some(tag =>
                hasMatchingName(tag, recipe.name)
                || hasMatchingIngredients(tag, recipe.ingredients)
                || hasMatchingAppliances(tag, recipe.appliances)
                || hasMatchingUtensils(tag, recipe.utensils)
            )
        ) : allRecipes;
}

function hasMatchingName(tag, name) {
    return cleanString(name).includes(tag);
}

function hasMatchingIngredients(tag, ingredients) {
    return ingredients.some(ingredient => cleanString(ingredient.ingredient).includes(tag));
}

function hasMatchingAppliances(tag, appliances) {
    return cleanString(appliances).includes(tag);
}

function hasMatchingUtensils(tag, utensils) {
    return utensils.some(utensil => cleanString(utensil).includes(tag));
}
