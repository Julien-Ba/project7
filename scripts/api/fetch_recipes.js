/**
 * Fetches recipes from a JSON file.
 * @returns {Promise<Object>} The parsed JSON data containing recipes.
 * @throws {Error} If the fetch fails or the response is not ok.
 */

export async function getRecipes() {
    const src = 'data/recipes.json';
    try {
        const response = await fetch(src);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.debug(json);
        return json;
    } catch (error) {
        console.error(error.message);
        return [];
    }
}
