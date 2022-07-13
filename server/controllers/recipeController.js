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

exports.submit = async (req, res) => {
  try {
    const infoErrorsObj = req.flash("infoErrors");
    const infoSubmitObj = req.flash("infoSubmit");
    res.render("submit-recipe", {
      title: "Cooking blog - add recipe",
      infoErrorsObj,
      infoSubmitObj,
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.submitRecipeOnPost = async (req, res) => {
  try {
    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if (!req.files || Object.keys(req.files).length === 0) {
      console.log("No Files where uploaded.");
    } else {
      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;

      uploadPath =
        require("path").resolve("./") + "/public/uploads/" + newImageName;

      imageUploadFile.mv(uploadPath, function (err) {
        if (err) return res.satus(500).send(err);
      });
    }

    const newRecipe = new Recipe({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      ingredients: req.body.ingredients,
      category: req.body.category,
      image: newImageName,
    });

    await newRecipe.save();

    req.flash("infoSubmit", "Recipe has been added.");
    res.redirect("/submit");
  } catch (error) {
    // res.json(error);
    req.flash("infoErrors", error);
    res.redirect("/submit-recipe");
  }
};
