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
            name: "charmander",
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

    return {
        add: function (pokemon) {
            pokemonList.push(pokemon);
        },
        getAll: function () {
            return pokemonList;
        }
    };
})();


pokemonRepository.add({
    name: 'Pikachu',
    height: 1.7
});
console.log(pokemonRepository.getAll()); // [ { name: 'Pikachu' } ]

pokemonRepository.getAll().forEach(function (pokemon) {
    console.log(pokemon.name + ' is ' + pokemon.height + ' tall.');
});
