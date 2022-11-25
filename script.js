const btnSearch = document.querySelector('#btnSearch');
const inputSearch = document.querySelector('#inputSearch');

btnSearch.addEventListener('click', () => {
    let search = inputSearch.value;
    let url = `https://pokeapi.co/api/v2/pokemon/${search}`;

    fetch(url).then((response) =>
    response.json().then((data) => {
        console.log(data);
    
    })
)
})