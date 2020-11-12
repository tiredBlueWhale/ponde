export let kidDB = new PouchDB('kids');

export function getDocument(db, id) {
    return db.get(id);
}

export function getAllDocuments(db) {
    return db.allDocs({ include_docs: true });
}