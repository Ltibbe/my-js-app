//!* Writes the name of the pokemon, and highlights special pokemon sizes *//

let PokemonList = [
    {
        name: "Bulbasaur",
        height: 7,
        types: ["grass", "poison"],
        abilities: ["chlorophyll", "overgrow"]
        },
    {
        name: "Ninetales",
        height: 1.1,
        types: "fire",
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
        types: "fire",
        abilities: ["blaze", "solar-power"]
        },
    {
        name: "Charmeleon",
        height: 1.1,
        types: "fire",
        abilities: ["blaze", "solar-power"]
        },
    {
        name: "Wartortle",
        height: 1,
        types: "water",
        abilities: ["rain-dish", "torrent"]
        },
    {
        name: "Squirtle",
        height: 0.5,
        types: "water",
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
        types: "water",
        abilities: ["rain-dish", "torrent"]
        }
    ];

function myLoopFunction(Pokemon) {
    console.log(Pokemon.name + ' is ' + Pokemon.age + ' years old.');
}
PokemonList.forEach(myLoopFunction);
