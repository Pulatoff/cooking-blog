require("../models/database");
const Category = require("../models/Categories");
const Recipe = require("../models/Recipe");

exports.homepage = async (req, res) => {
  try {
    const category = await Category.find({}).limit(5);
    const latest = await Recipe.find({}).sort({ _id: -1 }).limit(5);
    const american = await Recipe.find({ category: "American" }).limit(5);
    const thai = await Recipe.find({ category: "Thai" }).limit(5);
    const chinese = await Recipe.find({ category: "Chinese" }).limit(5);
    const food = { latest, thai, american, chinese };

    res.render("index", { title: "Cooking blog - homepage", category, food });
  } catch (error) {
    res.status(500).send("message" + error.message);
  }
};

exports.category = async (req, res) => {
  try {
    const category = await Category.find({}).limit(20);
    res.render("category", { title: "Cooking blog - category", category });
  } catch (error) {
    res.status(500).send("message" + error.message);
  }
};

exports.categoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const categoryById = await Recipe.find({ category: categoryId });
    res.render("category", { title: "Cooking blog - category", categoryById });
  } catch (error) {
    res.status(500).send("message" + error.message);
  }
};

exports.recipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);
    res.render("recipe", { title: "Cooking blog - recipe", recipe });
  } catch (error) {
    res.status(500).send("message" + error.message);
  }
};

exports.search = async (req, res) => {
  try {
    const searchTerm = req.body.search;
    const recipe = await Recipe.find({
      $text: { $search: searchTerm, $diacriticSensitive: true },
    });
    res.render("search", { title: "Cooking blog - search results", recipe });
  } catch (err) {
    console.log(err.message);
  }
};
