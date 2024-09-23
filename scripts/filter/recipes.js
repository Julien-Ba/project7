import { cleanString } from "../utils/string.js";

export function filterRecipes(str, recipes) {
    const matchingRecipes = [];
    recipes.forEach(recipe => {
        //console.debug(`checking recipe: ${recipe.name}`);
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
    utensils.some(utensil => cleanString(utensil).includes(str));
}
