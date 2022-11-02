// dependencies
const express = require('express')
const comment = express.Router()
const Comment = require('../models/comments.js')

//index
comment.get('/', (req, res) => {
    Comment.find()
    .populate('comment')
    .then(foundComment => {
        res.send(foundComment)
    })
})
// show 
comment.get('/:id', (req, res) => {
    Comment.findById(req.params.id)
        .populate({
            path: 'comments',
            options: { limit: 5 }
        })
        .then(foundComment => {
            res.render('commentShow', {
                comment: foundComment
            })
        })
})
// delete
comment.delete('/:id', (req, res) => {
    Comment.findByIdAndDelete(req.params.id) 
      .then(deletedComment => { 
        res.status(303).redirect('/comments')
      })
})
// export
module.exports = comment                    
