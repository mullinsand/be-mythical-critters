class Witch {
  constructor(name) {
    this.name = name;
    this.pantry = {};
    this.recipes = [];
    this.potions = {}
  }

  collect(item, amount) {
    if (item in this.pantry === true) {
      this.pantry[item] += amount;
    }
    else {
      this.pantry[item] = amount;
    }
  }
  
  learnRecipe(recipe) {
    for(var i=0; i < this.recipes.length; i++) {
      if(recipe === this.recipes[i]) return `Already know: ${recipe.name}`
    }
    this.recipes.push(recipe)
    return `Learned: ${recipe.name}`
  }

  brewPotion(recipe) {
    // check if the recipe is known to the witch
    var recipeNames = []
    this.recipes.map(addNames);

    function addNames(recipe) {
      recipeNames.push(recipe.name)
    }
    if (recipeNames.includes(recipe.name) == false) return `Don't know recipe: ${recipe.name}`
    // checks if pantry has all ingredients of the correct amount
    var needs = {}
    for(const key in recipe.ingredients) {
      if (this.pantry[key] === undefined) {
        needs[key] = recipe.ingredients[key]
      } else if (this.pantry[key] < recipe.ingredients[key]) {
        needs[key] = recipe.ingredients[key] - this.pantry[key]
      }
    }
    if (Object.keys(needs).length == 0) {
      for(const key in recipe.ingredients) {
        this.pantry[key] = this.pantry[key] - recipe.ingredients[key]
      }
      this.potions[recipe.name] === undefined ? this.potions[recipe.name] = 1 : this.potions[recipe.name]++
      return `Brewed 1 ${recipe.name}`
    } else {
      let combinedNeeds = Object.keys(needs).reduce(combineIngredients, "")
      function combineIngredients(total, need) {
        var text = ` (${needs[need]} ${need})`
        return total.concat(text)
      }
      return `Not enough ingredients. Need:${combinedNeeds}`
    }
  }
}

module.exports = Witch;