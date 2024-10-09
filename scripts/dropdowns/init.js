import { getCapitalizedTitleCase, isRecipesFilterTag } from '../main.js';
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



/**
 * Init Module
 * @param {Object[]} validatedRecipes 
 */

export function initDropdown(data) {
    Object.assign(dropdownElements, updateDropdownElements(data));
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

export function updateDropdownElements(data) {
    for (const key in dropdownElements) {
        delete dropdownElements[key];
    }

    for (const category of Object.getOwnPropertyNames(dropdownCategories)) {
        const set = new Set();

        data.forEach(recipe => {
            const categoryData = recipe[category];

            if (Array.isArray(categoryData)) {
                categoryData.forEach(element => {
                    const name = element.ingredient || element;
                    if (isRecipesFilterTag(name))
                        return;
                    set.add(name);
                });
            } else if (categoryData) {
                if (!isRecipesFilterTag(categoryData))
                    set.add(categoryData);
            }
        });
        dropdownElements[category] = Array.from(set).map(getCapitalizedTitleCase);
    }
    return dropdownElements;
}
