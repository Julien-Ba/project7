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
        ingredientsDOM.push(li);
    });
    return ingredientsDOM;
}

function getApplianceDOM(appliance) {
    const li = document.createElement('li');
    li.textContent = appliance;
    return [li];
}

function getUtensilsDOM(utensils) {
    const utensilsDOM = [];
    utensils.forEach(utensil => {
        const li = document.createElement('li');
        li.textContent = utensil;
        utensilsDOM.push(li);
    });
    return utensilsDOM;
}
