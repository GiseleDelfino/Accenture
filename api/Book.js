const api_url = "https://demoqa.com/BookStore/v1/"

/*
This is the book model class. It contains functions that implement
the book-related endpoints.
*/

class Book {

    // List all books in the database
    async list_books() {
        const response = await fetch(api_url + "Books", {
            method: "GET",
            headers: {"accept": "application/json",
                "Content-Type": "application/json"}
        })

        if (!response.ok) {
            throw new Error("Error: Failed to list books. Status: " + response.status);
        }
        else {
            const data = await response.json();
            return data.books;
        }
    }

    // Add books to the user's collection; the user's token is required in the header
    async lend_books(userId, books_isbn, token) {
        const payload = {
            userId: userId,
            // Convert the ISBN array to the structure required by the request body
            collectionOfIsbns: books_isbn.map(isbn => ({"isbn": isbn}))
        };

        const response = await fetch(api_url + "Books", {
            method: "POST",
            headers: {"accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token},
            body: JSON.stringify(payload)
        })

        if (!response.ok) {
            throw new Error("Error: Failed to add books to the user's collection. Status: " + response.status);
        }

        const data = await response.json();
        return data;
    }

    // Get a book's details by ISBN
    async get_book(isbn) {
        const response = await fetch(api_url + "Book?ISBN=" + isbn, {
            method: "GET",
            headers: {"accept": "application/json",
                "Content-Type": "application/json"}
        })

        if (!response.ok) {
            throw new Error("Error: Failed to get book details. Status: " + response.status);
        }

        const data = await response.json();
        return data;
    }
}

export default Book;   