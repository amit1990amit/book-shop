'use strict'

const BOOKS_KEY = 'books'
const numBooksInPage = 2;
const ID_KEY = 'id'

var gNextId; 
var gBooks;
var gCurrPage = 0;
var gSortedBy = 'name';


function createBooks() {
    var books = loadBooksFromStorage();
    if (!books || books.length === 0) {
        gNextId = 101;
        books = [
            createBook('molan', 12),
            createBook('lion king', 20),
            createBook('aladin', 30)
        ];
        saveIdToStorage();
    }
    gBooks = books;
    saveBooksToStorage();

}

function createBook(name, price) {
    var book = {
        id: gNextId++,
        name: name,
        price: price,
        imgUrl: "https://picsum.photos/200",
        rating: 5
    }
    saveIdToStorage()
    return book;
}

function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return book.id === bookId;
    });
    if (bookIdx < 0) return;
    gBooks.splice(bookIdx, 1);
    saveBooksToStorage();
}

function addBook(name, price) {
    var book = createBook(name, price);
    gBooks.unshift(book);
    saveBooksToStorage();

}

function updateBook(bookId, price) {
    var book = findBook(bookId);
    if (!book) return;
    book.price = price;
    saveBooksToStorage();
}

function findBook(bookId) {
    var book = gBooks.find(function (book) {
        return book.id === bookId;
    })
    return book;
}


function updateId() {
    gNextId = loadIdFromStorage();
    saveIdToStorage();
}

function getBooks() {
    var pageIdx = numBooksInPage * gCurrPage;
    return gBooks.slice(pageIdx, pageIdx + numBooksInPage);
}


function nextPage() {
    var numPages = Math.floor(gBooks.length / numBooksInPage)
    if (gCurrPage < numPages) {
        gCurrPage++;
        return true;
    }
    return false
}
function prevPage() {
    if ( gCurrPage > 0) {
        gCurrPage--;
        return true;
    }
    return false
}



function saveBooksToStorage() {
    saveToStorage(BOOKS_KEY, gBooks)
}
function loadBooksFromStorage() {
    return loadFromStorage(BOOKS_KEY);
}

function saveIdToStorage() {
    saveToStorage(ID_KEY, gNextId)
}
function loadIdFromStorage() {
    return loadFromStorage(ID_KEY);
}


function checkRating(book) {
    if (book.rating >= 10) {
        book.rating = 10;
        return;
    }
    if (book.rating <= 0) {
        book.rating = 0;
    }
}
//////////////////////////////////////////

function setSort(sortedBy) {
    gSortedBy = sortedBy
    sortBooksBy();
}

function sortBooksBy() {
    if(gSortedBy === 'name'){
        gBooks.sort(cmpByName)
    }
    if(gSortedBy === 'price') {
        gBooks.sort(cmpByPrice)
    }
}

function cmpByName(a, b) {
    return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
}

function cmpByPrice(a, b) {
    return a.price > b.price ? 1 : -1;
}


// function cmpByCreation(a, b) {
//     return a.Date > b.Date ? 1 : -1;
// }

// function cmpByImportance(a, b) {
//     return a.importance - b.importance;
// }