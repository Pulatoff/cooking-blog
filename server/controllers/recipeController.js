require("../models/database");
const Category = require("../models/Categories");

exports.homepage = async (req, res) => {
  try {
    const category = await Category.find({}).limit(5);
    res.render("index", { title: "Cooking blog - homepage", category });
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

// async function insertMany() {
//   try {
//     await category.insertMany([
//       { name: "American", img: "american-food.jpg" },
//       { name: "Indian", img: "indian-food.jpg" },
//       { name: "Mexican", img: "mexican-food.jpg" },
//       { name: "Spanish", img: "spanish-food.jpg" },
//       { name: "Thai", img: "thai-food.jpg" },
//       { name: "Chinese", img: "chinese-food.jpg" },
//     ]);
//   } catch (error) {
//     console.log("err:" + error.message);
//   }
// }

// insertMany();
