export function getDropdownTagDOM(tag) {
    const tagDOM = getTagDOM(tag);
    tagDOM.classList.add('dropdown-tag');
    return tagDOM;
}

export function getMainTagDOM(tag) {
    const tagDOM = getTagDOM(tag);
    tagDOM.classList.add('main-tag');
    return tagDOM;
}

function getTagDOM(tag) {
    const tagDOM = document.createElement('li');
    tagDOM.textContent = tag;
    tagDOM.tabIndex = 0;
    return tagDOM;
}
