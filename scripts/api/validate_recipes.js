/**
 * Validates an array of recipes.
 * @param {Array} recipes - The array of recipes object to validate.
 * @returns {Array} An array of valid recipes object.
 */

export function validateRecipes(recipes) {
    if (!Array.isArray(recipes)) {
        console.error('Invalid recipes data: expected an array');
        return [];
    }

    const validRecipes = [];
    for (const recipe of recipes) {
        console.debug('Validating recipe:', recipe.name || 'Unnamed recipe');
        if (isValidRecipe(recipe)) {
            validRecipes.push(recipe);
            console.debug(`Recipe "${recipe.name}" is valid`);
        } else {
            console.error(`Invalid recipe found:`, recipe);
        }
    }
    console.debug(`Validated ${validRecipes.length} out of ${recipes.length} recipes`);
    return validRecipes;
}

const defaultKeys = ['id', 'image', 'name', 'servings', 'ingredients', 'time', 'description', 'appliances', 'utensils'];



/**
 * Checks if a recipe object is valid.
 * @param {Object} recipe - The recipe object to validate.
 * @returns {boolean} True if the recipe is valid, false otherwise.
 */

function isValidRecipe(recipe) {
    for (const key of defaultKeys) {
        console.debug(`Checking ${key}`);
        if (!Object.hasOwn(recipe, key) || recipe[key] == null || recipe[key] === '') {
            console.error(`Recipe is missing required key, or has null/empty value: ${key}`);
            return false;
        }
        if (!(isValidProperty(key, recipe[key]))) {
            console.error(`Invalid property: ${key}`);
            return false;
        }
    }
    return true;
}



/**
 * Validates a specific property of a recipe.
 * @param {string} key - The property key to validate.
 * @param {*} value - The value of the property to validate.
 * @returns {boolean} True if the property is valid, false otherwise.
 */

function isValidProperty(key, value) {
    const validators = {
        id: isValidID,
        image: isValidImage,
        name: isValidName,
        servings: isValidServings,
        ingredients: isValidIngredients,
        time: isValidTime,
        description: isValidDescription,
        appliances: isValidAppliance,
        utensils: isValidUtensils
    };

    if (!validators[key]) {
        console.error(`No validator found for key: ${key}`);
        return false;
    }

    const isValid = validators[key](value);
    if (!isValid) {
        console.error(`Validation failed for ${key}: ${value}`);
    }
    return isValid;
}



// Individual property validators
// Each of these functions takes a value and returns a boolean

/**
 * Checks if the id is an integer
 * @param {*} id - The id to validate.
 * @returns {boolean} True if the id is a valid integer, false otherwise.
 */

function isValidID(id) {
    if (!Number.isInteger(Number(id))) {
        console.error(`Recipe id: ${id} is not a valid integer`);
        return false;
    }
    return true;
}



/**
 * Checks the path's string format of the image
 * @param {string} image - The image filename to validate.
 * @returns {boolean} True if the image filename is valid, false otherwise.
 */

function isValidImage(image) {
    const regex = /^[a-zA-Z0-9]\w*\.(jpe?g|png|gif)$/;
    if (!regex.test(image)) {
        console.error(`Recipe image: ${image} is not a valid source format`);
        return false;
    }
    return true;
}



/**
 * Checks if the name is a string
 * @param {*} name - The name to validate.
 * @returns {boolean} True if the name is a string, false otherwise.
 */

function isValidName(name) {
    if (typeof name !== 'string') {
        console.error(`Recipe name: ${name} is not a string format`);
        return false;
    }
    return true;
}



/**
 * Checks if the servings are integers
 * @param {*} servings - The servings to validate.
 * @returns {boolean} True if servings is a valid integer, false otherwise.
 */

function isValidServings(servings) {
    if (!Number.isInteger(Number(servings))) {
        console.error(`Recipe serving: ${servings} is not a valid integer`);
        return false;
    }
    return true;
}



/**
 * Checks if the ingredients is an array of object
 * @param {*} ingredients - The ingredients to validate.
 * @returns {boolean} True if ingredients is an array of objects, false otherwise.
 */

function isValidIngredients(ingredients) {
    if (!Array.isArray(ingredients)) {
        console.error(`Recipe ingredients: ${ingredients} needs to be an array!`);
        return false;
    }
    if (ingredients.some(ingredient => typeof ingredient !== 'object')) {
        console.error(`Recipe ingredients: ${ingredients} contains non object elements!`);
        return false;
    }
    return true;
}



/**
 * Checks if time is an integer
 * @param {*} time - The time to validate.
 * @returns {boolean} True if time is a valid integer, false otherwise.
 */

function isValidTime(time) {
    if (!Number.isInteger(Number(time))) {
        console.error(`Recipe time: ${time} is not a valid integer`);
        return false;
    }
    return true;
}



/**
 * Checks if desciption is a string
 * @param {*} description - The description to validate.
 * @returns {boolean} True if the description is a string, false otherwise.
 */

function isValidDescription(description) {
    if (typeof description !== 'string') {
        console.error(`Recipe description: ${description} is not a string format`);
        return false;
    }
    return true;
}



/**
 * Checks if appliance is a string
 * @param {*} appliance - The appliance to validate.
 * @returns {boolean} True if the appliance is a string, false otherwise.
 */

function isValidAppliance(appliance) {
    if (typeof appliance !== 'string') {
        console.error(`Recipe appliance: ${appliance} is not a string format`);
        return false;
    }
    return true;
}



/**
 * Checks if utensils is an array of strings
 * @param {*} utensils - The utensils to validate.
 * @returns {boolean} True if utensils is an array of strings, false otherwise.
 */

function isValidUtensils(utensils) {
    if (!Array.isArray(utensils)) {
        console.error(`Recipe utensil: ${utensils} needs to be an array!`);
        return false;
    }
    if (utensils.some(item => typeof item !== 'string')) {
        console.error(`Recipe utensils: ${utensils} contains non string elements!`);
        return false;
    }
    return true;
}
