
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');
  function showModal(title, text) {
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    let contentElement = document.createElement('p');
    contentElement.innerText = text;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  let dialogPromiseReject; // This can be set later, by showDialog

  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');

    if (dialogPromiseReject) {
      dialogPromiseReject();
      dialogPromiseReject = null;
    }
  }

  function showDialog(title, text) {
  showModal(title, text);

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

  // We want to focus the confirmButton so that the user can simply press Enter
  confirmButton.focus();
  // Return a promise that resolves when confirmed, else rejects
  return new Promise((resolve, reject) => {
  cancelButton.addEventListener('click', hideModal);
  confirmButton.addEventListener('click', () => {
    dialogPromiseReject = null; // Reset this
    hideModal();
    resolve();
  });

  // This can be used to reject from other functions
  dialogPromiseReject = reject;
});
}

  document.querySelector('#show-dialog').addEventListener('click', () => {
  showDialog('Confirm action', 'Are you sure you want to do this?').then(function() {
    alert('confirmed!');
  }, () => {
    alert('not confirmed');
  });
});

  window.addEventListener('keydown', (e) => {
  //Clear all existing modal content when 'escape' key is pressed
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });
  modalContainer.addEventListener('click', (e) => {
  // Since this is also triggered when clicking INSIDE the modal
  // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal('Modal title', 'This is the modal content!');
  });

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
      return pokemonList;
    }

//Here, .getAll().forEach brings back every pokemon + .name +.height
function addListItem(pokemon) {
    let list = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    // let button = document.createElement('button');

		/** create button with pokemon's names for each element */
		const button = document.createElement('button');
		button.innerText = pokemon.name;

    button.innerText = pokemon.name;
    button.classList.add('button-class');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#modal-container');

    /**  call function with details on pokemon on click:*/
		addButtonEvent(button, pokemon);

    listItem.appendChild(button);
    list.appendChild(listItem);

    button.addEventListener('click', function (event) {
        showDetails(pokemon);
    }

    const addButtonEvent = (button, pokemon) =>
		button.addEventListener('click', function () {
			showDetails(pokemon);
		});


function showDetails(pokemon) {
  loadDetails(pokemon).then(function() {
    console.log(pokemon);
  });
}

// pokemonList.forEach(
//   pokemon => addListItem(pokemon)
// )
//
//     return {
//         add: function (pokemon) {
//             pokemonList.push(pokemon);
//         },
//         getAll: function () {
//             return pokemonList;
//         },
//     };
// })();

function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
          height: item.height,
          types: item.types
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      pokemon.imageUrl = details.sprites.front_default
      pokemon.imageUrlBack = details.sprites.back_default;
      pokemon.height = details.height;
      pokemon.types = details.types;
      return pokemon;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function (response) {
     console.log(response);
     showModal(response);
  });
  }

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});

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
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem,
    showModal: showModal
  };
//
// // Form validation for email address and password//
// (function() {
//   let form = document.querySelector('#register-form');
//   let emailInput = document.querySelector('#email');
//   let passwordInput = document.querySelector('#password');
//
//   function showErrorMessage(input, message) {
//     let container = input.parentElement; // The .input-wrapper
//
//     // Remove an existing error
//     let error = container.querySelector('.error-message');
//     if (error) {
//       container.removeChild(error);
//     }
//
//     // Now add the error, if the message is not empty
//     if (message) {
//       let error = document.createElement('div');
//       error.classList.add('error-message');
//       error.innerText = message;
//       container.appendChild(error);
//     }
//   }
//   function validateEmail() {
//     let value = emailInput.value;
//
//     if (!value) {
//       showErrorMessage(emailInput, 'Email is required.');
//       return false;
//   }
//
//     if (value.indexOf('@') === -1) {
//       showErrorMessage(emailInput, 'You must enter a valid email address.');
//       return false;
//   }
//
//       showErrorMessage(emailInput, null);
//       return true;
//   }
//
//     let hasAtSign =value.indexOf('@') > -1;
//     let hasDot = value.indexOf('.') > -1;
//     return value && hasAtSign && hasDot;
//   }
//
//   function validatePassword() {
//     let value = passwordInput.value;
//
//     if (!value) {
//       showErrorMessage(passwordInput, 'Password is required.');
//       return false;
//     }
//
//     is (value.length <8) {
//       showErrorMessage(passwordInput, 'Password needs to be minimum 8 characters long.');
//       return false;
//     }
//
//       showErrorMessage(passwordInput, null);
//       return true;
//       return value && value.length >= 8;
//     }
//
//   function showErrorMessage(input, message) {
//     let container = input.parentElement; // The .input-wrapper
//
//   // Remove an existing error
//     let error = container.querySelector('.error-message');
//     if (error) {
//       container.removeChild(error);
//     }
//
//   // Now add the error if the message isn’t empty
//     if (message) {
//       let error = document.createElement('div');
//       error.classList.add('error-message');
//       error.innerText = message;
//       container.appendChild(error);
//     }
//
//     function validateForm() {
//       let isValidEmail = validateEmail();
//       let isValidPassword = validatePassword();
//       return isValidEmail && isValidPassword;
//     }
//
//     form.addEventListener('submit', (e) => {
//       e.preventDefault(); // Do not submit to the server
//       if (validateForm()) {
//         alert('Success!');
//       }
//     });
//
//     emailInput.addEventListener('input', validateEmail);
//     passwordInput.addEventListener('input', validatePassword);
})();
