import { addRecipesFilterTag, dropdownElements, dropdownFilterTags, getCleanString, removeRecipesFilterTag, updateRecipes } from './init.js';
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
    updateDropdown(category);
}

export function updateDropdown(category) {
    const matchingDropdownElements = filterDropdownElements(category);
    populateDropdown(category, matchingDropdownElements);
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

function addSearchTag(tag, category) {
    const container = document.querySelector(`.${category}-tags`);
    const tagDom = getDropdownTagDOM(tag);
    container.appendChild(tagDom);
}

export function removeSearchTag(event, category) {
    const tagElement = event.target;
    tagElement.remove();
    const tag = getCleanString(tagElement.textContent);
    removePreviousSearchTerm(tag, category);
    updateDropdown(category);
}

export function addDropdownTag(event) {
    displayDropdownTag(event);
    const tag = event.target.textContent;
    addRecipesFilterTag(tag);
    updateRecipes();
}

export function removeDropdownTag(event) {
    const tagElement = event.target.parentElement;
    tagElement.remove();
    const tag = getCleanString(event.target.previousSibling.textContent);
    removeRecipesFilterTag(tag);
    updateRecipes();
}
