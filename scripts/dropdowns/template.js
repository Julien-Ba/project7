/**
 * List of template function for the module
 * always return Element
 */

export function getDropdownDOM(normalizedName, name) {
    const wrapper = document.createElement('div');
    wrapper.className = `filters-${normalizedName}-wrapper`;

    const container = document.createElement('div');
    container.className = `filters-${normalizedName}`;
    wrapper.appendChild(container);

    const title = document.createElement('h3');
    title.textContent = name;
    title.className = 'filters-title';
    container.appendChild(title);

    const contentContainer = getContentContainerDOM(normalizedName);
    container.appendChild(contentContainer);

    return wrapper;
}

function getContentContainerDOM(normalizedName) {
    const contentContainer = document.createElement('div');
    contentContainer.className = 'filters-content';

    const searchbox = getSearchboxDOM(normalizedName);
    contentContainer.appendChild(searchbox);

    const filterTags = document.createElement('ul');
    filterTags.className = `${normalizedName}-tags`;
    contentContainer.appendChild(filterTags);

    const filterList = document.createElement('ul');
    filterList.className = `filters-${normalizedName}-list`;
    contentContainer.appendChild(filterList);

    return contentContainer;
}

function getSearchboxDOM(normalizedName) {
    const searchbox = document.createElement('form');
    searchbox.action = '#';
    searchbox.method = 'get';
    searchbox.className = 'search-box search-filter';
    searchbox.id = `search-filter-${normalizedName}`;

    const searchboxInput = document.createElement('input');
    searchboxInput.type = 'search';
    searchboxInput.name = 'search-filter';
    searchboxInput.className = 'search-input';
    searchboxInput.id = `search-${normalizedName}`;
    searchboxInput.required = true;
    searchbox.appendChild(searchboxInput);

    const searchboxReset = document.createElement('button');
    searchboxReset.type = 'reset';
    searchboxReset.className = 'search-reset';
    searchbox.appendChild(searchboxReset);

    const searchboxSubmit = document.createElement('button');
    searchboxSubmit.type = 'submit';
    searchboxSubmit.className = 'search-submit';
    searchbox.appendChild(searchboxSubmit);

    return searchbox;
}

export function getFilterDOM(name) {
    const element = document.createElement('li');
    element.textContent = name;
    element.tabIndex = 0;
    return element;
}

export function getDropdownTagDOM(tag) {
    const tagDOM = document.createElement('li');
    tagDOM.textContent = tag;
    tagDOM.tabIndex = 0;
    tagDOM.classList.add('dropdown-tag');
    return tagDOM;
}

export function getMainTagDOM(tag) {
    const tagDOM = document.createElement('li');
    tagDOM.classList.add('dropdown-tag');

    const tagTitle = document.createElement('p');
    tagTitle.textContent = tag;
    tagTitle.classList.add('tag-title');
    tagDOM.appendChild(tagTitle);

    const closeIcon = document.createElement('span');
    closeIcon.tabIndex = 0;
    closeIcon.classList.add('close-tag');
    tagDOM.appendChild(closeIcon);

    return tagDOM;
}
