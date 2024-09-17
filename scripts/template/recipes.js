export class Recipe {

    constructor(data) {
        //this.id = data.id;
        this.image = data.image;
        this.name = data.name;
        //this.serving = data.serving;
        this.ingredients = data.ingredients;
        this.time = data.time;
        this.description = data.description;
        //this.appliance = data.appliance;
        //this.ustensils = data.ustensils;
    }

    getRecipeDOM() {
        const container = document.createElement('article');
        container.classList.add('card');

        container.appendChild(this.getRecipeImageDOM());
        container.appendChild(this.getRecipeTimeDOM());

        const subContainer = document.createElement('div');
        subContainer.classList.add('card-content');
        container.appendChild(subContainer);

        subContainer.appendChild(this.getRecipeNameDOM());
        subContainer.appendChild(this.getRecipeDescriptionDOM());
        subContainer.appendChild(this.getRecipeIngredientsDOM());

        return container;
    }

    getRecipeImageDOM() {
        const img = document.createElement('img');
        img.src = `assets/images/${this.image}`;
        img.alt = `Image of ${this.name}`;
        img.loading = 'lazy';
        img.classList.add('card-img');
        return img;
    }

    getRecipeTimeDOM() {
        const span = document.createElement('span');
        span.textContent = `${this.time}min`;
        span.classList.add('card-time');
        return span;
    }

    getRecipeNameDOM() {
        const h2 = document.createElement('h2');
        h2.textContent = this.name;
        h2.classList.add('card-title');
        return h2;
    }

    getRecipeDescriptionDOM() {
        const div = document.createElement('div');
        div.classList.add('card-recipe');

        const h3 = document.createElement('h3');
        h3.textContent = 'RECETTE';
        h3.classList.add('card-recipe-title');

        const p = document.createElement('p');
        p.textContent = this.description;
        p.classList.add('card-recipe-description');

        div.appendChild(h3);
        div.appendChild(p);
        return div;
    }

    getRecipeIngredientsDOM() {
        const container = document.createElement('div');
        container.classList.add('card-ingredients');

        const h3 = document.createElement('h3');
        h3.textContent = 'Ingrédients';
        h3.classList.add('card-ingredients-title');
        container.appendChild(h3);

        const subContainer = document.createElement('div');
        subContainer.classList.add('card-ingredients-container');

        let ingredients = [];
        this.ingredients.forEach(ingredient => {
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
            ingredients.push(div);
        });
        ingredients.forEach(ingredient => container.appendChild(ingredient));
        return container;
    }

}