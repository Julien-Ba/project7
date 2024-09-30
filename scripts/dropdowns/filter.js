import { cleanString } from '../utils/string.js';
import { dropdownElements, dropdownFilterTags } from './init.js';
import { populateDropdown } from './mutation.js';



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
