const searchbox = document.querySelector('#search');
searchbox.addEventListener('keyup', search);

function search(event) {
    if (event.target.value.length > 2) {
        console.log(`search edited: ${event.target.value}`);
    }
}
