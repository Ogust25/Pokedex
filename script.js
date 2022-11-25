const btnSearch = document.querySelector('#btnSearch');
const inputSearch = document.querySelector('#inputSearch');

const pokeId = document.querySelector('#pokeId');
const pokeImg = document.querySelector('#pokeImg');
const pokeName = document.querySelector('#pokeName');
const pokeType1 = document.querySelector('#pokeType1');
const pokeType2 = document.querySelector('#pokeType2');
const pokeType1Color = document.querySelector('#pokeType1Color');
const pokeType2Color = document.querySelector('#pokeType2Color');
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
        colorType(data.types[0].type.name, pokeType1Color);
        if (data.types[1] === undefined) {
            pokeType2.firstChild.nodeValue = "---";
            pokeType2Color.style.backgroundColor = 'transparent';
        } else {
            pokeType2.firstChild.nodeValue = upperFirstChar(data.types[1].type.name);
            colorType(data.types[1].type.name, pokeType2Color);
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

function colorType(type, elem) {
    switch (type) {
        case "normal":
            elem.style.backgroundColor = "#A8A77A";
            break;
        case "fire":
            elem.style.backgroundColor = '#EE8130';
            break;
        case "water":
            elem.style.backgroundColor = '#6390F0';
            break;
        case "electric":
            elem.style.backgroundColor = '#F7D02C';
            break;
        case "grass":
            elem.style.backgroundColor = '#7AC74C';
            break;
        case "ice":
            elem.style.backgroundColor = '#96D9D6';
            break;
        case "fighting":
            elem.style.backgroundColor = '#C22E28';
            break;
        case "poison":
            elem.style.backgroundColor = '#A33EA1';
            break;
        case "ground":
            elem.style.backgroundColor = '#E2BF65';
            break;
        case "flying":
            elem.style.backgroundColor = '#A98FF3';
            break;
        case "psychic":
            elem.style.backgroundColor = '#F95587';
            break;
        case "bug":
            elem.style.backgroundColor = '#A6B91A';
            break;
        case "rock":
            elem.style.backgroundColor = '#B6A136';
            break;
        case "ghost":
            elem.style.backgroundColor = '#735797';
            break;
        case "dragon":
            elem.style.backgroundColor = '#6F35FC';
            break;
        case "dark":
            elem.style.backgroundColor = '#705746';
            break;
        case "steel":
            elem.style.backgroundColor = '#B7B7CE';
            break;
        case "fairy":
            elem.style.backgroundColor = '#D685AD';
            break;
        default:
            break;
    }
}