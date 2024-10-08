import { dropdownCategories } from './init.js';
import { addDropdownTag, removeDropdownTag, searchInDropdowns } from './filter.js';
import { closeDropdown, toggleDropdown } from './mutation.js';



export function initClickEvent() {
    document.body.addEventListener('click', event => {
        const target = event.target;

        // close the dropdown when the user click outside of it
        closeDropdown(event);

        const tagElement = document.querySelectorAll('.dropdown-tag');
        if (tagElement?.length) {
            tagElement.forEach(element => {
                if (element.contains(target) && target.classList.contains('close-tag')) {
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
                toggleDropdown(dropdown);
                break;
            }

            const listContainer = document.querySelector(`.filters-${category}-list`);
            if (listContainer && listContainer.contains(target)) {
                addDropdownTag(event);
                break;
            }

            const tagContainer = document.querySelector(`.${category}-tags`);
            if (tagContainer && tagContainer.contains(target)) {
                removeDropdownTag(event);
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
