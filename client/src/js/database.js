import { openDB } from 'idb';

// init db
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      //db.createObjectStore('jate', { keyPath: 'id'});
      //db.createObjectStore('jate');
      console.log('jate database created');
    },
  });

//Add method to put do database. Use same Id so all the content is stored under one key
export const putDb = async (content) => {
  console.log('Post to the database: ' + content);

  // Create a connection to the database database and version we want to use.
  const jateDB = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDB.transaction('jate', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .put() method on the store and pass in the content with key 1.
  const request = store.put({ id: 1 , jate: content});
  //const request = store.put({jate: content});
  //const request = store.put(content);

  // Get confirmation of the request.
  const result = await request;
  console.log('Data saved to the database', result);
};

// Gets all the content from the database
export const getDb = async () => {
  console.log('GET entry from the database');

  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .getAll() method to get all data in the database.
  //const request = store.getKey("1");
 // const request = store.getAll();
 const request = store.getAll();

   // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result;

};

initdb();
