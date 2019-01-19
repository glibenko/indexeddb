import { openDb, deleteDb } from 'idb';

if (!('indexedDB' in window)) {
  console.log('This browser doesn\'t support IndexedDB');
  return;
}

const dbPromise = openDb('db', 1, upgradeDB => {
  console.log('upgradeDB', upgradeDB)
  upgradeDB.createObjectStore('data');
});

const idbKeyval = {
  async get(key) {
    const db = await dbPromise;
    return db.transaction('data').objectStore('data').get(key);
  },
  async set(key, val) {
    const db = await dbPromise;
    const tx = db.transaction('data', 'readwrite');
    tx.objectStore('data').put(val, key);
    return tx.complete;
  },
  async delete(key) {
    const db = await dbPromise;
    const tx = db.transaction('data', 'readwrite');
    tx.objectStore('data').delete(key);
    return tx.complete;
  },
  async clear() {
    const db = await dbPromise;
    const tx = db.transaction('data', 'readwrite');
    tx.objectStore('data').clear();
    return tx.complete;
  },
  async keys() {
    const db = await dbPromise;
    return db.transaction('data').objectStore('data').getAllKeys(key);
  },
};

const customerData = [
  { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
  { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }
];


let dbData;
idbKeyval.get('store').then(val => {
  console.log(val);
  dbData = val;

  const list = document.getElementById('list');
  const jsonData = JSON.parse(dbData);
  let cont = '';
  jsonData.forEach(el => {
    cont += `<div key="${el.id}">${el.text}<div>`
  });
  console.log('cont', cont)

        list.innerHTML = cont;
});


window.addEventListener("load", function(event) {
  document.getElementById('btn').addEventListener('click', () => {
    const val = document.getElementById('input').value;
    console.log(val);
    if (!dbData) {
        console.log('its new')
      const data = [{
        id: 0,
        text: val
      }]
      idbKeyval.set('store', JSON.stringify(data));
    }

    if (dbData) {
      const jsonData = JSON.parse(dbData);
      let arr = [];
      jsonData.forEach(el => arr.push(el.id));
      const id = Math.max.apply(null, arr);
      console.log(id);
      const data = {
        id: id + 1,
        text: val
      }
      const fullData = [...jsonData, data];
      idbKeyval.set('store', JSON.stringify(fullData));
      idbKeyval.get('store').then(val => {
        console.log(val);
        dbData = val;

          const list = document.getElementById('list');
    const jsonData = JSON.parse(dbData);
    let cont = '';
    jsonData.forEach(el => {
      cont += `<div key="${el.id}">${el.text}<div>`
    });
    console.log('cont', cont)
    list.innerHTML = cont;
      });
    }
  });
  console.log("All resources finished loading!");
});
