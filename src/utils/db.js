// src/utils/db.js
import { openDB } from 'idb';

const DB_NAME = 'trackerDB';
const DB_VERSION = 2; // Erhöhen Sie die Versionsnummer
const COUNTER_TRACKER_STORE_NAME = 'counterTrackers';
const TIME_TRACKER_STORE_NAME = 'timeTrackers';

const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db, oldVersion, newVersion, transaction) {
      if (!db.objectStoreNames.contains(COUNTER_TRACKER_STORE_NAME)) {
        db.createObjectStore(COUNTER_TRACKER_STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains(TIME_TRACKER_STORE_NAME)) {
        db.createObjectStore(TIME_TRACKER_STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

// Funktionen für Counter-Tracker
export const addCounterTracker = async (tracker) => {
  const db = await initDB();
  return db.add(COUNTER_TRACKER_STORE_NAME, tracker);
};

export const getCounterTrackers = async () => {
  const db = await initDB();
  const trackers = await db.getAll(COUNTER_TRACKER_STORE_NAME);
  return Array.isArray(trackers) ? trackers : [];
};

export const updateCounterTracker = async (tracker) => {
  const db = await initDB();
  return db.put(COUNTER_TRACKER_STORE_NAME, tracker);
};

export const deleteCounterTracker = async (id) => {
  const db = await initDB();
  return db.delete(COUNTER_TRACKER_STORE_NAME, id);
};

export const clearCounterTrackers = async () => {
  const db = await initDB();
  const tx = db.transaction(COUNTER_TRACKER_STORE_NAME, 'readwrite');
  const store = tx.objectStore(COUNTER_TRACKER_STORE_NAME);
  await store.clear();
  await tx.done;
};

// Funktionen für Zeit-Tracker
export const addTimeTracker = async (timeTracker) => {
  const db = await initDB();
  return db.add(TIME_TRACKER_STORE_NAME, timeTracker);
};

export const getTimeTrackers = async () => {
  const db = await initDB();
  const timeTrackers = await db.getAll(TIME_TRACKER_STORE_NAME);
  return Array.isArray(timeTrackers) ? timeTrackers : [];
};

export const updateTimeTracker = async (timeTracker) => {
  const db = await initDB();
  return db.put(TIME_TRACKER_STORE_NAME, timeTracker);
};

export const deleteTimeTracker = async (id) => {
  const db = await initDB();
  return db.delete(TIME_TRACKER_STORE_NAME, id);
};

export const clearTimeTrackers = async () => {
  const db = await initDB();
  const tx = db.transaction(TIME_TRACKER_STORE_NAME, 'readwrite');
  const store = tx.objectStore(TIME_TRACKER_STORE_NAME);
  await store.clear();
  await tx.done;
};