'use strict'

function init() {
    updateId();
    createBooks()
    renderBooks();
} 


function renderBooks() {
    var books = getBooks();
    var strHTML = `<table><tr>
    <th>id</th>
    <th>name</th>
    <th>price</th>
    <th colspan="3">actions</th>
    </tr>`;
    for (var i = 0; i < books.length; i++) {
        strHTML += `<tr>
        <td>${books[i].id}</td>
        <td>${books[i].name}</td>
        <td>${books[i].price}</td>
        <td><button onclick="onReadBook(${books[i].id})">read</button></td>
        <td><button onclick="readAndUpdateBook(${books[i].id})">update</button></td>
        <td><button onclick="onDeleteBook(${books[i].id})">delete</button></td>
        </tr>`
    }
    strHTML += `</table>`;

    var elBooks = document.querySelector('.book-chart')
    elBooks.innerHTML = strHTML;
}





function onReadBook(bookId) {
    openModal();
    var book = findBook(bookId);
    var elBookModal = document.querySelector('.modal-content');
    var strHTML = `<button class="close-button" onclick="closeModal()">x</button>
        <h2>${book.name}</h2>
        <img src="${book.imgUrl}"/>
        <h2>Price : ${book.price}</h2>
        <h2>Rating</h2>
        <p><button onclick="onRateBook(${bookId}, 1)">+</button> ${book.rating}
        <button onclick="onRateBook(${bookId}, -1)">-</button></p>`;
    
    elBookModal.innerHTML = strHTML;
}



function onRateBook(bookId, diff){
    var book = findBook(bookId);
    book.rating += diff;
    checkRating(book)
    saveBooksToStorage();
    renderRate(bookId,book);
    //renderBooks();
}

function renderRate(bookId,book){
    var rate = document.querySelector('.modal p');
    var strHTML = `<button onclick="onRateBook(${bookId}, 1)">+</button> ${book.rating}<button onclick="onRateBook(${bookId}, -1)">-</button>`
    rate.innerHTML = strHTML;
}




function openModal() {
    var modal = document.querySelector('.modal')
    modal.classList.add("show-modal");
}

function closeModal() {
    var modal = document.querySelector('.modal')
    modal.classList.remove("show-modal");
}
 
function onDeleteBook(bookId) {
    var isSure = confirm('Are you sure?')
    if (!isSure) return;

    deleteBook(bookId);
    renderBooks();
}

function readAndUpdateBook(bookId) {
    var newPrice = +prompt('Enter new price');
    if (newPrice <= 0) return;

    updateBook(bookId, newPrice);
    renderBooks();
}
 
function readAndAddNewBook() {
    var name = document.querySelector('.book-name').value
    var price = document.querySelector('.book-price').value
    if (!name || !price) return;
    addBook(name, price);
    renderBooks();
}


function onNextPage() {
    document.querySelector('.prev-btn').style.display = 'inline';
    if(!nextPage()) {
        var elBtn = document.querySelector('.next-btn');
        elBtn.style.display = 'none'
    } 
    renderBooks();
}
function onPrevPage() {
    document.querySelector('.next-btn').style.display = 'inline';
    
    if(!prevPage()){
        var elBtn = document.querySelector('.prev-btn');
        elBtn.style.display = 'none'
    }
    renderBooks();
}

function onSetSort(sortedBy) {
    setSort(sortedBy);
    renderBooks();
}

// function onSetSort(sortedBy) {
//     console.log('Setting sort', sortedBy);
//     setSort(sortedBy);
//     renderTodos();
// }


