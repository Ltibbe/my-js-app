let pokemonRepository = (function () {
    let pokemonList = [];
     let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

function add(pokemon) {
  if (
    typeof pokemon === 'object' &&
    'name' in pokemon
    // 'detailsUrl' in pokemon
  ) {
    pokemonList.push(pokemon);
  } else {
    console.log('pokemon is not correct');
  }
}

function getAll() {
  return pokemonList;
}

//Here, .getAll().forEach brings back every pokemon + .name +.height
function addListItem(pokemon) {
    let list = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');

    button.innerText = pokemon.name;
    button.classList.add('button-class');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#modal-container');

    listItem.appendChild(button);
    list.appendChild(listItem);

    button.addEventListener('click', function (event) {
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
          detailsUrl: item.url
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
      item.imageUrl = details.sprites.front_default
      item.imageUrlBack = details.sprites.back_default;
      item.height = details.height;
      item.types = details.types;
      return pokemon;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
     console.log(item);
  });
  }

  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem
  };
})();

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});

// Form validation for email address and password//
(function() {
  let form = document.querySelector('#register-form');
  let emailInput = document.querySelector('#email');
  let passwordInput = document.querySelector('#password');

  function showErrorMessage(input, message) {
    let container = input.parentElement; // The .input-wrapper

    // Remove an existing error
    let error = container.querySelector('.error-message');
    if (error) {
      container.removeChild(error);
    }

    // Now add the error, if the message is not empty
    if (message) {
      let error = document.createElement('div');
      error.classList.add('error-message');
      error.innerText = message;
      container.appendChild(error);
    }
  }
  function validateEmail() {
    let value = emailInput.value;

    if (!value) {
      showErrorMessage(emailInput, 'Email is required.');
      return false;
  }

    if (value.indexOf('@') === -1) {
      showErrorMessage(emailInput, 'You must enter a valid email address.');
      return false;
  }

      showErrorMessage(emailInput, null);
      return true;
  }

    let hasAtSign =value.indexOf('@') > -1;
    let hasDot = value.indexOf('.') > -1;
    return value && hasAtSign && hasDot;
  }

  function validatePassword() {
    let value = passwordInput.value;

    if (!value) {
      showErrorMessage(passwordInput, 'Password is required.');
      return false;
    }

    is (value.length <8) {
      showErrorMessage(passwordInput, 'Password needs to be minimum 8 characters long.');
      return false;
    }

      showErrorMessage(passwordInput, null);
      return true;
      return value && value.length >= 8;
    }

  function showErrorMessage(input, message) {
    let container = input.parentElement; // The .input-wrapper

  // Remove an existing error
    let error = container.querySelector('.error-message');
    if (error) {
      container.removeChild(error);
    }

  // Now add the error if the message isn’t empty
    if (message) {
      let error = document.createElement('div');
      error.classList.add('error-message');
      error.innerText = message;
      container.appendChild(error);
    }

    function validateForm() {
      let isValidEmail = validateEmail();
      let isValidPassword = validatePassword();
      return isValidEmail && isValidPassword;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault(); // Do not submit to the server
      if (validateForm()) {
        alert('Success!');
      }
    });

    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
})();
