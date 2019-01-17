import { openDb, deleteDb } from 'idb';

// if (!('indexedDB' in window)) {
//   console.log('This browser doesn\'t support IndexedDB');
//   return;
// }
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
});


  window.addEventListener("load", function(event) {


document.getElementById('btn').addEventListener('click', () => {

  const val = document.getElementById('input').value;
  console.log(val);
  if (!dbData) {
      console.log('its new')
    const data = {
      id: 0,
      text: val
    }
    idbKeyval.set('store', JSON.stringify(data));
  }

  if (dbData) {
    
  }

})

    console.log("All resources finished loading!");
  });

// idbKeyval.set('store', JSON.stringify(customerData));

// logs: {hello: 'world'}
// idbKeyval.get('store').then(val => console.log(val));



// (async function() {
//     // In the following line, you should include the prefixes of implementations you want to test.
//   window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
//   // DON'T use "var indexedDB = ..." if you're not in a function.
//   // Moreover, you may need references to some window.IDB* objects:
//   window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
//   window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
//   // (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)


//   // check for support
//   if (!window.indexedDB) {
//     console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
//   }

//   const customerData = [
//   { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
//   { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }
// ];

// console.log(JSON.stringify(customerData))

//   var db;
//   var request = window.indexedDB.open("db", 2);
//   console.log('request', request);

//   request.onerror = function(e) {
//     console.log('onerror', e)
//   };

//   request.onsuccess = function(e) {
//     db = e.target.result;
//     console.log('onsuccess', db);
//   //   db.transaction("todo").objectStore("customers").get("444-44-4444").onsuccess = function(event) {
//   // console.log("Name for SSN 444-44-4444 is " + event.target.result.name);
//   // };

//   var transaction = db.transaction(["data"]);
//   console.log('transaction', transaction)
// var objectStore = transaction.objectStore("data");
// console.log('data', objectStore)
// objectStore.getAll().onsuccess = function(event) {
//   console.log("Got all customers: ", event.target.result);
// };

//   };

//   // db.onerror = function(event) {
//   // // Generic error handler for all errors targeted at this database's
//   // // requests!
//   //   console.log("Database error: " + event.target.errorCode);
//   // };

//   // var db;
//   //   request.onsuccess = function(e) {
//   //     db = event.target.result;
//   //     console.log('e', e, db);

//   //     // var objectStore = db.createObjectStore("test-db1", { keyPath: "myKey" });
//   // };

//   // request.onupgradeneeded = function(event) { 
//   //   // Save the IDBDatabase interface 
//   //   var db = event.target.result;
//   //   console.log('onupgradeneeded', db)
//   //   // Create an objectStore for this database
//   //   var objectStore = db.createObjectStore("name", { keyPath: "myKey" });
//   // };

//   request.onupgradeneeded = function(event) { 
//     // Save the IDBDatabase interface 
//     db = event.target.result;
//     console.log('onupgradeneeded', db);
//     // Create an objectStore for this database
//     var objectStore = db.createObjectStore("data");
//     // objectStore.createIndex("name", "name", { unique: false });

//     // Create an index to search customers by email. We want to ensure that
//     // no two customers have the same email, so use a unique index.
//     // objectStore.createIndex("email", "email", { unique: true });

//       objectStore.transaction.oncomplete = function(event) {
//     // Store values in the newly created objectStore.
//         var customerObjectStore = db.transaction("data", "readwrite").objectStore("data");

//         console.log('customerObjectStore', customerObjectStore)
//         // customerData.forEach(function(customer) {
//           customerObjectStore.add('store', JSON.stringify(customerData));
//         // });
//       };

//       // var objectStore = transaction.objectStore("customers");
//       //   customerData.forEach(function(customer) {
//       //     var request = objectStore.add('customer');
//       //     request.onsuccess = function(event) {
//       //       // event.target.result === customer.ssn;
//       //     };
//       //   });

//   };




//   // request.onupgradeneeded = function(event) { 
//   //   // Save the IDBDatabase interface 
//   //   var db = event.target.result;
//   //   console.log('onupgradeneeded', db)

//   //   // Create an objectStore for this database
//   //   // var objectStore = db.createObjectStore("name", { keyPath: "myKey" });
//   // };

 

// })();

