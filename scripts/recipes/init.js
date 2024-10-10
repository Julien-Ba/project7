import { initClickEvent, initKeyupEvent, initResetEvent, initSubmitEvent } from './event.js';
import { displayRecipes } from './mutation.js';



/** 
 * Store the array of validated recipes 
 * @type {Object[]} 
 */

export const allRecipes = [];



/** 
 * Store all the tags to filter the recipes
 * @type {String[]}  
*/

export const recipesFilterTags = [];



/** 
 * Store the array of filtered recipes
 * @type {Object[]} 
*/

export const filteredRecipes = [];



// create variables with the callback functions
export let updateRecipes;
export let capitalizedTitleCase;
export let cleanString;



/**
 * Initializes the recipes module
 * @param {Object[]} data - Array of validated recipe objects
 * @param {Function} updateRecipesCB - Callback function to update recipes
 * @param {Function} cleanString - Callback function to clean a string
 * @param {Function} capitalizeTitleCase - Callback function to capitalize a string in title case
 */

export function initRecipes(data, updateRecipesCB, cleanStringCB, capitalizeTitleCaseCB) {
    updateRecipes = updateRecipesCB;
    cleanString = cleanStringCB;
    capitalizedTitleCase = capitalizeTitleCaseCB;

    allRecipes.push(...data);
    filteredRecipes.push(...data);
    displayRecipes(allRecipes);
    initEventListeners();
}



/**
 * Initializes all event listeners for the recipes
 */

function initEventListeners() {
    initClickEvent();
    initKeyupEvent();
    initResetEvent();
    initSubmitEvent();
}


