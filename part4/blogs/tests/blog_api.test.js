const assert = require('node:assert')
const { test, beforeEach, after, describe, before } = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

const api = supertest(app)

let token
let userId
describe('when there is initially some blogs saved', () => {
  before(async () => {
    const username = 'tokenTestUser'
    const name = 'tokenitis'
    const password = 'sekrette'
    await User.deleteOne({ username })

    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({ username, name, passwordHash })
    await user.save()

    const result = await api.post('/api/login').send({ username, password })
    token = result.body.token

    const createdUser = await User.findOne({ username })
    userId = createdUser._id
  })

  beforeEach(async () => {
    await Blog.deleteMany({})
    const manyBlogs = helper.initalBlogs.map((b) => ({ ...b, user: userId }))
    await Blog.insertMany(manyBlogs)
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
        .set('authorization', `Bearer ${token}`)
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

    test('respond with 401 if not authenticated', async () => {
      const newBlog = {
        title: 'Introduction to GraphQL for Beginners',
        author: 'James Wilson',
        url: 'https://example.com/blog/graphql-intro',
        likes: 0,
      }

      await api.post('/api/blogs').send(newBlog).expect(401)
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initalBlogs.length)
    })

    test('likes defaults to 0 if missing', async () => {
      const newBlog = {
        title: 'Deploying Node.js Apps to Heroku',
        author: 'Sophia Lee',
        url: 'https://example.com/blog/nodejs-heroku-deploy',
      }

      await api
        .post('/api/blogs')
        .set('authorization', `Bearer ${token}`)
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

      await api
        .post('/api/blogs')
        .set('authorization', `Bearer ${token}`)
        .send(blogWithoutTitle)
        .expect(400)
    })

    test('respond with 400 bad request if url missing', async () => {
      const blogWithoutUrl = {
        title: 'Fullstacking is hard',
        author: 'Tina Bruce',
        likes: 45,
      }

      await api
        .post('/api/blogs')
        .send(blogWithoutUrl)
        .set('authorization', `Bearer ${token}`)
        .expect(400)
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with statuscode 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      const ids = blogsAtEnd.map((b) => b.id)

      assert.strictEqual(blogsAtEnd.length, helper.initalBlogs.length - 1)
      assert(!ids.includes(blogToDelete.id))
    })

    test('fails with status code 400 if invalid id', async () => {
      const invalidId = '5a3d5da59070081a82a3445'
      await api
        .delete(`/api/blogs/${invalidId}`)
        .set('authorization', `Bearer ${token}`)
        .expect(400)
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

      assert.deepStrictEqual(
        {
          id: response.body.id,
          likes: response.body.likes,
        },
        {
          id: updatedBlog.id,
          likes: updatedBlog.likes,
        }
      )
    })

    test('fails with a status code 404 if blog does not exist', async () => {
      const validNonExistingId = await helper.nonExistingId()
      await api.put(`/api/blogs/${validNonExistingId}`).expect(404)
    })
  })
})

after(async () => await mongoose.connection.close())
