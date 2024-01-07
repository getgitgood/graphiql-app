import { auth } from '../services/firebaseAuth';

const firebaseValue = '[DEFAULT]!1:783488770718:web:71ce42e1e875d0e923518f';

const heartbeatBaseCheck = async (): Promise<boolean> => {
  const result = await checkDataInIndexedDB(
    'firebase-heartbeat-database',
    'firebase-heartbeat-store',
    firebaseValue
  );

  if (result) {
    return true;
  } else {
    return false;
  }
};

const checkTokenExp = async () => {
  const token = localStorage.getItem('tokenExp');

  if (token) {
    const { tokenExp } = JSON.parse(token);
    const db = await heartbeatBaseCheck();
    if (Date.now() >= tokenExp || !db) {
      auth.signOut();
      localStorage.removeItem('tokenExp');
      location.reload();
      clearInterval(tokenCheckInterval);
    }
  }
};

function checkDataInIndexedDB(dbName: string, storeName: string, key: string) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName);

    request.onerror = () => {
      reject('Database error');
    };

    request.onsuccess = (event) => {
      if (event.target && 'result' in event.target) {
        const db = (event.target as IDBOpenDBRequest).result as IDBDatabase;

        const transaction = db.transaction([storeName]);
        const objectStore = transaction.objectStore(storeName);

        const dataRequest = objectStore.get(key);

        dataRequest.onerror = () => {
          reject('Error fetching data');
        };

        dataRequest.onsuccess = (event: Event) => {
          const request = event.target as IDBRequest;
          if (request.result) {
            resolve(true);
          } else {
            resolve(false);
          }
        };
      }
    };
  });
}

export const tokenCheckInterval = setInterval(checkTokenExp, 4000);
