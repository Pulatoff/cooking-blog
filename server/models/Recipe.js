const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  ingredients: {
    type: Array,
    required: true,
  },
  category: {
    type: String,
    enum: ["American", "Indian", "Thai", "Mexican", "Chinese"],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

Schema.index({ name: "text", description: "text" });
module.exports = mongoose.model("Recipe", Schema);
