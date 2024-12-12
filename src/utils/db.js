// src/utils/db.js
import { openDB } from 'idb';

const DB_NAME = 'trackerDB';
const DB_VERSION = 1;
const STORE_NAME = 'trackers';

const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

export const addTracker = async (tracker) => {
  const db = await initDB();
  return db.add(STORE_NAME, tracker);
};

export const getTrackers = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

export const updateTracker = async (tracker) => {
  const db = await initDB();
  return db.put(STORE_NAME, tracker);
};

export const deleteTracker = async (id) => {
  const db = await initDB();
  return db.delete(STORE_NAME, id);
};
