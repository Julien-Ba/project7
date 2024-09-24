import { allDropdowns, filteredDropdowns } from "../main.js";
import { editDropdowns } from "../utils/dom_mutation.js";
import { cleanString } from "../utils/string.js";

export function searchInDropdowns(event, category) {
    const searchTerm = event.target.value;
    for (const key of Object.getOwnPropertyNames(filteredDropdowns)) {
        delete filteredDropdowns[key];
    }
    for (const key of Object.getOwnPropertyNames(allDropdowns)) {
        filteredDropdowns[key] = allDropdowns[key];
    }
    const matchingDropdowns = (searchTerm && searchTerm.length > 2) ? filterDropdowns(searchTerm, category) : Array.from(allDropdowns[category]);
    return editDropdowns(category, matchingDropdowns);
}

function filterDropdowns(searchTerm, category) {
    return Array.from(filteredDropdowns[category]).filter(dropdown => cleanString(dropdown).includes(searchTerm));
}
