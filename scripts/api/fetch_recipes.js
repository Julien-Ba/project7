export async function getRecipes() {
    const src = 'data/recipes.json';
    try {
        const response = await fetch(src);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.debug(json);
        return validateRecipes(json);
    } catch (error) {
        console.error(error.message);
        return [];
    }
}

function validateRecipes(json) {
    if (!Array.isArray(json.recipes)) {
        console.error('Invalid recipes data: expected an array');
        return [];
    }

    return json.recipes.filter(isValidRecipe);
}

const defaultKeys = ['id', 'image', 'name', 'servings', 'ingredients', 'time', 'description', 'appliance', 'ustensils'];

function isValidRecipe(recipe) {
    return defaultKeys.every(async key => {
        if (!Object.hasOwn(recipe, key) || recipe[key] == null || recipe[key] === '') {
            console.error(`Recipe is missing required key, or has null/empty value: ${key}`);
            return false;
        }
        return await isValidProperty(key, recipe[key]);
    });
}

async function isValidProperty(key, value) {
    const validators = {
        id: isValidID,
        image: isValidImage,
        name: isValidName,
        serving: isValidServing,
        ingredients: isValidIngredients,
        time: isValidTime,
        description: isValidDescription,
        appliance: isValidAppliance,
        ustensils: isValidUstensils
    };

    return validators[key] ? await validators[key](value) : false;
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

function isValidServing(serving) {
    if (!Number.isInteger(Number(serving))) {
        console.error(`Recipe serving: ${serving} is not a valid integer`);
        return false;
    }
    return true;
}

function isValidIngredients(ingredients) {
    if (!Array.isArray(ingredients)) {
        console.error(`Recipe ingredients: ${ingredients} needs to be an array!`);
        return false;
    }
    if (ingredients.some(ingredient => typeof ingredient !== 'object' || !(ingredient instanceof Object))) {
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
