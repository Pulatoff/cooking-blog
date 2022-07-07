const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const port = process.env.PORT || 8000;
const recipeRouter = require("./server/routes/recipeRouter");
require("dotenv").config({ path: "./config.env" });

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(expressLayouts);

app.set("layout", "./layouts/main");
app.set("view engine", "ejs");
app.use("/", recipeRouter);

app.listen(port, () => console.log(`Listening on ${port} port`));
