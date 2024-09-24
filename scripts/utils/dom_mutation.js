import { filterCategories } from '../main.js';
import { getDropdownsDOM } from '../template/dropdowns.js';
import { getRecipeDOM } from '../template/recipes.js';
import { cleanString } from './string.js';



/**
* open or close dropdown containers
* @param {Element} container
* @returns {string} The new value of data-expanded
*
* called by event in main
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
* @returns {string} The new value of data-expanded
*
* called by events in main
* allow to close the dropdown if:
* - the user click outside of the container
* - the user press escape
* manage the modifications with css
*/

export function closeDropdown(event) {
    const containers = document.querySelectorAll('.filters-lists > ul');

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



/**
* Displays dropdown menus for each filter category
* @param {string[]} filterCategories - Array of filter category names
* @param {Object[]} recipes - Array of recipe objects
* @returns {Object} Object with the categories Set

* called by main init and event

* create an object to call the differents dropdown categories elements
* create an object with a set associated for each dropdown category to ensure element uniqueness
* clear old dropdown elements

* loop through the data received from the main 
* send it to the template
* loop through the object received from the template
* pass it to the sets to ensure element uniqueness
* append to the appropriate dropdown category
*/

export function displayDropdowns(recipes) {
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
                if (!addedItems[category].has(cleanString(element.textContent))) {
                    addedItems[category].add(cleanString(element.textContent));
                    lists[category].appendChild(element);
                }
            });
        });
    });
    return addedItems;
}

export function editDropdowns(category, tags) {
    const container = document.querySelector(`.filters-${category}-wrapper`);
    while (container.firstChild) {
        container.firstChild.remove();
    }
    tags.forEach(tag => {
        const li = document.createElement('li');
        li.textContent = tag;
        container.appendChild(li)
    });
}



/**
* display recipes card
* @param {Object[]} recipes - Array of recipe objects
* @returns {Object[]} return the same argument to keep in memory for later
* 
* called by main init and event
* clear old card recipes
* loop through the data
* send it to the template
* append to the container
* call the counter
*/

export function displayRecipes(recipes, searchTerm = '') {
    const container = document.querySelector('.cards');

    while (container.firstChild) {
        container.firstChild.remove();
    }

    const noResultsMessage = document.querySelector('.no-results-message');
    noResultsMessage.style.display = 'none';
    if (recipes.length === 0) {
        noResultsMessage.textContent = `Aucune recette ne contient ‘${searchTerm}’ vous pouvez chercher «tarte aux pommes », « poisson », etc. `;
        noResultsMessage.style.display = 'block';
    }

    recipes.forEach(recipe => {
        container.appendChild(getRecipeDOM(recipe));
    });

    displayRecipeCount(recipes);

    return recipes;
}



/**
* display recipe count
* @param {Object[]} recipes - Array of recipe objects
* @returns {void}
*
* only called above
* count the number of recipes
* edit the existing element
*/

function displayRecipeCount(recipes) {
    const countElement = document.querySelector('.recipe-count');
    countElement.textContent = `${recipes.length} recettes`;
}
