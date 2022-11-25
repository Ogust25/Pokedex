const btnSearch = document.querySelector('#btnSearch');
const inputSearch = document.querySelector('#inputSearch');

const pokeId = document.querySelector('#pokeId');
const pokeImg = document.querySelector('#pokeImg');
const pokeName = document.querySelector('#pokeName');
const pokeType1 = document.querySelector('#pokeType1');
const pokeType2 = document.querySelector('#pokeType2');
const pokeHeight = document.querySelector('#pokeHeight');
const pokeWeight = document.querySelector('#pokeWeight');


btnSearch.addEventListener('click', () => {
    let search = inputSearch.value;
    let url = `https://pokeapi.co/api/v2/pokemon/${search}`;

    fetch(url).then((response) =>
    response.json().then((data) => {
        // console.log(data);

        pokeId.firstChild.nodeValue = "#" + data.id;
        pokeImg.src = data.sprites.front_default;

        pokeName.firstChild.nodeValue = upperFirstChar(data.name);
        pokeType1.firstChild.nodeValue = upperFirstChar(data.types[0].type.name);

        if (data.types[1] === undefined) {
            pokeType2.firstChild.nodeValue = "---";
        } else {
            pokeType2.firstChild.nodeValue = upperFirstChar(data.types[1].type.name);
        }

        pokeHeight.firstChild.nodeValue = "Taille : " + data.height/10 + " m";
        pokeWeight.firstChild.nodeValue = "Poids : " + data.weight/10 + " kg";
    
    })
)
})

function upperFirstChar(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}