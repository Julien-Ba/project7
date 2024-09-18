export function getRecipeDOM(data) {
    const description = data.description;
    const image = data.image;
    const ingredients = data.ingredients;
    const name = data.name;
    const time = data.time;

    const container = getRecipeContainer(name, image, time);
    const subContainer = getRecipeSubContainer(name, description, ingredients);
    container.appendChild(subContainer);
    return container;
}

function getRecipeContainer(name, image, time) {
    const container = document.createElement('article');
    container.classList.add('card');
    container.appendChild(getRecipeImageDOM(image, name));
    container.appendChild(getRecipeTimeDOM(time));
    return container;
}

function getRecipeSubContainer(name, description, ingredients) {
    const subContainer = document.createElement('div');
    subContainer.classList.add('card-content');
    subContainer.appendChild(getRecipeNameDOM(name));
    subContainer.appendChild(getRecipeDescriptionDOM(description));
    subContainer.appendChild(getRecipeIngredientsDOM(ingredients));
    return subContainer;
}

function getRecipeImageDOM(image, name) {
    const img = document.createElement('img');
    img.src = `assets/images/${image}`;
    img.alt = `Image of ${name}`;
    img.loading = 'lazy';
    img.classList.add('card-img');
    return img;
}

function getRecipeTimeDOM(time) {
    const span = document.createElement('span');
    span.textContent = `${time}min`;
    span.classList.add('card-time');
    return span;
}

function getRecipeNameDOM(name) {
    const h2 = document.createElement('h2');
    h2.textContent = name;
    h2.classList.add('card-title');
    return h2;
}

function getRecipeDescriptionDOM(description) {
    const div = document.createElement('div');
    div.classList.add('card-recipe');

    const h3 = document.createElement('h3');
    h3.textContent = 'RECETTE';
    h3.classList.add('card-recipe-title');

    const p = document.createElement('p');
    p.textContent = description;
    p.classList.add('card-recipe-description');

    div.appendChild(h3);
    div.appendChild(p);
    return div;
}

function getRecipeIngredientsDOM(ingredients) {
    const container = document.createElement('div');
    container.classList.add('card-ingredients');

    const h3 = document.createElement('h3');
    h3.textContent = 'Ingrédients';
    h3.classList.add('card-ingredients-title');
    container.appendChild(h3);

    const subContainer = document.createElement('div');
    subContainer.classList.add('card-ingredients-container');
    container.appendChild(subContainer);

    let ingredientsDOM = [];
    ingredients.forEach(ingredient => {
        const div = document.createElement('div');
        div.classList.add('card-ingredients');

        const h4 = document.createElement('h4');
        h4.textContent = ingredient.ingredient;
        h4.classList.add('card-ingredients-description');

        const p = document.createElement('p');
        p.textContent = ingredient.quantity;
        if (ingredient.unit)
            p.textContent += ingredient.unit;
        p.classList.add('card-ingredients-quantity');

        div.appendChild(h4);
        div.appendChild(p);
        ingredientsDOM.push(div);
    });
    ingredientsDOM.forEach(ingredient => subContainer.appendChild(ingredient));
    return container;
}
