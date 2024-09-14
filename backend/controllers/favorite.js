const { getAllFavorites, insertFavorite, deleteFavoriteById } = require("../services/favorite");

function getFavorites(req, res) {
  try {
    const books = getAllFavorites();
    res.send(books);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving favorites", error: error.message });
  }
}

function postFavorite(req, res) {
  try {
    const id = req.params.id;
    if (id && Number(id)) {
      insertFavorite(id);
      res.status(201).send({ message: "Book inserted successfully!" });
    } else {
      res.status(422).send({ message: "Invalid id." });
    }
  } catch (error) {
    res.status(500).send({ message: "Error inserting favorite", error: error.message });
  }
}

function deleteFavorite(req, res) {
  try {
    const id = req.params.id;
    if (id && Number(id)) {
      deleteFavoriteById(id);
      res.send({ message: "Book deleted successfully!" });
    } else {
      res.status(422).send({ message: "Invalid id." });
    }
  } catch (error) {
    res.status(500).send({ message: "Error deleting favorite", error: error.message });
  }
}

module.exports = {
  getFavorites,
  postFavorite,
  deleteFavorite
};
