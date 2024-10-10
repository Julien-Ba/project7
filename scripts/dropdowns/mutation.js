import { dropdownCategories } from './init.js';
import { getDropdownDOM, getFilterDOM, getMainTagDOM } from './template.js';



/**
 * Creates a new dropdown for each category
 * @param {Object.<string, string[]>} dropdownElements - Object containing dropdown elements for each category
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
 * Populates a dropdown category with elements
 * @param {string} category - The category to populate
 * @param {string[]} dropdownElements - Array of elements to populate the dropdown with
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
 * Toggles the expanded state of a dropdown container
 * @param {Element} container - The dropdown container element
 * @returns {string} The new value of data-expanded
 */

export function toggleDropdown(container) {
    return container.dataset.expanded = container.dataset.expanded !== 'true';
}


/**
* Alternate ways to close dropdown containers
* @param {Event} event - clickEvent || keydownEvent
* @returns {string} The new value of data-expanded
*/

export function closeDropdown(event) {
    const containers = document.querySelectorAll('.filters-lists [data-expanded="true"]');

    // close the dropdown if the user click outside of the container
    if (event.type === 'click') {
        containers.forEach(container => {
            if (container.dataset.expanded === 'true' && !container.contains(event.target))
                return container.dataset.expanded = 'false';
        });
    }

    // close the dropdown if the user press escape
    if (event.type === 'keydown') {
        if (event.key !== 'Escape' && event.code !== '27')
            return;
        containers.forEach(container => {
            if (container.dataset.expanded === 'true')
                return container.dataset.expanded = 'false';
        });
    }
}



/**
 * Displays a selected dropdown tag in the main tag container
 * @param {Event} event - clickEvent
 */

export function displayDropdownTag(event) {
    const unselectedTagElement = event.target;
    const tag = unselectedTagElement.textContent;

    // Remove the tag from the dropdown
    unselectedTagElement.remove();

    // Add the tag to the main container
    const mainTagDom = getMainTagDOM(tag);
    const tagContainer = document.querySelector('.tags');
    tagContainer.insertAdjacentElement('afterbegin', mainTagDom);
}
