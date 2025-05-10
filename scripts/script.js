const form = document.getElementById('form');
const input = document.getElementById('input');
const list = document.getElementById('list');

let db;

const request = indexedDB.open('ZakupyDB', 1);

request.onupgradeneeded = event => {
  db = event.target.result;
  const store = db.createObjectStore('items', { keyPath: 'id', autoIncrement: true });
};

request.onsuccess = event => {
  db = event.target.result;
  loadItems();
};

request.onerror = event => {
  console.error('Błąd otwierania bazy danych:', event.target.errorCode);
};

function loadItems() {
  const tx = db.transaction('items', 'readonly');
  const store = tx.objectStore('items');
  const getAll = store.getAll();

  getAll.onsuccess = () => {
    renderItems(getAll.result);
  };
}

function addItem(text) {
  const tx = db.transaction('items', 'readwrite');
  const store = tx.objectStore('items');
  store.add({ text });
  tx.oncomplete = loadItems;
}

function deleteItem(id) {
  const tx = db.transaction('items', 'readwrite');
  const store = tx.objectStore('items');
  store.delete(id);
  tx.oncomplete = loadItems;
}

function renderItems(items) {
  list.innerHTML = '';
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.text;
    li.onclick = () => deleteItem(item.id);
    list.appendChild(li);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const value = input.value.trim();
  if (value) {
    addItem(value);
    input.value = '';
  }
});
