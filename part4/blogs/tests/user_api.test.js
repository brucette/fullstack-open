// const supertest = require('supertest')
// const app = require('../app')
// const api = supertest(app)
// const assert = require('node:assert')
const { describe, test, beforeEach, after } = require('node:test')
const User = require('../models/user')
const helper = require('./test_helper')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const invalidUsers = [
  {
    condition: 'username is missing',
    user: { username: '', name: 'Tina', password: 'salainen' },
    errorMessage: 'Username is required',
  },
  {
    condition: 'password is too short',
    user: { username: 'tinity', name: 'Tina', password: 'sa' },
    errorMessage: 'password must be at least 3 characters long',
  },
  {
    condition: 'name is too long',
    user: {
      username: 'tinity',
      name: 'this name is too long',
      password: 'salainen',
    },
    errorMessage: 'User validation failed:',
  },
  {
    condition: 'username already taken',
    user: { username: 'root', name: 'Superuser', password: 'salainen' },
    errorMessage: 'expected `username` to be unique',
  },
]

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekrette', 10)
    const user = new User({ username: 'root', name: 'rootity', passwordHash })

    await user.save()
  })

  describe('creating a user', () => {

    invalidUsers.forEach((u) => {
      test(`fails with proper statuscode and message if ${u.condition}`, async () => {
        await helper.expectAddInvalidUserToFail(u.user, u.errorMessage)
      })
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
