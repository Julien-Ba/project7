// List of French words that should not be capitalized (except at the beginning of a sentence)
const frenchUncapitalizedWords = [
    'le', 'la', 'les', 'l\'',
    'un', 'une', 'des',
    'de', 'du', 'd\'',
    'à', 'au', 'aux',
    'en', 'dans', 'par', 'pour', 'sur', 'sous', 'vers', 'chez',
    'et', 'ou', 'mais', 'ni', 'car', 'donc', 'or',
    'ce', 'cet', 'cette', 'ces',
    'mon', 'ma', 'mes',
    'ton', 'ta', 'tes',
    'son', 'sa', 'ses',
    'notre', 'nos',
    'votre', 'vos',
    'leur', 'leurs',
    'je', 'tu', 'il', 'elle', 'on', 'nous', 'vous', 'ils', 'elles',
    'me', 'te', 'se', 'lui',
    'qui', 'que', 'dont', 'où',
    'y', 'avec', 'sans', 'entre', 'avant', 'après', 'pendant', 'depuis',
    'si', 'quand', 'comme', 'plus', 'moins', 'très', 'trop', 'peu', 'beaucoup'
];



/**
 * Trim and lowercases a string
 * @param {string} str - The input string
 * @return {string} The cleaned string
 */

export function cleanString(str = '') {
    return str.trim().toLowerCase();
}



/**
 * Capitalizes a string according to French title case rules
 * @param {string} str - The input string
 * @return {string} The capitalized string
 */

export function capitalizeTitleCase(str) {
    const words = str.toLowerCase().split(/\s+/);
    return words.map((word, index) => {
        if (index === 0 || !frenchUncapitalizedWords.includes(word)) {
            return capitalizeWord(word);
        }
        return word;
    }).join(' ');
}



/**
 * Capitalizes a single word, handling apostrophes
 * @param {string} word - The input word
 * @return {string} The capitalized word
 */

function capitalizeWord(word) {
    if (word.includes('\'')) {
        const [prefix, main] = word.split('\'');
        if (['l', 'd'].includes(prefix.toLowerCase())) {
            return `${prefix.toLowerCase()}'${capitalize(main)}`;
        }
    }
    return capitalize(word);
}



/**
 * Capitalizes the first letter of a string
 * @param {string} str - The input string
 * @return {string} The string with its first letter capitalized
 */

export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
