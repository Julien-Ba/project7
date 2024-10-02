import { removeSearchTag, searchInRecipes, submitSearchTag } from "./filter.js";


export function initClickEvent() {
    document.addEventListener('click', event => {
        const target = event.target;
        const tagElement = document.querySelectorAll('.search-tag');
        if (!tagElement?.length) return;
        tagElement.forEach(element => {
            if (element.contains(target) && target.classList.contains('close-tag')) {
                removeSearchTag(event);
            }
        });
    });
}

export function initKeyupEvent() {
    document.addEventListener('keyup', event => {
        const target = event.target;
        const searchInput = document.querySelector('#search');
        if (searchInput && target === searchInput) {
            if (event.key !== 'Enter')
                searchInRecipes(event)
        }
    });
}

export function initResetEvent() {
    document.addEventListener('reset', event => {
        const target = event.target;
        const searchForm = document.querySelector('.header-search');
        if (searchForm && target === searchForm) {
            searchInRecipes(event);
        }
    });
}

export function initSubmitEvent() {
    document.addEventListener('submit', event => {
        const target = event.target;
        const searchForm = document.forms['search-recipes'];
        if (target === searchForm) {
            submitSearchTag(event);
        }
    });
}
