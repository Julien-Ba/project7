export function cleanString(str) {
    return str.trim().toLowerCase();
}

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

export function capitalizeTitleCase(str) {
    return str.split(' ').map((word, i) => {
        return frenchUncapitalizedWords.includes(word) && i !== 0 ? word : capitalize(word);
    }).join(' ');
}

export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
