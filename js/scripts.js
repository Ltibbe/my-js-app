var PokemonList = [
    {
        name: "Bulbasaur",
        height: "7",
        types: ["grass", "poison"],
        abilities: ["chlorophyll", "overgrow"]
        },
    {
        name: "Ninetales",
        height: "1.1",
        types: "fire",
        abilities: ["flash fire", "draught"]
        },
    {
        name: "Ivysaur",
        height: "1",
        types: ["grass", "poison"],
        abilities: ["chlorophyll", "overgrow"]
        },
    {
        name: "charmander",
        height: "0.6",
        types: "fire",
        abilities: ["blaze", "solar-power"]
        },
    {
        name: "Charmeleon",
        height: "1.1",
        types: "fire",
        abilities: ["blaze", "solar-power"]
        },
    {
        name: "Wartortle",
        height: "1",
        types: "water",
        abilities: ["rain-dish", "torrent"]
        },
    {
        name: "Squirtle",
        height: "0.5",
        types: "water",
        abilities: ["rain-dish", "torrent"]
        },
    {
        name: "Charizard",
        height: "1.7",
        types: ["fire", "flying"],
        abilities: ["blaze", "solar-power"]
        },
    {
        name: "Blastoise",
        height: "1.6",
        types: "water",
        abilities: ["rain-dish", "torrent"]
        }
    ];

//!* Writes the name of the pokemon, and highlights special pokemon sizes *//

let PokemonList = "";
for (let i = 0; i < 8; PokemonList.length; i++) {
    if (PokemonList[i].height > 6) {
        document.write("<p>" + PokemonList[i].name + "("
            PokemonList[i].height ")"
            " - Wow, that’s big!"
            "</p>");
    } else if (PokemonList[i].height > 1.5 && < 4) {
        document.write("<p>" + PokemonList[i].name + "("
            PokemonList[i].height ")"
            "is medium size"
            "</p>");
    } else {
        document.write("<p>" + PokemonList[i].name + "("
            PokemonList[i].height ")"
            "is the shortest"
            "</p>");
    }
}
