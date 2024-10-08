import { filterRecipes } from '../recipes/filter.js';
import { recipesFilterTags } from '../recipes/init.js';
import { displayRecipes } from '../recipes/mutation.js';
import { cleanString } from '../utils/string.js';
import { dropdownElements, dropdownFilterTags, getDropdownElements } from './init.js';
import { displayDropdownTag, populateDropdown } from './mutation.js';



let previousSearchTerm = '';

export function searchInDropdowns(event, category) {
    removePreviousSearchTerm(previousSearchTerm, category);
    const searchTerm = event.target.value;
    if (searchTerm && searchTerm.length > 2) {
        addSearchTerm(searchTerm, category);
        previousSearchTerm = searchTerm;
    }
    const matchingDropdownElements = filterDropdownElements(category);
    return populateDropdown(category, matchingDropdownElements);
}

function addSearchTerm(searchTerm, category) {
    if (!dropdownFilterTags.hasOwnProperty(category)) {
        dropdownFilterTags[category] = [];
    }
    if (!dropdownFilterTags[category].includes(searchTerm)) {
        dropdownFilterTags[category].push(searchTerm);
    }
}

function removePreviousSearchTerm(searchTerm, category) {
    if (dropdownFilterTags.hasOwnProperty(category) && Array.isArray(dropdownFilterTags[category])) {
        const index = dropdownFilterTags[category].indexOf(searchTerm);
        if (index > -1) {
            dropdownFilterTags[category].splice(index, 1);
        }
    }
}

function filterDropdownElements(category) {
    return !dropdownFilterTags[category]?.length
        ? dropdownElements[category]
        : dropdownElements[category].filter(element =>
            dropdownFilterTags[category].some(tag =>
                cleanString(element).includes(cleanString(tag))
            )
        );
}

export function addDropdownTag(event) {
    displayDropdownTag(event);
    const tag = event.target.textContent;
    recipesFilterTags.push(cleanString(tag));
    const matchingRecipes = filterRecipes();
    displayRecipes(matchingRecipes);
    const dropdownElements = getDropdownElements(matchingRecipes);
    for (const [category, elements] of Object.entries(dropdownElements)) {
        populateDropdown(category, elements);
    }
}

export function removeDropdownTag(event) {
    const tagElement = event.target.parentElement;
    tagElement.remove();
    const tag = cleanString(event.target.previousSibling.textContent);
    const index = recipesFilterTags.indexOf(tag);
    recipesFilterTags.splice(index, 1);
    const matchingRecipes = filterRecipes();
    displayRecipes(matchingRecipes);
    const dropdownElements = getDropdownElements(matchingRecipes);
    for (const [category, elements] of Object.entries(dropdownElements)) {
        populateDropdown(category, elements);
    }
}
