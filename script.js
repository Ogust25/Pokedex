const btnSearch = document.querySelector('#btnSearch');
const inputSearch = document.querySelector('#inputSearch');

const pokeId = document.querySelector('#pokeId');
const pokeImg = document.querySelector('#pokeImg');
const pokeName = document.querySelector('#pokeName');
const pokeType1 = document.querySelector('#pokeType1');
const pokeType2 = document.querySelector('#pokeType2');
const pokeHeight = document.querySelector('#pokeHeight');
const pokeWeight = document.querySelector('#pokeWeight');
const pokeAbilitiesContainer = document.querySelector('#pokeAbilitiesContainer');
const pokeMovesContainer = document.querySelector('#pokeMovesContainer');

// Event click
btnSearch.addEventListener('click', () => {
    apiCall(inputSearch.value);
    inputSearch.value = "";
})

// Event enter key
inputSearch.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      btnSearch.click();
    }
});

// ApiCall
function apiCall(search) {
    let url = `https://pokeapi.co/api/v2/pokemon/${search}`;

    fetch(url).then((response) =>
    response.json().then((data) => {
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

        removeAllChildNodes(pokeAbilitiesContainer);
        for (let i = 0; i < data.abilities.length; i++) {
            let ability = newElem("p", {class: ''}, upperFirstChar(data.abilities[i].ability.name));
            pokeAbilitiesContainer.insertBefore(ability, null);
        }

        removeAllChildNodes(pokeMovesContainer);
        for (let i = 0; i < data.moves.length; i++) {
            let ability = newElem("p", {class: ''}, upperFirstChar(data.moves[i].move.name));
            pokeMovesContainer.insertBefore(ability, null);
        }
    
    })
)}

/* Fonction pour ajouter la 1ere lettre en Majuscule */
function upperFirstChar(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/* Fonction pour créer des elements */
function newElem(el, attribut, content = "") {
    const newElem = document.createElement(el);
    const newContent = document.createTextNode(content);
    newElem.appendChild(newContent);
    for (let key in attribut) {
      newElem.setAttribute(key, attribut[key]);
    }
    return newElem;
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}