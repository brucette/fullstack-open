const assert = require('node:assert')
const { test, beforeEach, after } = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initalBlogs)
})

test('all blogs are returned and in json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, helper.initalBlogs.length)
})

test('blog id is named id and not _id', async () => {
  const response = await api.get('/api/blogs')
  const blog = response.body[0]

  assert(blog.id)
  assert.strictEqual(blog._id, undefined)
})

test('a valid blog is added successfully', async () => {
  const newBlog = {
    title: 'Introduction to GraphQL for Beginners',
    author: 'James Wilson',
    url: 'https://example.com/blog/graphql-intro',
    likes: 0,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initalBlogs.length + 1)

  const savedBlog = blogsAtEnd.find((b) => b.title === newBlog.title)
  assert.deepStrictEqual(
    {
      title: savedBlog.title,
      author: savedBlog.author,
      url: savedBlog.url,
      likes: savedBlog.likes,
    },
    newBlog
  )
})

test('likes defaults to 0 if missing', async () => {
  const newBlog = {
    title: 'Deploying Node.js Apps to Heroku',
    author: 'Sophia Lee',
    url: 'https://example.com/blog/nodejs-heroku-deploy',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const savedBlog = blogsAtEnd.find(b => b.title === newBlog.title)

  assert.strictEqual(savedBlog.likes, 0)
})

after(async () => await mongoose.connection.close())
