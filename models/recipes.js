// require mongoose 
const mongoose = require('mongoose')
// creating shorthand for the Schema constructor 
const { Schema } = mongoose 

const recipeSchema = new Schema({
  name: { type: String, required: true },
  hasGluten: Boolean,
  image: { type: String, default: 'http://placehold.it/500x500.png' },
  recipeDetails: {type: String, required: true},
  Comment: {
    type: Schema.Types.ObjectID,
    ref: 'Comment'
  }
})

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe
