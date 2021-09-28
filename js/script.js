let PokemonRepository = (function () {
  let modalContainer = document.querySelector('#modal-container');
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
    modalContainer.innerHTML = '';

  let modal = document.createElement('div');
  modal.classList.add('modal');

  // Add the new modal content
  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.addEventListener('click', hideModal);

  titleElement.innerText = title;

  let contentElement = document.createElement('p');
  contentElement.innerText = text;

  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  modalContainer.appendChild(modal);

  modalContainer.classList.add('is-visible');
  }

  function hideModal() {
  modalContainer.classList.remove('is-visible');
  }

  function showDialog(title, text) {
  showModal(title, text);

  // We have defined modalContainer here
  let modalContainer = document.querySelector('#modal-container');

  // We want to add a confirm and cancel button to the modal
  let modal = modalContainer.querySelector('.modal');

  let confirmButton = document.createElement('button');
  confirmButton.classList.add('modal-confirm');
  confirmButton.innerText = 'Confirm';

  let cancelButton = document.createElement('button');
  cancelButton.classList.add('modal-cancel');
  cancelButton.innerText = 'Cancel';

  modal.appendChild(confirmButton);
  modal.appendChild(cancelButton);

  // Return a promise that resolves when confirmed, else rejects
  return new Promise((resolve, reject) => {
    cancelButton.addEventListener('click', () => {
      hideModal();
      reject();
    });
    confirmButton.addEventListener('click', () => {
      hideModal();
      resolve();
    })
  });
}
}

  document.querySelector('#show-modal').addEventListener('click', () => {
  showModal('Modal title', 'This is the modal content!');

  document.querySelector('#show-dialog').addEventListener('click', () => {
  showDialog('Confirm action', 'Are you sure you want to do this?');
  });

  window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();
  }
});

modalContainer.addEventListener('click', (e) => {
// Since this is also triggered when clicking INSIDE the modal container,
// We only want to close if the user clicks directly on the overlay
let target = e.target;
if (target === modalContainer) {
  hideModal();
}
});

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
