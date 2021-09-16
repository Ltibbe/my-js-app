let pokemonRepository = (function () {
    let pokemonList = [
        {
            name: "Bulbasaur",
            height: 7,
            types: ["grass", "poison"],
            abilities: ["chlorophyll", "overgrow"]
        },
        {
            name: "Ninetales",
            height: 1.1,
            types: ["fire"],
            abilities: ["flash fire", "draught"]
        },
        {
            name: "Ivysaur",
            height: 1,
            types: ["grass", "poison"],
            abilities: ["chlorophyll", "overgrow"]
        },
        {
            name: "Charmander",
            height: 0.6,
            types: ["fire"],
            abilities: ["blaze", "solar-power"]
        },
        {
            name: "Charmeleon",
            height: 1.1,
            types: ["fire"],
            abilities: ["blaze", "solar-power"]
        },
        {
            name: "Wartortle",
            height: 1,
            types: ["water"],
            abilities: ["rain-dish", "torrent"]
        },
        {
            name: "Squirtle",
            height: 0.5,
            types: ["water"],
            abilities: ["rain-dish", "torrent"]
        },
        {
            name: "Charizard",
            height: 1.7,
            types: ["fire", "flying"],
            abilities: ["blaze", "solar-power"]
        },
        {
            name: "Blastoise",
            height: 1.6,
            types: ["water"],
            abilities: ["rain-dish", "torrent"]
        }
    ];

    function addListItem(pokemon) {
        let list = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');

        button.innerText = pokemon.name;
        button.classList.add('button-class');

        listItem.appendChild(button);
        list.appendChild(listItem);

        button.addEventListener('click', function (event) {
            console.log(showDetails(pokemon));
        });
    };

    function showDetails(pokemon) {
        console.log("My pokemon is called " + pokemon.name);
    }

    pokemonList.forEach(
        pokemon => addListItem(pokemon)
    )

    return {
        add: function (pokemon) {
            pokemonList.push(pokemon);
        },
        getAll: function () {
            return pokemonList;
        },
    };
})();
