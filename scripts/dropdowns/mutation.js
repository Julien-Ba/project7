import { dropdownCategories } from './init.js';
import { getDropdownDOM, getDropdownTagDOM, getFilterDOM, getMainTagDOM } from './template.js';



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

export function displayDropdownTag(event, category) {
    const selectedContainer = document.querySelector(`.filters-${category}-selected`);
    const unselectedTagElement = event.target;
    const tag = unselectedTagElement.textContent;

    // Remove the tag from the unselected list
    unselectedTagElement.remove();

    // Ensure the container is visible
    if (selectedContainer.style.display !== 'flex') {
        selectedContainer.style.display = 'flex';
    }

    // Create a new element and append to the selected list
    const dropdownTagDOM = getDropdownTagDOM(tag);
    selectedContainer.insertAdjacentElement('afterbegin', dropdownTagDOM);

    const mainTagDom = getMainTagDOM(tag);
    const tagContainer = document.querySelector('.tags');
    tagContainer.insertAdjacentElement('afterbegin', mainTagDom);
}

export function hideDropdownTag(event) {
    let category;
    let tag;
    let tagDropdownElement;
    let tagMainElement;

    const dropdownContainers = document.querySelectorAll('[class^=filters-][class$=-selected]');
    dropdownContainers.forEach(container => {
        if (container.contains(event.target)) {
            tagDropdownElement = event.target;
            tag = tagDropdownElement.textContent;
            category = container.className.replace('filters-', '').replace('-selected', '');
            return;
        }
    });
    if (!tagDropdownElement) {
        tagMainElement = event.target.parentElement;
        tag = tagMainElement.firstChild.textContent;
        dropdownContainers.forEach(container => {
            Array.from(container.children).forEach(element => {
                if (element.textContent === tag) {
                    tagDropdownElement = element;
                    category = container.className.replace('filters-', '').replace('-selected', '');
                    return;
                }
            });
            if (tagDropdownElement) return;
        });
    } else {
        const mainTags = document.querySelectorAll('.tags .dropdown-tag');
        mainTags.forEach(element => {
            if (element.firstChild.textContent === tag) {
                tagMainElement = element;
                return;
            }
        });
    }

    // If no sibling tags, hide the container
    const dropdownContainer = tagDropdownElement.parentElement;
    if (!dropdownContainer.children?.length === 1) {
        dropdownContainer.style.display = 'none';
    }

    // Remove the element from the selected list and the tag container
    [tagDropdownElement, tagMainElement].forEach(element => element.remove());

    // Create a new element and append to the unselected list
    const unselectedContainer = document.querySelector(`.filters-${category}-list`);
    const unselectedTagDOM = getFilterDOM(tag);
    unselectedContainer.insertAdjacentElement('afterbegin', unselectedTagDOM);
}
