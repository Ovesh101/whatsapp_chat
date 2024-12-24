import { openDB } from 'idb';

const useIndexedDB = () => {
  const dbName = 'WhatsAppCloneDB';
  const storeName = 'messages';

  // Initialize the database
  const initDB = async () => {
    return openDB(dbName, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
        }
      },
    });
  };

  // Add data to IndexedDB
  const addMessage = async (message) => {
    const db = await initDB();
    await db.add(storeName, message);
  };

  // Retrieve all messages from IndexedDB
  const getMessages = async () => {
    const db = await initDB();
    return await db.getAll(storeName);
  };
  const deleteMessageFromIndexedDB = async (messageId) => {
    const db = await initDB();
    await db.delete('messages', messageId);
  };

  return { initDB ,addMessage, getMessages , deleteMessageFromIndexedDB };
};

export default useIndexedDB;
