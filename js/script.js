let PokemonRepository = (function() {
  let repository = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon) {
      repository.push(pokemon);
    } else {
      throw 'item must be an object, it was not included on the list';
    }
  }

  function getAll() {
    return repository;
  }

  function addListItem(pokemon) {
    /** create new variable for ul added at 'index.html' file */
    let newList = document.querySelector('.pokemon-list-group');

    /** create 'li' element */
    let listPokemon = document.createElement('li');
    /** Add class to style it with Bootstrap  */
    listPokemon.classList.add('list-group-item', 'flex-fill');

    /** create button with pokemon's names for each element */
    let button = document.createElement('button');
    button.innerText = pokemon.name;

    /** add class to button to style it with Bootstrap*/
    button.classList.add('btn', 'btn-primary');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokemonModal');

    /**  call function with details on pokemon on click:*/
    addButtonEvent(button, pokemon);

    /** append button to the list item*/
    listPokemon.appendChild(button);

    /** append list item to the unordered list */
    newList.appendChild(listPokemon);
  }

  let addButtonEvent = (button, pokemon) =>
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });

  /** Fetch details of pokemon from API */
  function loadList() {
    // showLoadingMessage();
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
            height: item.height,
            types: item.types
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  /** Load details of pokemons from API to Modal*/
  function loadDetails(item) {
    // showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        // hideLoadingMessage();
        return response.json();
      })
      .then(function(details) {
        item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.height = details.height;
        item.types = details.types;
        item.weight = details.weight;
        item.abilities = details.abilities;
      })
      .catch(function(e) {
        // hideLoadingMessage();
        console.error(e);
      });
  }

  /** Show details of pokemon on console and on Modal*/
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }

  /** Show modal with pokemon's details Qjuery*/
  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    let modalHeader = $('.modal-header');
    // let $modalContainer = $("#modal-container");
    //clear existing content of the modal
    // modalHeader.empty();
    modalTitle.empty();
    modalBody.empty();

    //creating element for name in modal content
    let nameElement = $('<h1>' + pokemon.name + '</h1>');
    // // creating img in modal content
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr('src', pokemon.imageUrlFront);
    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr('src', pokemon.imageUrlBack);
    // // creating element for height in modal content
    let heightElement = $('<p>' + 'height : ' + pokemon.height + '</p>');
    // // creating element for weight in modal content
    let weightElement = $('<p>' + 'weight : ' + pokemon.weight + '</p>');
    // // creating element for type in modal content
    let typesElement = $('<p>' + 'types : ' + pokemon.types + '</p>');
    let abilitiesElement = $(
      '<p>' + 'abilities : ' + pokemon.abilities + '</p>'
    );

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal
  };
})();

console.log(PokemonRepository.getAll()); // see repository with the alteration

PokemonRepository.loadList().then(function() {
  PokemonRepository.getAll().forEach(function(pokemon) {
    PokemonRepository.addListItem(pokemon);
  });
});
