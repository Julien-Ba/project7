import { getCleanString, updateDropdowns } from "../main.js";
import { allRecipes, recipesFilterTags } from "./init.js";
import { displayRecipes } from "./mutation.js";
import { getSearchTagDOM } from "./template.js";



let previousSearchTerm = '';

export function searchInRecipes(event) {
    removePreviousSearchTerm(previousSearchTerm);
    const searchTerm = getCleanString(event.target.value);
    if (searchTerm?.length > 2) {
        recipesFilterTags.push(searchTerm);
        previousSearchTerm = searchTerm;
    }
    updateRecipes();
}

function updateRecipes() {
    const matchingRecipes = filterRecipes();
    displayRecipes(matchingRecipes);
    updateDropdowns(matchingRecipes);
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
    return getCleanString(name).includes(tag);
}

function hasMatchingIngredients(tag, ingredients) {
    return ingredients.some(ingredient => getCleanString(ingredient.ingredient).includes(tag));
}

function hasMatchingAppliances(tag, appliances) {
    return getCleanString(appliances).includes(tag);
}

function hasMatchingUtensils(tag, utensils) {
    return utensils.some(utensil => getCleanString(utensil).includes(tag));
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
    recipesFilterTags.push(getCleanString(tag));
    updateRecipes();
}

export function removeSearchTag(event) {
    const tagElement = event.target.parentElement;
    const tag = getCleanString(tagElement.querySelector('.tag-title').textContent);
    const index = recipesFilterTags.indexOf(tag);
    if (index > -1)
        recipesFilterTags.splice(index, 1);
    tagElement.remove();
    updateRecipes();
}
