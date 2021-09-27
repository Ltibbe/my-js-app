let PokemonRepository = (function () {
	let repository = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

	/**  Function to validate information of pokemons to be added.
	 * It must be an object and it must have three fields,
	 * will show message at console.
	 */
	const itemCheck = (item) => {
		const itemArray = item['name'] !== undefined;

		return itemArray;
	};
	/** Check if pokemon has the correct data to be part of the list.
	 * If it doesn't, then error message.
	 */
	function add(pokemon) {
		if (itemCheck(pokemon)) {
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
		let newList = document.querySelector('.pokemon-list');

		/** create il element */
		let listPokemon = document.createElement('li');
		/** Add class to style it with Bootstrap  */
		listPokemon.classList.add('group-list-item');

		/** create button with pokemon's names for each element */
		const button = document.createElement('button');
		button.innerText = pokemon.name;

		/** add class to button to style it with Bootstrap*/
		button.classList.add('buttonStyle', 'group-list-item', 'btn-light');
		button.setAttribute('data-toggle', 'modal');
		button.setAttribute('data-target', '#modal-container');

		/**  call function with details on pokemon on click:*/
		addButtonEvent(button, pokemon);

		/** append button to the list item*/
		listPokemon.appendChild(button);

		/** append list item to the unordered list */
		newList.appendChild(listPokemon);
	}

	const addButtonEvent = (button, pokemon) =>
		button.addEventListener('click', function () {
			showDetails(pokemon);
		});
	/** Fetch details of pokemon from API */
	function loadList() {
		return fetch(apiUrl)
			.then(function (response) {
				return response.json();
			})
			.then(function (json) {
				json.results.forEach(function (item) {
					let pokemon = {
						name: item.name,
						detailsUrl: item.url,
						height: item.height,
						types: item.types,
					};
					add(pokemon);
					console.log(pokemon);
				});
			})
			.catch(function (e) {
				console.error(e);
			});
	}
	/** Load details of pokemons from API to Modal*/
	function loadDetails(pokemon) {
		let url = pokemon.detailsUrl;
		return fetch(url)
			.then(function (response) {
				return response.json();
			})
			.then(function (details) {
				pokemon.imageUrlFront = details.sprites.front_default;
				pokemon.imageUrlBack = details.sprites.back_default;
				pokemon.height = details.height;
				pokemon.types = details.types;
				return pokemon;
			})
			.catch(function (e) {
				console.error(e);
			});
	}
	/** Show details of pokemon on console and on Modal*/
	function showDetails(pokemon) {
		loadDetails(pokemon).then(function (response) {
			console.log(response);
			showModal(response);
		});
	}

	/** Show modal with pokemon's details*/
	function showModal(pokemon) {
		let modalBody = $('.modal-body');
		let modalTitle = $('.modal-title');
		let modalHeader = $('.modal-header');
		/** Empty modal */
		modalHeader.empty();
		modalTitle.empty();
		modalBody.empty();
		/**Create title for Modal */
		let nameElement = $('<h1>' + pokemon.name + '</h1>');
		/**Create content for Modal */
		let imageElementFront = $('<img class="modal-img" style="width:50%">');
		imageElementFront.attr('src', pokemon.imageUrlFront);
		imageElementFront.attr(
			'sr-only',
			'Front image of ' + pokemon.name + '</p>'
		);

		let imageElementBack = $('<img class="modal-img" style="width:50%">');
		imageElementBack.attr('src', pokemon.imageUrlBack);
		imageElementBack.attr('sr-only', 'Back image of ' + pokemon.name + '</p>');

		let heightElement = $('<p>' + 'Height : ' + pokemon.height + '</p>');

		let types = ' ';
		pokemon.types.map(({ type }) => (types = types + ' ' + type.name));
		let contentElementTypes = $('<p>' + 'Types : ' + types + '</p>');
		contentElementTypes.attr('src', pokemon.types);

		/**Append title and content to Modal */
		modalHeader.append(nameElement);
		modalBody.append(imageElementFront);
		modalBody.append(imageElementBack);
		modalBody.append(heightElement);
		modalBody.append(contentElementTypes);
	}

	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
		loadList: loadList,
		loadDetails: loadDetails,
		showModal: showModal,
	};
})();

console.log(PokemonRepository.getAll()); // see repository with the alteration

PokemonRepository.loadList().then(function () {
	PokemonRepository.getAll().forEach(function (pokemon) {
		PokemonRepository.addListItem(pokemon);
	});
});
