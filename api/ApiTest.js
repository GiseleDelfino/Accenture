import User from './User.js';
import Book from './Book.js';

/*
    Use the "--dry-run" parameter to test the script without creating a new user.
    The existing user must be provided with the "-u" and "-p" parameters.

    Generated test usernames and passwords consist of "gdelfuser" and "@gdelfPass",
    respectively, followed by a timestamp.
*/

// Timestamp used to generate unique test users
const timestamp = Date.now();

// Initialize variables used by the dry-run setup
let username = "gdelfuser" + timestamp;
let password = "@gdelfPass" + timestamp;
let id = "";

// Use the supplied user when the script runs in dry-run mode
if (process.argv.includes("--dry-run")) {
    username = process.argv[process.argv.indexOf("-u") + 1];
    password = process.argv[process.argv.indexOf("-p") + 1];
    id = process.argv[process.argv.indexOf("-i") + 1];

    console.log("Dry run: no new user will be created. Using the user supplied in the parameters.");
}

// Create the user
const user = new User(username, password);

if (!process.argv.includes("--dry-run")) {
    await user.create_user();
    console.log("User created successfully! UserId: " + user.userId);
}
else {
    user.userId = id;
}

// Generate an authentication token
const tokenResponse = await user.generate_token();
const token = tokenResponse.token;
const expires = new Date(tokenResponse.expires);

// Print the token for testing purposes
console.log("Token generated successfully! Token: " + token + ", Expires: " + expires.toString());

// Check whether the user is authorized
const auth = await user.is_authorized();
if (auth) {
    console.log("User authorized successfully!");
}
else {
    console.log("User authorization failed.");
}

// List the available books
const book = new Book();
const books = await book.list_books();
console.log("AVAILABLE BOOKS:");
for (let i = 0; i < books.length; i++) { // Print each book
    console.log("ISBN: " + books[i].isbn + ", Title: " + books[i].title);
}

// Generate two different random indices for the books to add to the user's collection
let lended = [Math.floor(Math.random() * books.length), Math.floor(Math.random() * books.length)];
while (lended[0] === lended[1]) { 
    lended[1] = Math.floor(Math.random() * books.length);
}
const books_isbn = [books[lended[0]].isbn, books[lended[1]].isbn];

// Add the books to the user's collection
console.log("Adding books to the collection:");
books_isbn.forEach(isbn => {
    // Print the details of each book being added
    const bookData = books.find(book => book.isbn === isbn);
    console.log("- Title: " + bookData.title + " (ISBN " + isbn + ")");
})
// Adding books requires authorization, so the user's token must be provided
await book.lend_books(user.userId, books_isbn, user.token);
console.log("Books added to the collection successfully!");

// Retrieve and print the user's data
const userData = await user.get_user_data();
console.log("USER DETAILS:");
console.log("ID: " + userData.userId);
console.log("Username: " + userData.username);
console.log("Book Collection:");
userData.books.forEach(book => {
    // Print each book in the user's collection
    console.log("- Title: " + book.title + " (ISBN " + book.isbn + ")");
})