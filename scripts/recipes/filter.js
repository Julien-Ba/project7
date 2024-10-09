import { allRecipes, cleanString, recipesFilterTags, updateRecipes } from "./init.js";
import { getSearchTagDOM } from "./template.js";



let previousSearchTerm = '';

export function searchInRecipes(event) {
    removePreviousSearchTerm(previousSearchTerm);
    const searchTerm = cleanString(event.target.value);
    if (searchTerm?.length > 2) {
        recipesFilterTags.push(searchTerm);
        previousSearchTerm = searchTerm;
    }
    updateRecipes();
}

function removePreviousSearchTerm(searchTerm) {
    if (recipesFilterTags?.length) {
        const index = recipesFilterTags.indexOf(searchTerm);
        if (index > -1) {
            recipesFilterTags.splice(index, 1);
        }
    }
}

export function filterRecipes() {
    return recipesFilterTags?.length
        ? allRecipes.filter(recipe =>
            recipesFilterTags.every(tag =>
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

export function submitSearchTag(event) {
    event.preventDefault();
    const input = event.target.querySelector('input[type="search"]');
    const tag = input.value;
    removePreviousSearchTerm(previousSearchTerm);
    previousSearchTerm = '';
    addSearchTag(tag);
    input.value = '';
}

function addSearchTag(tag) {
    const container = document.querySelector('.tags');
    const tagDom = getSearchTagDOM(tag);
    container.appendChild(tagDom);
    recipesFilterTags.push(cleanString(tag));
    updateRecipes();
}

export function removeSearchTag(event) {
    const tagElement = event.target.parentElement;
    const tag = cleanString(tagElement.querySelector('.tag-title').textContent);
    const index = recipesFilterTags.indexOf(tag);
    if (index > -1)
        recipesFilterTags.splice(index, 1);
    tagElement.remove();
    updateRecipes();
}
