const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "books.json");

function readBooksFile() {
  try {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  } catch (error) {
    throw new Error("Error reading books file ${error.message}");
  }
}

function writeBooksFile(data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    throw new Error("Error writing to books file ${error.message}");
  }
}

function getAllBooks() {
  return readBooksFile();
}

function getBookById(id) {
  const books = readBooksFile();
  const book = books.find(book => book.id === id);
  if (!book) {
    throw new Error("Book not found ${error.message}");
  }
  return book;
}

function insertBook(newBook) {
  const books = readBooksFile();
  const newId = books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1;
  const bookToInsert = { ...newBook, id: newId };

  books.push(bookToInsert);
  writeBooksFile(books);
}

function modifyBook(modifications, id) {
  const books = readBooksFile();
  const bookIndex = books.findIndex(book => book.id === id);

  if (bookIndex === -1) {
    throw new Error("Book not found ${error.message}");
  }

  const updatedBook = { ...books[bookIndex], ...modifications };
  books[bookIndex] = updatedBook;
  writeBooksFile(books);
}

function deleteBookById(id) {
  const books = readBooksFile();
  const bookIndex = books.findIndex(book => book.id === id);

  if (bookIndex === -1) {
    throw new Error("Book not found ${error.message}");
  }

  books.splice(bookIndex, 1);
  writeBooksFile(books);
}

module.exports = {
  getAllBooks,
  getBookById,
  insertBook,
  modifyBook,
  deleteBookById,
};
