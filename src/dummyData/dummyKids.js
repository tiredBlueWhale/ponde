var db = new PouchDB('kids');

// db.bulkDocs([
//     {
//         "_id": "101",
//         "name": "Anna",
//     },
//     {
//         "_id": "102",
//         "name": "Johan",
//     },
// ]);
let dummyKids = [];

for (var i = 0; i < 100; i++) {
    dummyKids.push({
        "_id": `00${i}`,
        "name": `Paul${i}`,
    });
}

db.bulkDocs(dummyKids);

db.allDocs({ include_docs: true })
    .then(function (result) {
        console.log(result);
    }).catch(function (err) {
        console.log(err);
    });