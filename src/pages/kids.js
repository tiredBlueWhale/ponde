import { update } from "./../app.js";
import { kidDB, getAllDocuments } from "./../services/db.js";

var data = '';

let Kids = {
    before_render: async () => {
        getAllKids();
    },
    render: async () => {
        let view =  /*html*/`
            <div class="page_scroll">
                <ul>
                    ${data}
                </ul>
            </div>
        `
        return view
    },
    after_render: async () => {
        // update();
    },
    after_close: async () => {
    },
    navbar: () => {
        return {
            back: false,
            title: 'Kids',
            buttons: new Array([manuelCheck, 'edit'])
        }
    }
}

function getAllKids() {
    data = '';
    getAllDocuments(kidDB)
        .then(function (result) {
            result.rows.forEach(row => {
                data += `<li><a href="#/kids/id/${row.doc._id}">${row.doc.name}</a></li>`;
            });
        }).catch(function (err) {
            console.log(err);
        }).finally(function () {
            update();
        });
}

function manuelCheck() {
    console.log("manuelCheck");
}

function test() {
    console.log("test");
}

export default Kids;