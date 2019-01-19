window.addEventListener("load", function(event) {

  // In the following line, you should include the prefixes of implementations you want to test.
  window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

  const customerData = [
    { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
    { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }
  ];

  (function() {
    if (!('indexedDB' in window)) {
    console.log('This browser doesn\'t support IndexedDB');
    return;
    }

    const request = window.indexedDB.open("dbp", 1);
    console.log('request', request);

    request.onerror = function(e) {
      console.log('onerror', e)
    };

    request.onupgradeneeded = function(event) {
      db =  request.result;
      console.log('onupgradeneeded', db);
      const store = db.createObjectStore("data");
    };

    request.onsuccess = function(e) {
      const db = e.target.result;
      console.log('onsuccess', db);
    };

  })();


  function getData() {

    const request = window.indexedDB.open("dbp", 1);
    console.log('request', request);

    request.onerror = function(e) {
      console.log('onerror', e)
    };

    request.onsuccess = function(e) {
      const db = e.target.result;
      console.log('onsuccess', db);
      const transaction = db.transaction(["data"], "readwrite");
      const objectStore = transaction.objectStore("data");
      console.log('data', objectStore);
      objectStore.get('store').onsuccess = function(event) {
        console.log("objectStore.get ", event.target.result);
      };
    };

  }

  function setData(data) {

    const request = window.indexedDB.open("dbp", 1);
    console.log('request', request);

    request.onerror = function(e) {
      console.log('onerror', e)
    };

    request.onsuccess = function(e) {
      const db = e.target.result;
      console.log('onsuccess', db);
      const transaction = db.transaction(["data"], "readwrite");
      const objectStore = transaction.objectStore("data");
      console.log('data', objectStore);
      objectStore.put(JSON.stringify(data), 'store').onsuccess = function(event) {
        console.log("objectStore.put ", event.target.result);
      };
    };

  }

  setData(customerData);

  // getData();

});