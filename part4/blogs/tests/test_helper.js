const Blog = require('../models/blog')
const User = require('../models/user')
const app = require('../app')
const supertest = require('supertest')
const assert = require('node:assert')

const api = supertest(app)

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

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'Fullstacking is hard',
    author: 'Tina Bruce',
    url: 'https://example.com/blog/full-stacking-hard',
  })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((b) => b.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

const expectCreationToFail = async (newUser) => {
  const usersAtStart = await usersInDb()

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await usersInDb()
  assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  return result
}

module.exports = {
  blogsInDb,
  initalBlogs,
  nonExistingId,
  usersInDb,
  expectCreationToFail
}
