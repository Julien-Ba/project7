import { getRecipes } from './api/fetch_recipes.js';
import { validateRecipes } from './api/validate_recipes.js';
import { getRecipeDOM } from './template/recipes.js';
import { getDropdownsDOM } from './template/dropdowns.js';

function filterRecipes(recipes) {
    const filteredRecipes = [];
    recipes.forEach(recipe => {
        filteredRecipes.push(recipe);
    });
    return filteredRecipes;
}

function displayRecipes(recipes) {
    const container = document.querySelector('.cards');
    recipes.forEach(recipe =>
        container.appendChild(getRecipeDOM(recipe))
    );
}

function displayDropdowns(recipes) {
    const container = document.querySelector('.filters-lists');
    const lists = {
        ingredients: container.querySelector('.filters-ingredients'),
        appliances: container.querySelector('.filters-appliances'),
        utensils: container.querySelector('.filters-utensils')
    };

    Object.values(lists).forEach(clearListItems);

    const addedItems = {
        ingredients: new Set(),
        appliances: new Set(),
        utensils: new Set()
    };

    recipes.forEach(recipe => {
        const dropdowns = getDropdownsDOM(recipe);
        addFilterItems(dropdowns, lists, addedItems);
    });
}

function addFilterItems(dropdowns, lists, addedItems) {
    const categories = ['ingredients', 'appliances', 'utensils'];

    Object.entries(dropdowns).forEach(([index, elements], categoryIndex) => {
        const category = categories[categoryIndex];
        elements.forEach(element => {
            const textContent = element.textContent;
            if (!addedItems[category].has(textContent)) {
                addedItems[category].add(textContent);
                lists[category].appendChild(element);
            }
        });
    });
}

function clearListItems(list) {
    list.querySelectorAll('li').forEach(li => li.remove());
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
