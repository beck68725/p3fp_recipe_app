// dependencies
const mongoose = require('mongoose')
const { Schema } = mongoose
const recipes = require('./recipes')

// schema
const commentSchema = new Schema({
    name: {
        type: String,
        required: true,
        enum: ['Rachel', 'Monica', 'Joey', 'Chandler', 'Ross', 'Phoebe']
    }, 
    startDate: {
        type: Date,
        required: true
    },
    bio: String   
},{ toJSON: { virtuals: true }})

//virtuals
commentSchema.virtual('breads', {
    ref: 'Bread',
    localField: '_id',
    foreignField: 'baker'
})

// hooks 
commentSchema.post('findOneAndDelete', function() {
    Comment.deleteMany({ recipe: this._conditions._id })
        .then(deleteStatus => {
            console.log(deleteStatus)
        })
  })
  

// model and export
const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment
