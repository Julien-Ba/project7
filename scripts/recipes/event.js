import { searchInRecipes } from "./filter.js";


export function initKeyupEvent() {
    document.addEventListener('keyup', event => {
        const target = event.target;
        const searchInput = document.querySelector('#search');
        if (searchInput && target === searchInput) {
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
