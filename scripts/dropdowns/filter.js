import { addRecipesFilterTag, dropdownElements, dropdownFilterTags, getCleanString, removeRecipesFilterTag, updateRecipes } from './init.js';
import { displayDropdownTag, populateDropdown } from './mutation.js';
import { getDropdownTagDOM } from './template.js';



// variable to store the search term
let previousSearchTerm = '';



/**
 * Handles search functionality within dropdowns
 * @param {Event} event - keyupEvent || resetEvent
 * @param {string} category - The category being searched
 */

export function searchInDropdowns(event, category) {
    removePreviousSearchTerm(previousSearchTerm, category);
    const searchTerm = event.target.value;
    if (searchTerm && searchTerm.length > 2) {
        addSearchTerm(searchTerm, category);
        previousSearchTerm = searchTerm;
    }
    updateDropdown(category);
}



/**
 * Updates the dropdown for a specific category
 * @param {string} category - The category to update
 */

export function updateDropdown(category) {
    const matchingDropdownElements = filterDropdownElements(category);
    populateDropdown(category, matchingDropdownElements);
}



/**
 * Removes the previous search term from the filter tags
 * @param {string} searchTerm - The search term to remove
 * @param {string} category - The category to remove the search term from
 */

function removePreviousSearchTerm(searchTerm, category) {
    if (dropdownFilterTags.hasOwnProperty(category) && Array.isArray(dropdownFilterTags[category])) {
        const index = dropdownFilterTags[category].indexOf(searchTerm);
        if (index > -1) {
            dropdownFilterTags[category].splice(index, 1);
        }
    }
}



/**
 * Adds a search term to the filter tags
 * @param {string} searchTerm - The search term to add
 * @param {string} category - The category to add the search term to
 */

function addSearchTerm(searchTerm, category) {
    if (!dropdownFilterTags.hasOwnProperty(category))
        dropdownFilterTags[category] = [];
    dropdownFilterTags[category].push(searchTerm);
}



/**
 * Filters dropdown elements based on the current filter tags
 * @param {string} category - The category to filter
 * @returns {string[]} - The filtered dropdown elements
 */

function filterDropdownElements(category) {
    if (!dropdownFilterTags[category] || dropdownFilterTags[category].length === 0)
        return dropdownElements[category];
    const filteredElements = [];
    for (const element of dropdownElements[category]) {
        let isMatch = true;
        for (const tag of dropdownFilterTags[category]) {
            if (!getCleanString(element).includes(getCleanString(tag))) {
                isMatch = false;
                break;
            }
        }
        if (isMatch)
            filteredElements.push(element);
    }
    return filteredElements;
}



/**
 * Handles the submission of a search tag
 * @param {Event} event - The submit event
 * @param {string} category - The category being searched
 */

export function submitSearchTag(event, category) {
    event.preventDefault();
    const input = event.target.querySelector('input[type="search"]');
    const tag = input.value;

    if (tag.length < 3)
        return;

    addSearchTerm(tag, category);
    removePreviousSearchTerm(previousSearchTerm, category);
    previousSearchTerm = '';
    input.value = '';

    addSearchTag(tag, category);

    updateDropdown(category);
}



/**
 * Adds a search tag to the DOM
 * @param {string} tag - The tag to add
 * @param {string} category - The category to add the tag to
 */

function addSearchTag(tag, category) {
    const container = document.querySelector(`.${category}-tags`);
    const tagDom = getDropdownTagDOM(tag);
    container.appendChild(tagDom);
}



/**
 * Removes a search tag
 * @param {Event} event - The click event
 * @param {string} category - The category to remove the tag from
 */

export function removeSearchTag(event, category) {
    const tagElement = event.target;
    tagElement.remove();
    const tag = getCleanString(tagElement.textContent);
    removePreviousSearchTerm(tag, category);
    updateDropdown(category);
}



/**
 * Adds a dropdown tag to the main recipes filters
 * @param {Event} event - The click event
 */

export function addDropdownTag(event) {
    displayDropdownTag(event);
    const tag = event.target.textContent;
    addRecipesFilterTag(tag);
    updateRecipes();
}



/**
 * Removes a dropdown tag from the main recipes filters
 * @param {Event} event - The click event
 */

export function removeDropdownTag(event) {
    const tagElement = event.target.parentElement;
    tagElement.remove();
    const tag = getCleanString(event.target.previousSibling.textContent);
    removeRecipesFilterTag(tag);
    updateRecipes();
}
