import { dropdownCategories } from './init.js';
import { searchInDropdowns } from './filter.js';
import { closeDropdown, displayDropdownTag, removeDropdownTag, toggleDropdown } from './mutation.js';



export function initClickEvent() {
    document.body.addEventListener('click', event => {
        const target = event.target;

        // close the dropdown when the user click outside of it
        closeDropdown(event);

        // check if the div for each category has been created -> `.filters-${category}-wrapper`
        const dropdownWrappers = document.querySelector('[class^=filters-][class$=-wrapper]');
        if (!dropdownWrappers) return;

        for (const category of Object.getOwnPropertyNames(dropdownCategories)) {
            const dropdown = document.querySelector(`.filters-${category}`);
            if (dropdown && dropdown.contains(target) && target === dropdown.firstElementChild) {
                toggleDropdown(dropdown);
                break;
            }

            const listContainer = document.querySelector(`.filters-${category}-list`);
            if (listContainer && listContainer.contains(target)) {
                displayDropdownTag(category, event);
                break;
            }

            const selectedContainer = document.querySelector(`.filters-${category}-selected`);
            if (selectedContainer && selectedContainer.contains(target)) {
                removeDropdownTag(category, event);
                break;
            }
        }
    });
}

export function initKeydownEvent() {
    document.addEventListener('keydown', event => {
        closeDropdown(event);
    });
}

export function initKeyupEvent() {
    document.addEventListener('keyup', event => {
        const target = event.target;
        for (const category of Object.getOwnPropertyNames(dropdownCategories)) {
            const searchInput = document.querySelector(`#search-${category}`);
            if (searchInput && target === searchInput) {
                searchInDropdowns(event, category)
                break;
            }
        }
    });
}

export function initResetEvent() {
    document.addEventListener('reset', event => {
        const target = event.target;
        for (const category of Object.getOwnPropertyNames(dropdownCategories)) {
            const searchForm = document.querySelector(`#search-filter-${category}`);
            if (searchForm && target === searchForm) {
                searchInDropdowns(event, category);
                break;
            }
        };
    });
}
