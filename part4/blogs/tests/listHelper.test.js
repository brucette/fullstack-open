const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of a bigger list is calculated right', () => {
    const listWithManyBlog = [
      {
        title: "Node Streams",
        author: "Michael Reyes",
        url: "https://example.com/blog/nodejs-streams",
        likes: 12
      },
      {
        title: "Tailwind CSS",
        author: "Emily Carter",
        url: "https://example.com/blog/tailwind-styling",
        likes: 8
      },
      {
        title: "REST APIs",
        author: "Daniel Kim",
        url: "https://example.com/blog/express-mongo-api",
        likes: 15
      }
    ]
    const result = listHelper.totalLikes(listWithManyBlog)
    assert.strictEqual(result, 35)
  })

  test('of empty list of blogs is zero', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const listWithOneBlog = [
      {
        title: "Node Streams",
        author: "Michael Reyes",
        url: "https://example.com/blog/nodejs-streams",
        likes: 12
      }
    ]
    assert.strictEqual(listHelper.totalLikes(listWithOneBlog), 12)
  })
})
