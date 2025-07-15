console.log("This script is running");

class Book {
    constructor(title, author, pages, read = false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = crypto.randomUUID();
    }

    toggleRead = () => {
        this.read = !this.read;
    }

    toString = () => {
        let res = "";
        res += this.title + ", by " + this.author + ", ";
        res += "Pages: " + this.pages + ", id: " + this.id;
        res += " Read: " + this.read;
        return res;
    }

}

function updateLibrary() {
    domLibrary.replaceChildren();
    for (let i = 0; i < myLibrary.length; ++i) {
        const bookContainer = document.createElement("div");
        const newParagraph = document.createElement("p");
        const readBtn = document.createElement("button");
        const delBtn = document.createElement("button");
        bookContainer.classList.add("bookContainer");
        newParagraph.textContent = myLibrary[i].toString();
        readBtn.textContent = "Toggle Read";
        readBtn.addEventListener("click", () => {
            myLibrary[i].toggleRead();
            newParagraph.textContent = myLibrary[i].toString();
        });
        delBtn.textContent = "Delete Book";
        delBtn.addEventListener("click", () => {
            myLibrary.splice(i, 1);
            updateLibrary();
        });
        bookContainer.appendChild(newParagraph);
        bookContainer.appendChild(readBtn);
        bookContainer.appendChild(delBtn);
        domLibrary.appendChild(bookContainer);
    }
}

const myLibrary = [];

function addBookToLibrary(title, author, pages, read = false) {
    myLibrary.push(new Book(title, author, pages, read));
}

addBookToLibrary("Hello world", "Me", 21);
addBookToLibrary("Hi world", "Shorter Titles", 1);
addBookToLibrary("The World", "Dio Brando", 26);
console.log(myLibrary);

const domLibrary = document.querySelector(".library");
const theDialog = document.getElementById("theDialog");
const dialogBtn = document.querySelector(".showDialog");
const closeDialog = document.getElementById("closeDialog");
const theForm = document.getElementById("libraryForm");
const addBookBtn = document.getElementById("addBook");
const inputList = document.querySelectorAll("input");

dialogBtn.addEventListener("click", () => theDialog.showModal());
closeDialog.addEventListener("click", () => {
    theDialog.close();
});

theForm.addEventListener("submit", () => {
    theDialog.close();
    const formData = theForm.elements;
    const title = formData["title"].value;
    const author = formData["author"].value;
    const pages = formData["pages"].value;
    addBookToLibrary(title, author, pages);
    updateLibrary();
    theForm.reset();
})

updateLibrary();
