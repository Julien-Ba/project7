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
    const lists = Object.fromEntries(
        filterCategories.map(category => [category, document.querySelector(`.filters-${category}-wrapper`)])
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
                if (!addedItems[category].has(element.textContent.trim().toLowerCase())) {
                    addedItems[category].add(element.textContent.trim().toLowerCase());
                    lists[category].appendChild(element);
                }
            });
        });
    });
}

function displayRecipeCount(recipes) {
    const countElement = document.querySelector('.recipe-count');
    let count = 0;
    recipes.forEach(() => count += 1);
    countElement.textContent = `${count} recettes`;
}

async function init() {
    const { recipes } = await getRecipes();
    const validatedRecipes = validateRecipes(recipes);
    displayRecipes(validatedRecipes);
    displayDropdowns(validatedRecipes);
    displayRecipeCount(validatedRecipes);
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
    container.firstElementChild.addEventListener('click', () =>
        container.dataset.expended = (container.dataset.expended === 'true') ? 'false' : 'true'
    )
});

const body = document.querySelector('body');
body.addEventListener('click', closeDropdown);

function closeDropdown(event) {
    const containers = document.querySelectorAll('.filters-lists > ul');
    containers.forEach(container => {
        if (container.dataset.expended !== 'true')
            return;
        if (event.target === container || container.contains(event.target))
            return;
        container.dataset.expended = 'false';
    });
}
