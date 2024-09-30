import { getRecipeDOM } from "./template.js";



/**
* display recipes card
* @param {Object[]} recipes - Array of recipe objects
* @returns {Object[]} return the same argument to keep in memory for later 
*/

export function displayRecipes(recipes, searchTerm = '') {
    const container = document.querySelector('.cards');

    while (container.firstChild) {
        container.firstChild.remove();
    }

    const noResultsMessage = document.querySelector('.no-results-message');
    noResultsMessage.style.display = 'none';
    if (recipes.length === 0) {
        noResultsMessage.textContent = `Aucune recette ne contient '${searchTerm}' vous pouvez chercher «tarte aux pommes », « poisson », etc. `;
        noResultsMessage.style.display = 'block';
    }

    recipes.forEach(recipe => {
        const recipeDOM = getRecipeDOM(recipe);
        container.appendChild(recipeDOM);
    });

    displayRecipeCount(recipes);

    return recipes;
}



/**
* display recipe count
* @param {Object[]} recipes - Array of recipe objects
* @returns {void}
*
* count the number of recipes
* edit the existing element
*/

function displayRecipeCount(recipes) {
    const countElement = document.querySelector('.recipe-count');
    countElement.textContent = `${recipes.length} recettes`;
}

