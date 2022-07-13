async function insertDymayRecipeData() {
  try {
    await Recipe.insertMany();
  } catch (err) {
    console.log(err);
  }
}
// insertDymayRecipeData();
