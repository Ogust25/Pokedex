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

        // ID
        pokeId.firstChild.nodeValue = "#" + data.id;

        // Img
        pokeImg.src = data.sprites.front_default;

        // Nom
        pokeName.firstChild.nodeValue = upperFirstChar(data.name);

        // Types
        pokeType1.firstChild.nodeValue = upperFirstChar(data.types[0].type.name);
        colorType(data.types[0].type.name, pokeType1Color);
        if (data.types[1] === undefined) {
            pokeType2.firstChild.nodeValue = "---";
            pokeType2Color.style.backgroundColor = 'transparent';
        } else {
            pokeType2.firstChild.nodeValue = upperFirstChar(data.types[1].type.name);
            colorType(data.types[1].type.name, pokeType2Color);
        }

        // Height
        pokeHeight.firstChild.nodeValue = "Taille : " + data.height/10 + " m";

        // Weight
        pokeWeight.firstChild.nodeValue = "Poids : " + data.weight/10 + " kg";

        // Abilities
        removeAllChildNodes(pokeAbilitiesContainer);
        for (let i = 0; i < data.abilities.length; i++) {
            let abilityContainer = newElem("div", {class: 'mt-5'});
            let abilityName = newElem("p", {class: 'font-bold mb-2'}, upperFirstChar(data.abilities[i].ability.name));
            abilityContainer.insertBefore(abilityName, null);
            pokeAbilitiesContainer.insertBefore(abilityContainer, null);

            fetch(data.abilities[i].ability.url).then((response) =>
            response.json().then((data) => {
                let desc = data.effect_entries[1].short_effect.replace("$effect_chance", data.effect_chance);
                let abilityDesc = newElem("p", {class: 'ml-3'}, upperFirstChar(desc));
                abilityContainer.insertBefore(abilityDesc, null);
            }))
        }

        // Moves
        removeAllChildNodes(pokeMovesContainer);
        for (let i = 0; i < 3; i++) {
            let moveContainer = newElem("div", {class: 'mt-5'});
            let moveContainerNP = newElem("div", {class: 'flex justify-between mb-2'});
            let moveName = newElem("p", {class: 'font-bold'}, upperFirstChar(data.moves[i].move.name));
            moveContainer.insertBefore(moveContainerNP, null);
            moveContainerNP.insertBefore(moveName, null);
            pokeMovesContainer.insertBefore(moveContainer, null);

            fetch(data.moves[i].move.url).then((response) =>
            response.json().then((data) => {
                let movePower = newElem("p", {class: ''}, data.power);
                let desc = data.effect_entries[0].short_effect.replace("$effect_chance", data.effect_chance);
                let moveDesc = newElem("p", {class: 'ml-3'}, upperFirstChar(desc));
                moveContainerNP.insertBefore(movePower, null);
                moveContainer.insertBefore(moveDesc, null);
            }))
        }
    
    })
)}

// Fonction pour ajouter la 1ere lettre en Majuscule
function upperFirstChar(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Fonction pour créer des elements
function newElem(el, attribut, content = "") {
    const newElem = document.createElement(el);
    const newContent = document.createTextNode(content);
    newElem.appendChild(newContent);
    for (let key in attribut) {
      newElem.setAttribute(key, attribut[key]);
    }
    return newElem;
}

// Fonction pour supprimer tous les enfants d'un parent
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// Fonction pour ajouter la bonne couleur au type de pokemon
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