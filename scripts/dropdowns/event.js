import { dropdownCategories } from './init.js';
import { addDropdownTag, removeDropdownTag, removeSearchTag, searchInDropdowns, submitSearchTag } from './filter.js';
import { closeDropdown, toggleDropdown } from './mutation.js';



/**
 * Initializes click event listeners
 */

export function initClickEvent() {
    document.body.addEventListener('click', event => {
        const target = event.target;

        // close the dropdown when the user click outside of it
        closeDropdown(event);

        const tagElement = document.querySelectorAll('.dropdown-tag');
        if (tagElement?.length) {
            tagElement.forEach(element => {
                if (element.contains(target) && target.classList.contains('close-tag')) {
                    // remove tags added to the main search filters, put them back in the associated dropdown
                    removeDropdownTag(event);
                }
            });
        }

        // check if the div for each category has been created -> `.filters-${category}-wrapper`
        const dropdownWrappers = document.querySelector('[class^=filters-][class$=-wrapper]');
        if (!dropdownWrappers) return;

        for (const category of Object.getOwnPropertyNames(dropdownCategories)) {
            const dropdown = document.querySelector(`.filters-${category}`);
            if (dropdown && dropdown.contains(target) && target === dropdown.firstElementChild) {
                // toggle the opening/closing of the dropdowns
                toggleDropdown(dropdown);
                break;
            }

            const listContainer = document.querySelector(`.filters-${category}-list`);
            if (listContainer && listContainer.contains(target)) {
                // add tags to the main search filters
                addDropdownTag(event);
                break;
            }

            const tagContainer = document.querySelector(`.${category}-tags`);
            if (tagContainer && tagContainer.contains(target)) {
                // remove dropdown's search term
                removeSearchTag(event, category);
                break;
            }
        }
    });
}



/**
 * Initializes keydown event listeners
 */

export function initKeydownEvent() {
    document.addEventListener('keydown', event => {
        // close the dropdown by pressing escape
        closeDropdown(event);
    });
}



/**
 * Initializes keyup event listeners
 */

export function initKeyupEvent() {
    document.addEventListener('keyup', event => {
        const target = event.target;
        for (const category of Object.getOwnPropertyNames(dropdownCategories)) {
            const searchInput = document.querySelector(`#search-${category}`);
            if (searchInput && target === searchInput) {
                // filter the dropdown list with its searchbox
                searchInDropdowns(event, category)
                break;
            }
        }
    });
}



/**
 * Initializes reset event listeners
 */

export function initResetEvent() {
    document.addEventListener('reset', event => {
        const target = event.target;
        for (const category of Object.getOwnPropertyNames(dropdownCategories)) {
            const searchForm = document.querySelector(`#search-filter-${category}`);
            if (searchForm && target === searchForm) {
                // reset the dropdown's searchbox
                searchInDropdowns(event, category);
                break;
            }
        };
    });
}



/**
 * Initializes submit event listeners
 */

export function initSubmitEvent() {
    document.addEventListener('submit', event => {

        const target = event.target;
        for (const category of Object.getOwnPropertyNames(dropdownCategories)) {
            const searchForm = document.querySelector(`#search-filter-${category}`);
            if (searchForm && target === searchForm) {
                // submit the dropdown's searchbox term, add a tag to filter its list
                submitSearchTag(event, category);
                break;
            }
        };
    });
}
