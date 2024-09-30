import { dropdownCategories } from './init.js';
import { getDropdownDOM, getFilterDOM } from './template.js';
import { getDropdownTagDOM } from '../tags/template.js';



/**
 * Create a new dropdown for each category
 *
 * ---> need '<div class="filters-lists"></div>' in the DOM <---
 */

export function displayDropdown(dropdownElements) {
    for (const category of Object.getOwnPropertyNames(dropdownCategories)) {
        const name = dropdownCategories[category];
        const dropdown = getDropdownDOM(category, name);
        const container = document.querySelector('.filters-lists');
        container.appendChild(dropdown);
        populateDropdown(category, dropdownElements[category]);
    }
}


/**
 * Populate each dropdown category
 * @param {object[]} data 
 */

export function populateDropdown(category, dropdownElements) {
    const container = document.querySelector(`.filters-${category}-list`);
    while (container.firstChild)
        container.firstChild.remove();
    dropdownElements.forEach(value => {
        const element = getFilterDOM(value);
        container.appendChild(element);
    });
}


/**
* open or close dropdown containers
* @param {Element} container
* @returns {dataset} New value of data-expanded
*
* toggle the dataset of the dropdown container
* manage the modifications with css
* container.dataset.expanded === 'true' ? 'false : 'true
*/

export function toggleDropdown(container) {
    return container.dataset.expanded = container.dataset.expanded !== 'true';
}


/**
* alternate way to close dropdown containers
* @param {clickEvent || keydownEvent} event 
* @returns {dataset} The new value of data-expanded
*
* allow to close the dropdown if:
* - the user click outside of the container
* - the user press escape
* manage the modifications with css
*/

export function closeDropdown(event) {
    const containers = document.querySelectorAll('.filters-lists [data-expanded="true"]');

    if (event.type === 'click') {
        containers.forEach(container => {
            if (container.dataset.expanded === 'true' && !container.contains(event.target))
                return container.dataset.expanded = 'false';
        });
    }

    if (event.type === 'keydown') {
        if (event.key !== 'Escape' && event.code !== '27')
            return;
        containers.forEach(container => {
            if (container.dataset.expanded === 'true')
                return container.dataset.expanded = 'false';
        });
    }
}

export function displayDropdownTag(category, event) {
    const selectedContainer = document.querySelector(`.filters-${category}-selected`);
    const tagDOM = event.target;
    const tag = tagDOM.textContent;

    // Remove the tag from the unselected list
    tagDOM.remove();

    // Ensure the container is visible
    if (selectedContainer.style.display !== 'flex') {
        selectedContainer.style.display = 'flex';
    }

    // Create a new element and append to the selected list
    const newTagDOM = getDropdownTagDOM(tag);
    selectedContainer.insertAdjacentElement('afterbegin', newTagDOM);
}

export function removeDropdownTag(category, event) {
    const tagDOM = event.target;
    const tag = tagDOM.textContent;
    const container = tagDOM.parentElement;

    // Remove the element from the selected list
    tagDOM.remove();

    // If no sibling tags, hide the container
    if (!container.children?.length) {
        container.style.display = 'none';
    }

    // Create a new element and append to the unselected list
    const listContainer = document.querySelector(`.filters-${category}-list`);
    const unselectedTagDOM = getFilterDOM(tag);
    listContainer.insertAdjacentElement('afterbegin', unselectedTagDOM);
}
