import { removeSearchTag, searchInRecipes, submitSearchTag } from "./filter.js";



/**
 * Initializes click event listeners
 */

export function initClickEvent() {
    document.addEventListener('click', event => {
        const target = event.target;
        const tagElement = document.querySelectorAll('.search-tag');
        if (!tagElement?.length) return;
        tagElement.forEach(element => {
            if (element.contains(target) && target.classList.contains('close-tag')) {
                // remove search tags added, unfilter the list of recipes
                removeSearchTag(event);
            }
        });
    });
}



/**
 * Initializes keyup event listeners
 */

export function initKeyupEvent() {
    document.addEventListener('keyup', event => {
        const target = event.target;
        const searchInput = document.querySelector('#search');
        if (searchInput && target === searchInput) {
            if (event.key !== 'Enter')
                // filter the recipes list
                searchInRecipes(event)
        }
    });
}



/**
 * Initializes reset event listeners
 */

export function initResetEvent() {
    document.addEventListener('reset', event => {
        const target = event.target;
        const searchForm = document.querySelector('.header-search');
        if (searchForm && target === searchForm) {
            // reset the main searchbox, unfilter the list of recipes
            searchInRecipes(event);
        }
    });
}



/**
 * Initializes submit event listeners
 */

export function initSubmitEvent() {
    document.addEventListener('submit', event => {
        const target = event.target;
        const searchForm = document.forms['search-recipes'];
        if (target === searchForm) {
            // submit the main searchbox term, add a tag to filter the list of recipes
            submitSearchTag(event);
        }
    });
}
