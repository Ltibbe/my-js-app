let PokemonRepository = (function() {
  let t = [],
    e = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  function n(e) {
    if (!('object' == typeof e && 'name' in e))
      throw 'item must be an object, it was not included on the list';
    t.push(e);
  }
  let i = (t, e) =>
    t.addEventListener('click', function() {
      !(function(t) {
        o(t).then(function() {
          a(t);
        });
      })(e);
    });
  function o(t) {
    let e = t.detailsUrl;
    return fetch(e)
      .then(function(t) {
        return t.json();
      })
      .then(function(e) {
        (t.imageUrlFront = e.sprites.front_default),
          (t.imageUrlBack = e.sprites.back_default),
          (t.height = e.height),
          (t.types = e.types),
          (t.weight = e.weight),
          (t.abilities = e.abilities);
      })
      .catch(function(t) {
        console.error(t);
      });
  }
  function a(t) {
    let e = $('.modal-body'),
      n = $('.modal-title');
    $('.modal-header');
    n.empty(), e.empty();
    let i = $('<h1>' + t.name + '</h1>'),
      o = $('<img class="modal-img" style="width:50%">');
    o.attr('src', t.imageUrlFront);
    let a = $('<img class="modal-img" style="width:50%">');
    a.attr('src', t.imageUrlBack);
    let l = $('<p>height : ' + t.height + '</p>'),
      s = $('<p>weight : ' + t.weight + '</p>'),
      r = $('<p>types : ' + t.types + '</p>'),
      p = $('<p>abilities : ' + t.abilities + '</p>');
    n.append(i),
      e.append(o),
      e.append(a),
      e.append(l),
      e.append(s),
      e.append(r),
      e.append(p);
  }
  return {
    add: n,
    getAll: function() {
      return t;
    },
    addListItem: function(t) {
      let e = document.querySelector('.pokemon-list-group'),
        n = document.createElement('li');
      n.classList.add('list-group-item', 'flex-fill');
      let o = document.createElement('button');
      (o.innerText = t.name),
        o.classList.add('btn', 'btn-primary'),
        o.setAttribute('data-toggle', 'modal'),
        o.setAttribute('data-target', '#pokemonModal'),
        i(o, t),
        n.appendChild(o),
        e.appendChild(n);
    },
    loadList: function() {
      return fetch(e)
        .then(function(t) {
          return t.json();
        })
        .then(function(t) {
          t.results.forEach(function(t) {
            n({
              name: t.name,
              detailsUrl: t.url,
              height: t.height,
              types: t.types
            });
          });
        })
        .catch(function(t) {
          hideLoadingMessage(), console.error(t);
        });
    },
    loadDetails: o,
    showModal: a
  };
})();
console.log(PokemonRepository.getAll()),
  PokemonRepository.loadList().then(function() {
    PokemonRepository.getAll().forEach(function(t) {
      PokemonRepository.addListItem(t);
    });
  });
