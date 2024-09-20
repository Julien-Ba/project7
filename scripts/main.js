import { getRecipes } from './api/fetch_recipes.js';
import { validateRecipes } from './api/validate_recipes.js';
import { getRecipeDOM } from './template/recipes.js';
import { getDropdownsDOM } from './template/dropdowns.js';

const filterCategories = ['ingredients', 'appliances', 'utensils'];

function filterRecipes(recipes) {
    const filteredRecipes = [];
    recipes.forEach(recipe => {
        filteredRecipes.push(recipe);
    });
    return filteredRecipes;
}

function displayRecipes(recipes) {
    const container = document.querySelector('.cards');

    while (container.firstChild) {
        container.firstChild.remove();
    }

    recipes.forEach(recipe =>
        container.appendChild(getRecipeDOM(recipe))
    );
}

function displayDropdowns(recipes) {
    const container = document.querySelector('.filters-lists');
    const lists = Object.fromEntries(
        filterCategories.map(category => [category, container.querySelector(`.filters-${category}`)])
    );

    const addedItems = Object.fromEntries(
        filterCategories.map(category => [category, new Set()])
    );

    filterCategories.forEach(category => {
        const listElements = lists[category].querySelectorAll('li');
        listElements.forEach(element => element.remove());
    });

    recipes.forEach(recipe => {
        const dropdowns = getDropdownsDOM(recipe);
        filterCategories.forEach(category => {
            dropdowns[category].forEach(element => {
                if (!addedItems[category].has(element)) {
                    addedItems[category].add(element.textContent);
                    lists[category].appendChild(element);
                }
            });
        });
    });
}

async function init() {
    const { recipes } = await getRecipes();
    const validatedRecipes = validateRecipes(recipes);
    displayRecipes(validatedRecipes);
    displayDropdowns(validatedRecipes);
}

init();

const searchbox = document.querySelector('#search');
searchbox.addEventListener('keyup', search);

function search(event) {
    if (event.target.value.length > 2) {
        console.log(`search edited: ${event.target.value}`);
    }
}

filterCategories.forEach(category => {
    const container = document.querySelector(`.filters-${category}`);
    container.addEventListener('click', event => {
        event.target.dataset.expended = (event.target.dataset.expended === 'true') ? 'false' : 'true';
    });
});
