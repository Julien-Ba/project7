import { initKeyupEvent, initResetEvent } from './event.js';
import { displayRecipes } from './mutation.js';



export const allRecipes = [];
export const recipesFilterTags = [];



/**
 * Init Module
 * @param {Object[]} validatedRecipes 
 */



export function initRecipes(data) {
    allRecipes.push(...data);
    displayRecipes(allRecipes);
    initEventListeners();
}

function initEventListeners() {
    //initClickEvent();
    initKeyupEvent();
    initResetEvent();
}


