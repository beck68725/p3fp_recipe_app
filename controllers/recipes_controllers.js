//dependencies
const express = require('express')
const recipe = express.Router()
const Recipe = require('../models/recipes.js')
const Comment = require('../models/comments.js')

// INDEX
recipe.get('/', async (req, res) => {
  const foundRecipe = await Comment.find().lean()
  const foundComment = await Recipe.find().limit(10)
  res.render('index', {
    recipe: foundRecipe,
    comment: foundComment,
    title: 'Index Page'
  })
})

// NEW
recipe.get('/new', (req, res) => {
  Comment.find()
  .then(foundComment => {
    res.render('new', {
      comment: foundComment
    })
  })
})

// EDIT
recipe.get('/:id/edit', (req, res) => {
  Comment.find()
  .then(foundBakers => {
    Recipe.findById(req.params.id) 
      .then(foundBread => { 
        res.render('edit', {
          recipe: foundRecipe,
          comment: foundComment
        })
      })
  })
})


// SHOW
recipe.get('/:id', (req, res) => {
  Recipe.findById(req.params.id)
      .populate('baker')
      .then(foundBread => {
        const bakedBy = foundRecipe.getBakedBy()
        console.log(bakedBy)
          res.render('show', {
              recipe: foundRecipe
          })
      })
      .catch(eff => {
        res.send('404')
      })
})

// CREATE
recipe.post('/', (req, res) => {
  if(!req.body.image) {
      req.body.image = undefined 
  }
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.create(req.body)
  res.redirect('/breads')
})



// DELETE
breads.delete('/:id', (req, res) => {
  Bread.findByIdAndDelete(req.params.id) 
    .then(deletedBread => { 
      res.status(303).redirect('/breads')
    })
})

// UPDATE
breads.put('/:id', (req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.findByIdAndUpdate(req.params.id, req.body, { new: true }) 
    .then(updatedBread => {
      console.log(updatedBread) 
      res.redirect(`/breads/${req.params.id}`) 
    })
})


module.exports = recipe
