const express = require("express");
const routeBook = require("./routes/book");
const cors = require("cors");
const routeFavorite = require("./routes/favorite");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use("/books", routeBook);
app.use("/favorite", routeFavorite);

const port = 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
