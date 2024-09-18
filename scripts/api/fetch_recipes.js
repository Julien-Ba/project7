export async function getRecipes() {
    const src = 'data/recipes.json';
    try {
        const response = await fetch(src);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.debug(json);
        return await validateRecipes(json);
    } catch (error) {
        console.error(error.message);
        return [];
    }
}

async function validateRecipes(json) {
    if (!Array.isArray(json.recipes)) {
        console.error('Invalid recipes data: expected an array');
        return [];
    }

    const validRecipes = [];
    for (const recipe of json.recipes) {
        console.debug('Validating recipe:', recipe.name || 'Unnamed recipe');
        if (await isValidRecipe(recipe)) {
            validRecipes.push(recipe);
            console.debug(`Recipe "${recipe.name}" is valid`);
        } else {
            console.error(`Invalid recipe found:`, recipe);
        }
    }
    console.debug(`Validated ${validRecipes.length} out of ${json.recipes.length} recipes`);
    return validRecipes;
}

const defaultKeys = ['id', 'image', 'name', 'servings', 'ingredients', 'time', 'description', 'appliance', 'ustensils'];

async function isValidRecipe(recipe) {
    for (const key of defaultKeys) {
        console.debug(`Checking ${key}`);
        if (!Object.hasOwn(recipe, key) || recipe[key] == null || recipe[key] === '') {
            console.error(`Recipe is missing required key, or has null/empty value: ${key}`);
            return false;
        }
        if (!(await isValidProperty(key, recipe[key]))) {
            console.error(`Invalid property: ${key}`);
            return false;
        }
    }
    return true;
}

async function isValidProperty(key, value) {
    const validators = {
        id: isValidID,
        image: isValidImage,
        name: isValidName,
        servings: isValidServings,
        ingredients: isValidIngredients,
        time: isValidTime,
        description: isValidDescription,
        appliance: isValidAppliance,
        ustensils: isValidUstensils
    };

    if (!validators[key]) {
        console.error(`No validator found for key: ${key}`);
        return false;
    }

    const isValid = await validators[key](value);
    if (!isValid) {
        console.error(`Validation failed for ${key}: ${value}`);
    }
    return isValid;
}

function isValidID(id) {
    if (!Number.isInteger(Number(id))) {
        console.error(`Recipe id: ${id} is not a valid integer`);
        return false;
    }
    return true;
}

async function isValidImage(image) {
    const regex = /^[a-zA-Z0-9]\w*\.(jpe?g|png|gif)$/;
    if (!regex.test(image)) {
        console.error(`Recipe image: ${image} is not a valid source format`);
        return false;
    }
    if (!(await isImageLoading(image))) {
        console.error(`Failed to load image: ${image}`);
        return false;
    }
    return true;
}

function isImageLoading(path) {
    return new Promise((resolve) => {
        let image = new Image();
        image.src = `assets/images/${path}`;
        image.onload = () => resolve(true);
        image.onerror = () => resolve(false);
    });
}

function isValidName(name) {
    if (typeof name !== 'string') {
        console.error(`Recipe name: ${name} is not a string format`);
        return false;
    }
    return true;
}

function isValidServings(servings) {
    if (!Number.isInteger(Number(servings))) {
        console.error(`Recipe serving: ${servings} is not a valid integer`);
        return false;
    }
    return true;
}

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

function isValidTime(time) {
    if (!Number.isInteger(Number(time))) {
        console.error(`Recipe time: ${time} is not a valid integer`);
        return false;
    }
    return true;
}

function isValidDescription(description) {
    if (typeof description !== 'string') {
        console.error(`Recipe description: ${description} is not a string format`);
        return false;
    }
    return true;
}

function isValidAppliance(appliance) {
    if (typeof appliance !== 'string') {
        console.error(`Recipe appliance: ${appliance} is not a string format`);
        return false;
    }
    return true;
}

function isValidUstensils(ustensils) {
    if (!Array.isArray(ustensils)) {
        console.error(`Recipe ustensil: ${ustensils} needs to be an array!`);
        return false;
    }
    if (ustensils.some(item => typeof item !== 'string')) {
        console.error(`Recipe ustensils: ${ustensils} contains non string elements!`);
        return false;
    }
    return true;
}
