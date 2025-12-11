const assert = require('node:assert')
const { test, beforeEach, after, describe } = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

describe('when there is initially some blogs saved', () => {
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

  describe('addition of a new blog', () => {
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
      const savedBlog = blogsAtEnd.find((b) => b.title === newBlog.title)

      assert.strictEqual(savedBlog.likes, 0)
    })

    test('respond with 400 bad request if title missing', async () => {
      const blogWithoutTitle = {
        author: 'Tina Bruce',
        url: 'https://example.com/blog/fullstacking-is-hard',
        likes: 45,
      }

      await api.post('/api/blogs').send(blogWithoutTitle).expect(400)
    })

    test('respond with 400 bad request if url missing', async () => {
      const blogWithoutUrl = {
        title: 'Fullstacking is hard',
        author: 'Tina Bruce',
        likes: 45,
      }

      await api.post('/api/blogs').send(blogWithoutUrl).expect(400)
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with statuscode 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      const ids = blogsAtEnd.map((b) => b.id)

      assert.strictEqual(blogsAtEnd.length, helper.initalBlogs.length - 1)
      assert(!ids.includes(blogToDelete.id))
    })

    test('fails with status code 400 if invalid id', async () => {
      const invalidId = '5a3d5da59070081a82a3445'
      await api.delete(`/api/blogs/${invalidId}`).expect(400)
    })
  })

  describe('updating a blog', () => {
    test('updates the number of likes successfully', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const updatedBlog = { ...blogToUpdate, likes: 12 }

      const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)

      assert.deepStrictEqual(response.body, updatedBlog)
    })

    test('fails with a status code 404 if blog does not exist', async () => {
      const validNonExistingId = await helper.nonExistingId()
      await api.put(`/api/blogs/${validNonExistingId}`).expect(404)
    })
  })
})

after(async () => await mongoose.connection.close())
