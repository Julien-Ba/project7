import { filterRecipes } from '../recipes/filter.js';
import { recipesFilterTags } from '../recipes/init.js';
import { displayRecipes } from '../recipes/mutation.js';
import { cleanString } from '../utils/string.js';
import { dropdownElements, dropdownFilterTags, getDropdownElements } from './init.js';
import { displayDropdownTag, populateDropdown } from './mutation.js';
import { getDropdownTagDOM } from './template.js';



let previousSearchTerm = '';

export function searchInDropdowns(event, category) {
    removePreviousSearchTerm(previousSearchTerm, category);
    const searchTerm = event.target.value;
    if (searchTerm && searchTerm.length > 2) {
        addSearchTerm(searchTerm, category);
        previousSearchTerm = searchTerm;
    }
    return updateDropdown(category);
}

function updateDropdown(category) {
    const matchingDropdownElements = filterDropdownElements(category);
    return populateDropdown(category, matchingDropdownElements);
}

function removePreviousSearchTerm(searchTerm, category) {
    if (dropdownFilterTags.hasOwnProperty(category) && Array.isArray(dropdownFilterTags[category])) {
        const index = dropdownFilterTags[category].indexOf(searchTerm);
        if (index > -1) {
            dropdownFilterTags[category].splice(index, 1);
        }
    }
}

function addSearchTerm(searchTerm, category) {
    if (!dropdownFilterTags.hasOwnProperty(category))
        dropdownFilterTags[category] = [];
    dropdownFilterTags[category].push(searchTerm);
}

function filterDropdownElements(category) {
    return !dropdownFilterTags[category]?.length
        ? dropdownElements[category]
        : dropdownElements[category].filter(element =>
            dropdownFilterTags[category].every(tag =>
                cleanString(element).includes(cleanString(tag))
            )
        );
}

export function submitSearchTag(event, category) {
    event.preventDefault();
    const input = event.target.querySelector('input[type="search"]');
    const tag = input.value;

    addSearchTerm(tag, category);
    removePreviousSearchTerm(previousSearchTerm, category);
    previousSearchTerm = '';
    input.value = '';

    addSearchTag(tag, category);

    return updateDropdown(category);
}

function addSearchTag(tag, category) {
    const container = document.querySelector(`.${category}-tags`);
    const tagDom = getDropdownTagDOM(tag);
    container.appendChild(tagDom);
}

export function removeSearchTag(event, category) {
    const tagElement = event.target;
    tagElement.remove();
    const tag = cleanString(tagElement.textContent);
    removePreviousSearchTerm(tag, category);
    return updateDropdown(category);
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
