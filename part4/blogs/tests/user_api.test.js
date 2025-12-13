// const supertest = require('supertest')
// const app = require('../app')
// const api = supertest(app)
const { describe, test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const User = require('../models/user')
const helper = require('./test_helper')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekrette', 10)
    const user = new User({ username: 'root', name: 'rootity', passwordHash })

    await user.save()
  })

  describe('creating a user', () => {
    test('fails with proper statuscode and message if username is missing', async () => {
      const result = await helper.expectCreationToFail({
        username: '',
        name: 'Tina',
        password: 'salainen',
      })
      assert(result.body.error.includes('Username is required'))
    })

    test('fails with proper statuscode and message if password is too short', async () => {
      const result = await helper.expectCreationToFail({
        username: 'tinity',
        name: 'Tina',
        password: 'sa',
      })
      assert(
        result.body.error.includes(
          'password must be at least 3 characters long'
        )
      )
    })

    test('fails with proper statuscode and message if name is too long', async () => {
      const result = await helper.expectCreationToFail({
        username: 'tinity',
        name: 'this name consists too many characters',
        password: 'salainen',
      })
      assert(result.body.error.includes('User validation failed:'))
    })

    test('fails with proper statuscode and message if username already taken', async () => {
      const result = await helper.expectCreationToFail({
        username: 'root',
        name: 'Superuser',
        password: 'salainen',
      })
      assert(result.body.error.includes('expected `username` to be unique'))
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
