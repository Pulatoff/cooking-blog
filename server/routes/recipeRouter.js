const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");

router.get("/", recipeController.homepage);
router.get("/category", recipeController.category);
router.get("/category/:id", recipeController.categoryById);
router.get("/recipe/:id", recipeController.recipe);
router.post("/search", recipeController.search);
module.exports = router;
