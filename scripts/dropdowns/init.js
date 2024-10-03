import { recipesFilterTags } from '../recipes/init.js';
import { capitalizeTitleCase, cleanString } from '../utils/string.js';
import { initClickEvent, initKeydownEvent, initKeyupEvent, initResetEvent } from './event.js';
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
    Object.assign(dropdownElements, getDropdownElements(data));
    displayDropdown(dropdownElements);

    initEventListeners();
}

function initEventListeners() {
    initClickEvent();
    initKeydownEvent();
    initKeyupEvent();
    initResetEvent();
}



/**
 * Extracts unique dropdown elements from recipe data
 * @param {Object[]} data - Array of recipe objects
 * @returns {Object[]} dropdownElements - Array of filter category objects populated
 */

export function getDropdownElements(data) {
    const dropdownElements = {};
    for (const category of Object.getOwnPropertyNames(dropdownCategories)) {
        const set = new Set();

        data.forEach(recipe => {
            const categoryData = recipe[category];

            if (Array.isArray(categoryData)) {
                categoryData.forEach(element => {
                    const name = element.ingredient || element;
                    if (recipesFilterTags.includes(cleanString(name)))
                        return;
                    set.add(name);
                });
            } else if (categoryData) {
                if (!recipesFilterTags.includes(cleanString(categoryData)))
                    set.add(categoryData);
            }
        });
        dropdownElements[category] = Array.from(set).map(capitalizeTitleCase);
    }
    return dropdownElements;
}
