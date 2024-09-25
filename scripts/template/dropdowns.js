export function getDropdownsDOM(data) {
    const ingredients = data.ingredients;
    const appliance = data.appliance;
    const ustensils = data.ustensils;

    const ingredientsDOM = getIngredientsDOM(ingredients);
    const applianceDOM = getApplianceDOM(appliance);
    const ustensilsDOM = getUtensilsDOM(ustensils);

    return {
        ingredients: ingredientsDOM,
        appliances: applianceDOM,
        utensils: ustensilsDOM
    };
}

function getIngredientsDOM(ingredients) {
    const ingredientsDOM = [];
    ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient.ingredient;
        li.tabIndex = 0;
        ingredientsDOM.push(li);
    });
    return ingredientsDOM;
}

function getApplianceDOM(appliance) {
    const li = document.createElement('li');
    li.textContent = appliance;
    li.tabIndex = 0;
    return [li];
}

function getUtensilsDOM(utensils) {
    const utensilsDOM = [];
    utensils.forEach(utensil => {
        const li = document.createElement('li');
        li.textContent = utensil;
        li.tabIndex = 0;
        utensilsDOM.push(li);
    });
    return utensilsDOM;
}

export function getDropdownDOM(tags) {
    const elements = [];
    tags.forEach(tag => {
        const li = document.createElement('li');
        li.textContent = tag;
        li.tabIndex = 0;
        elements.push(li);
    });
    return elements;
}
