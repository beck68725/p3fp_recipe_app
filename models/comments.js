// dependencies
const mongoose = require('mongoose')
const { Schema } = mongoose
const recipes = require('./recipes')

// schema
const commentSchema = new Schema({
    name: {
        type: String,
        required: true,
    }, 
    commentDate: {
        type: Date,
        required: true
    },
    comment: String   
},{ toJSON: { virtuals: true }})

// hooks 
commentSchema.post('findOneAndDelete', function() {
    Comment.deleteMany({ recipes: this._conditions._id })
        .then(deleteStatus => {
            console.log(deleteStatus)
        })
  })
  

// model and export
const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment
