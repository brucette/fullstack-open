const Blog = require('../models/blog')

const initalBlogs = [
  {
    title: 'A Practical Introduction to Node.js Streams',
    author: 'Michael Reyes',
    url: 'https://example.com/blog/nodejs-streams',
    likes: 0,
  },
  {
    title: 'Building REST APIs with Express and MongoDB',
    author: 'Daniel Kim',
    url: 'https://example.com/blog/express-mongo-api',
    likes: 8,
  },

]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((b) => b.toJSON())
}

module.exports = {
  blogsInDb,
  initalBlogs
}
