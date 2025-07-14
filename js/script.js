console.log("This script is running");

function Book(title, author, pages, read = false) {
    if (!new.target) {
        throw error("New keyword not used for constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

Book.prototype.toString = function() {
    let res = "";
    res += this.title + ", by " + this.author + ", ";
    res += this.pages + " pages, " + "id: " + this.id;
    return res;
}

function updateLibrary() {
    domLibrary.replaceChildren();
    for (const book of myLibrary) {
        const newParagraph = document.createElement("p");
        newParagraph.textContent = book.toString();
        domLibrary.appendChild(newParagraph);
    }
}

const myLibrary = [];

function addBookToLibrary(title, author, pages, read = false) {
    myLibrary.push(new Book(title, author, pages, read));
}

addBookToLibrary("Hello world", "Me", 21);
addBookToLibrary("Hi world", "Shortcuts", 1);
addBookToLibrary("The World", "Dio Brando", 100);
console.log(myLibrary);

const domLibrary = document.querySelector(".library")
updateLibrary();
