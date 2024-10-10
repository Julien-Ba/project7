import { initClickEvent, initKeyupEvent, initResetEvent, initSubmitEvent } from './event.js';
import { displayRecipes } from './mutation.js';



export const allRecipes = [];
export const recipesFilterTags = [];
export const filteredRecipes = [];

export let updateRecipes;
export let capitalizedTitleCase;
export let cleanString;



/**
 * Init Module
 * @param {Object[]} validatedRecipes 
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

function initEventListeners() {
    initClickEvent();
    initKeyupEvent();
    initResetEvent();
    initSubmitEvent();
}


