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

after(async () => await mongoose.connection.close())
