// Book Class: Representa un libro

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
// UI Class: Gestionar tareas en UI
class UI {
    static displayBooks() {
        
        const books = Store.getBooks();





        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }
    static deleteBook(e) {
        if (e.target.classList.contains('delete')) {
            e.target.parentElement.parentElement.remove()
            UI.showAlert("Elemento eliminado correctamente", "success");
        }
        //With ternary Operator
        // e.target.classList.contains('delete') ? e.target.parentElement.parentElement.remove() : console.log("no es un X")

    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        const text = document.createTextNode(message);
        div.appendChild(text);
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        const alerta = container.insertBefore(div, form);

        // Delete after 
        setTimeout(() => {
            alerta.remove()
        }, 2000);


    }

    static clearFields() {

        document.querySelector("#title").value = '';
        document.querySelector("#author").value = '';
        document.querySelector("#isbn").value = '';


    }

}

// Store Class : Gestiona Almacenamiento
class Store {

    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];

        } else {
            console.log(localStorage.getItem('books'));
            books = JSON.parse(localStorage.getItem('books'));

        }
        return books;
    }


    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));

    }


    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        localStorage.setItem('books',JSON.stringify(books));
            
        });
    }

    // document.querySelector('.delete').addEventListener('click', (e) => {
    //     const isbnr=e.parentElement.previousSibling.value;
    //  });

}
// Evento: Mostrar libro
document.addEventListener('DOMContentLoaded', UI.displayBooks);
// Evento: Añadir libro
document.querySelector('#book-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();
    // Get form values    

    const titulo = document.querySelector("#title").value;
    const autor = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;

    //Validate
    if (titulo == "" || autor == "" || isbn == "") {

        UI.showAlert("porfavor rellene todos los formularioas", "danger");
    } else {

        // Instantiate Book
        const book = new Book(titulo, autor, isbn);
        //AddBookTo to UI
        UI.addBookToList(book);

        //add boot yo list
        Store.addBook(book);
        //Clear Fields
        UI.clearFields();
        UI.showAlert("Todo correccto", "success");


    }


});

// Evento: Borrar libro
document.querySelector('#book-list').addEventListener('click', (e) => {
    //remove
    UI.deleteBook(e);

    //remove book
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});