import Dexie from 'dexie';

export const db = new Dexie('keepItSorted');
db.version(2).stores({
    items: '++id, name, description, link, category',
});