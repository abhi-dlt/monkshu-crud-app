/* 
 * (C) 2020 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
import { router } from "/framework/js/router.mjs";
import { monkshu_component } from "/framework/js/monkshu_component.mjs";
import { apimanager as apiman } from "/framework/js/apimanager.mjs";

let root = app_books.shadowRoot.querySelector("#app-books");

const getBooks = async () => {
    let resp = await apiman.rest(APP_CONSTANTS.API_GETBOOKS, "GET", {}, false, true);
    if (!resp || !resp.result) router.reload();
    if(!Array.isArray(resp.results.books)){
        appendNoContent();
    }
    for(let i=0, l=resp.results.books.length; i<l; i++){
        let ele = document.createElement("p");
        ele.id = resp.results.books[i].id;
        ele.innerText = resp.results.books[i].name;
        root.appendChild(ele);

        //add edit and delete button
        
    }
}
const appendNoContent = () => {
    let ele = document.createElement("p");
    ele.id = "no-content";
    ele.innerText = resp.results.books;
    root.appendChild(ele);
}
const createBook = async (body) => {
    if(!body.name || b) return alert("Provide a name.")
    let resp = await apiman.rest(APP_CONSTANTS.API_CREATEBOOKS, "POST", body, false, true);
    if (!resp || !resp.result) {
        alert(resp.results.toString());
    }
    root.removeChild(app_books.shadowRoot.querySelector("#no-content"));
    let ele = document.createElement("p");

    let crossButton = document.createElement("button");
    crossButton.innerText = "[X]";
    crossButton.id = `del${resp.results.insertId}`;
    crossButton.onclick = _deleteEvent;

    let editButton = document.createElement("button");
    editButton.innerText = "./";
    editButton.id = `edi${resp.results.insertId}`;
    editButton.onclick = _generateForm;
    ele.id = `${resp.results.insertId}`;
    ele.innerText = body.name;
    root.appendChild(ele);
    return alert("book added.");
}

const _generateForm = async (e) => {
    let id = Number(e.target.id.substring(3));
    let div = document.createElement("div");
    let input = document.createElement("input");
    input.id = "editbox";
    let button = document.createElement("button");
    div.appendChild(input);
    div.appendChild(button);
    div.id = "form";
    button.onsubmit = callEditApi(id);
    div.style = {
        position: "sticky",
        top: "0px",
        margin: "auto"
    }
    root.appendChild(div);
}

const callEditApi = async (id) => {
    let newName = app_books.shadowRoot.querySelector("#editbox").value;
    let originalName = app_books.shadowRoot.querySelector(`#${id}`).innerText;
    if(!newName || !newName.length) return alert("Empty name not allowed.");
    else if(newName == originalName) return alert("Provide a different name.")
    else updateBook({newName, id});
}

const updateBook = async (body) => {
    if(!body.newName || !body.newName.length) return alert("Provide a name.")
    let resp = await apiman.rest(APP_CONSTANTS.API_UPDATEBOOKS, "POST", body, false, true);
    if (!resp || !resp.result) {
        alert(resp.results.toString());
    }
    app_books.shadowRoot.querySelector(`#${body.id}`).innerText = body.newName;
    root.removeChild(app_books.shadowRoot.querySelector("#form"))
    return alert("book updated.");
}

const deleteBook = async (body) => {
    if(!body.id) return alert("Attach id.")
    let resp = await apiman.rest(APP_CONSTANTS.API_DELETEBOOKS, "POST", body, false, true);
    if (!resp || !resp.result) {
        alert(resp.results.toString());
    }
    root.removeChild(app_books.shadowRoot.querySelector(`#${body.id}`))
    if(root.children.length == 0) appendNoContent();
    return alert("book deleted.");
}

const _deleteEvent = async (e) => {
    let id = Number(e.target.id.substring(3));
    deleteBook({id})
}

const _editEvent = async (e) => {
    let id = Number(e.target.id.substring(3));
    let editbox = app_books.shadowRoot.querySelector("#editbox");
    app_books.shadowRoot.querySelector(`#${id}`).innerText = editbox.innerText;
    root.removeChild(editbox)
}

function register() {
    // convert this all into a WebComponent so we can use it
    monkshu_component.register("app-books", `${APP_CONSTANTS.APP_PATH}/components/app-books/app-books.html`, app_books);
}

const trueWebComponentMode = true;	// making this false renders the component without using Shadow DOM

export const app_books = { trueWebComponentMode, register, getBooks, createBook , updateBook, deleteBook}