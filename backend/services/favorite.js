const fs = require("fs");

function getAllFavorites() {
    return JSON.parse(fs.readFileSync("favorites.json")) 
};

function deleteFavoriteById(id) {
    const books = JSON.parse(fs.readFileSync("favorites.json"))

    const bookFiltered = books.filter(book => book.id !== id)
    fs.writeFileSync("favorites.json", JSON.stringify(bookFiltered))
};

function insertFavorite(id) {
    const books = JSON.parse(fs.readFileSync("books.json")) 
    const favorites = JSON.parse(fs.readFileSync("favorites.json"))

    const insertBook = books.find(book => book.id === id)
    const newListOfFavoriteBooks = [...favorites, insertBook]
    fs.writeFileSync("favorites.json", JSON.stringify(newListOfFavoriteBooks))
}

module.exports = {
    getAllFavorites,
    deleteFavoriteById,
    insertFavorite
}