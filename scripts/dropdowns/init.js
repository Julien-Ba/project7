import { initClickEvent, initKeydownEvent, initKeyupEvent, initResetEvent, initSubmitEvent } from './event.js';
import { displayDropdown } from './mutation.js';



/**
 * Object to inform the number of dropdowns and their names
 * key: normalized name used to create classes and such
 * value: name to display
 * @type {Object.<string, string>}
 */

export const dropdownCategories = {
    ingredients: 'Ingrédients',
    appliances: 'Appareils',
    utensils: 'Ustensiles'
};



/**
 * Object to be populated with each filter tag associated to each dropdown
 * key: normalized dropdown name
 * value: tags array
 * @type {Object.<string, string[]>}
 */

export const dropdownElements = {};



/**
 * Object to be populated with the search terms to filter the dropdown list
 * key: normalized dropdown name
 * value: search terms array
 * @type {Object.<string, string[]>}
 */

export const dropdownFilterTags = {};



// create variables with the callback functions
export let addRecipesFilterTag;
export let removeRecipesFilterTag;
export let updateRecipes;
export let getCleanString;
export let getCapitalizedTitleCase;



/**
 * Initializes the dropdown module
 * @param {Object[]} data - Array of validated recipe objects
 * @param {Function} addRecipesFilterTagCB - Callback function to add a recipe filter tag
 * @param {Function} removeRecipesFilterTagCB - Callback function to remove a recipe filter tag
 * @param {Function} updateRecipesCB - Callback function to update recipes
 * @param {Function} cleanString - Callback function to clean a string
 * @param {Function} capitalizeTitleCase - Callback function to capitalize a string in title case
 */

export function initDropdown(data, addRecipesFilterTagCB, removeRecipesFilterTagCB, updateRecipesCB, cleanString, capitalizeTitleCase) {
    addRecipesFilterTag = addRecipesFilterTagCB;
    removeRecipesFilterTag = removeRecipesFilterTagCB;
    updateRecipes = updateRecipesCB
    getCleanString = cleanString;
    getCapitalizedTitleCase = capitalizeTitleCase;
    Object.assign(dropdownElements, updateDropdownElements(data, []));
    displayDropdown(dropdownElements);

    initEventListeners();
}



/**
 * Initializes all event listeners for the dropdown
 */

function initEventListeners() {
    initClickEvent();
    initKeydownEvent();
    initKeyupEvent();
    initResetEvent();
    initSubmitEvent();
}



/**
 * Extracts unique dropdown elements from recipe data, exclude existing tags
 * @param {Object[]} data - Array of recipe objects
 * @param {string[]} tags - Array of existing filter tags
 * @returns {Object.<string, string[]>} dropdownElements - Object of filter category arrays
 */

export function updateDropdownElements(data, tags) {
    for (const key in dropdownElements) {
        delete dropdownElements[key];
    }

    for (const category of Object.getOwnPropertyNames(dropdownCategories)) {
        const set = new Set();

        data.forEach(recipe => {
            const categoryData = recipe[category];

            if (Array.isArray(categoryData)) {
                categoryData.forEach(element => {
                    const name = getCleanString(element.ingredient || element);
                    if (!tags.includes(name))
                        set.add(name);
                });
            } else if (categoryData) {
                if (!tags.includes(getCleanString(categoryData)))
                    set.add(categoryData);
            }
        });
        dropdownElements[category] = Array.from(set).map(getCapitalizedTitleCase);
    }
    return dropdownElements;
}
