const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title of blog is required'],
    minLength: 3
  },
  author: {
    type: String,
    required: [true, 'Author name is required'],
    minLength: 4
  },
  url: {
    type: String,
    required: [true, 'Url is required'],
  },
  likes: {
    type: Number,
    default: 0
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)