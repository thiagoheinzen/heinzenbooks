const { Router } = require("express");
const { getFavorites, postFavorite, deleteFavorite } = require("../controllers/favorite");

const router = Router();

router.get('/', getFavorites);

router.post('/:id', postFavorite);

router.delete('/:id', deleteFavorite);

module.exports = router;