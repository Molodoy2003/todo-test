const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
})

module.exports = mongoose.model('Todo', TodoSchema)
