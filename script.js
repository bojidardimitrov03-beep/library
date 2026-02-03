const myLibrary = []

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}


Book.prototype.toggleRead = function () {
    this.read = !this.read;

}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();

}

function displayBooks() {
    const container = document.getElementById(`book-container`);
    container.innerHTML = ``;

    myLibrary.forEach(book => {
        const bookCard = document.createElement(`div`);
        bookCard.classList.add(`book-card`);
        bookCard.setAttribute(`data-id`, book.id);

        bookCard.innerHTML = `
        <h3>${book.title}<h3>
        <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
           <p>Status: ${book.read ? 'Read' : 'Not read yet'}</p>
           <button class="toggle-read">Toggle Read Status</button>
        <button class="remove-book">Remove</button>
            `;

        container.appendChild(bookCard);

    });
}

const dialog = document.getElementById(`book-dialog`);
const newBookBtn = document.getElementById(`new-book-btn`);
const bookForm = document.getElementById(`book-form`);
const closeDialogBtn = document.getElementById(`close-dialog`);

newBookBtn.addEventListener(`click`, () => {
    dialog.showModal();

});

closeDialogBtn.addEventListener(`click`, () => {
    dialog.close();

});

bookForm.addEventListener(`submit`, (e) => {
    e.preventDefault();

    const formData = new FormData(bookForm);
    const title = formData.get(`title`);
    const author = formData.get('author');
    const pages = formData.get('pages');
    const read = formData.get('read') === 'on';

    addBookToLibrary(title, author, pages, read);

    bookForm.reset();
    dialog.close();


})

const bookContainer = document.getElementById(`book-container`);

bookContainer.addEventListener('click', (e) => {
    console.log('Something was clicked:', e.target); // See what was clicked
    
    const bookCard = e.target.closest('.book-card');
    console.log('Book card found:', bookCard); // See if it found the card
    
    if (!bookCard) return;
    
    const bookId = bookCard.getAttribute('data-id');
    console.log('Book ID:', bookId); // See the ID
    
    if (e.target.classList.contains('remove-book')) {
        console.log('Remove button clicked!'); // See if this part runs
        
        const index = myLibrary.findIndex(book => book.id === bookId);
        console.log('Index found:', index); // See which position in array
        
        myLibrary.splice(index, 1);
        console.log('Library after removal:', myLibrary); // See the array after
        
        displayBooks();
    }
    
    if (e.target.classList.contains('toggle-read')) {
        const book = myLibrary.find(book => book.id === bookId);
        book.toggleRead();
        displayBooks();
    }
});

// Test data
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("1984", "George Orwell", 328, false);