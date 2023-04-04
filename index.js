// Business Logic:
// (4) remove old list if there already is a list
// (1) get value from the input field
// (2) search list from API with value
// (3) append list to DOM

const BASE_URL = 'https://hn.algolia.com/api/v1/';

function doSearch(query) {
  const url = BASE_URL + 'search?query=' + query + '&hitsPerPage=200';
  return fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      return result.hits;
    });
}

function addButtonEvent() {
  document.getElementById('searchButton')
    .addEventListener('click', onSearch);
};

function onSearch() {
  removeList();

  doSearch(getValueFromElementById('searchInput'))
    .then(appendList);
};

function getValueFromElementById(id) {
  return document.getElementById(id).value;
};

function removeList() {
  const listNode = document.getElementById('list');

  if (listNode) {
    listNode.parentNode.removeChild(listNode);
  }
}

function appendList(list) {
  const listNode = document.createElement('div');
  listNode.setAttribute('id', 'list');
  document.getElementById('app').appendChild(listNode);

  list.forEach(appendItem(listNode));
};

function appendItem(listNode) {
  return function (item) {
    const itemNode = document.createElement('div');
    itemNode.appendChild(document.createTextNode(item.title));
    listNode.appendChild(itemNode);
  };
};

addButtonEvent();
