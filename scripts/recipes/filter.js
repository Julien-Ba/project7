import { allRecipes, cleanString, recipesFilterTags, updateRecipes } from "./init.js";
import { getSearchTagDOM } from "./template.js";



// variable to store the search term
let previousSearchTerm = '';



/**
 * Handles search functionality for recipes
 * @param {Event} event - keyupEvent || resetEvent
 */

export function searchInRecipes(event) {
    removePreviousSearchTerm(previousSearchTerm);
    const searchTerm = cleanString(event.target.value);
    if (searchTerm?.length > 2) {
        recipesFilterTags.push(searchTerm);
        previousSearchTerm = searchTerm;
    }
    updateRecipes();
}



/**
 * Removes the previous search term from the filter tags
 * @param {string} searchTerm - The search term to remove
 */

function removePreviousSearchTerm(searchTerm) {
    if (recipesFilterTags?.length) {
        const index = recipesFilterTags.indexOf(searchTerm);
        if (index > -1) {
            recipesFilterTags.splice(index, 1);
        }
    }
}



/**
 * Filters recipes based on the current filter tags
 * @returns {Object[]} - The filtered recipes
 */

export function filterRecipes() {
    return recipesFilterTags?.length
        ? allRecipes.filter(recipe =>
            recipesFilterTags.every(tag =>
                hasMatchingName(tag, recipe.name)
                || hasMatchingDescription(tag, recipe.description)
                || hasMatchingIngredients(tag, recipe.ingredients)
            )
        ) : allRecipes;
}



/**
 * Checks if a tag matches the recipe name
 * @param {string} tag - The tag to check
 * @param {string} name - The recipe name
 * @returns {boolean} - True if the tag matches the name
 */

function hasMatchingName(tag, name) {
    return cleanString(name).includes(tag);
}

/**
 * Check if a tag matches the recipe description
 * @param {string} tag - The tag to check
 * @param {string} description - The recipe description
 * @returns {boolean} - True if the tag matches the description
 */

function hasMatchingDescription(tag, description) {
    return cleanString(description).includes(tag);
}



/**
 * Checks if a tag matches any of the recipe ingredients
 * @param {string} tag - The tag to check
 * @param {Object[]} ingredients - The recipe ingredients
 * @returns {boolean} - True if the tag matches any ingredient
 */

function hasMatchingIngredients(tag, ingredients) {
    return ingredients.some(ingredient => cleanString(ingredient.ingredient).includes(tag));
}



/**
 * Handles the submission of a search tag
 * @param {Event} event - The submit event
 */

export function submitSearchTag(event) {
    event.preventDefault();
    const input = event.target.querySelector('input[type="search"]');
    const tag = input.value;
    if (tag.length < 3)
        return;
    removePreviousSearchTerm(previousSearchTerm);
    previousSearchTerm = '';
    addSearchTag(tag);
    input.value = '';
}



/**
 * Adds a search tag to the DOM and updates recipes
 * @param {string} tag - The tag to add
 */

function addSearchTag(tag) {
    const container = document.querySelector('.tags');
    const tagDom = getSearchTagDOM(tag);
    container.appendChild(tagDom);
    recipesFilterTags.push(cleanString(tag));
    updateRecipes();
}



/**
 * Removes a search tag from the DOM and updates recipes
 * @param {Event} event - The remove event
 */

export function removeSearchTag(event) {
    const tagElement = event.target.parentElement;
    const tag = cleanString(tagElement.querySelector('.tag-title').textContent);
    const index = recipesFilterTags.indexOf(tag);
    if (index > -1)
        recipesFilterTags.splice(index, 1);
    tagElement.remove();
    updateRecipes();
}
