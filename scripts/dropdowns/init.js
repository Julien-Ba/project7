import { initClickEvent, initKeydownEvent, initKeyupEvent, initResetEvent, initSubmitEvent } from './event.js';
import { displayDropdown } from './mutation.js';



/**
 * Object to inform the number of dropdowns and their names
 * key: normalized name used to create classes and such
 * value: name to display
 */

export const dropdownCategories = {
    ingredients: 'Ingrédients',
    appliances: 'Appareils',
    utensils: 'Ustensiles'
};

export const dropdownElements = {};
export const dropdownFilterTags = {};

export let addRecipesFilterTag;
export let removeRecipesFilterTag;
export let updateRecipes;
export let getCleanString;
export let getCapitalizedTitleCase;



/**
 * Init Module
 * @param {Object[]} validatedRecipes 
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

function initEventListeners() {
    initClickEvent();
    initKeydownEvent();
    initKeyupEvent();
    initResetEvent();
    initSubmitEvent();
}



/**
 * Extracts unique dropdown elements from recipe data
 * @param {Object[]} data - Array of recipe objects
 * @returns {Object[]} dropdownElements - Array of filter category objects populated
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
