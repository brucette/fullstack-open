const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const blogsMany = [
  {
    title: "Node Streams",
    author: "Michael Reyes",
    url: "https://example.com/blog/nodejs-streams",
    likes: 20
  },
  {
    title: "Tailwind CSS",
    author: "Emily Carter",
    url: "https://example.com/blog/tailwind-styling",
    likes: 20
  },
  {
    title: "REST APIs",
    author: "Daniel Kim",
    url: "https://example.com/blog/express-mongo-api",
    likes: 15
  },
  {
    title: "SQL basics",
    author: "Michael Reyes",
    url: "https://example.com/blog/sql",
    likes: 18
  }
]

const blogsOne = [
  { 
    title: "Node Testing",
    author: "Tina Bruce",
    url: "https://example.com/blog/node-testing",
    likes: 50
  }
]

const blogsEmpty = []

test('dummy returns one', () => {
  const result = listHelper.dummy(blogsEmpty)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of a bigger list is calculated right', () => {
    const expected = 73
    const result = listHelper.totalLikes(blogsMany)
    assert.strictEqual(result, expected)
  })

  test('of empty list of blogs is zero', () => {
    const result = listHelper.totalLikes(blogsEmpty)
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(blogsOne)
    assert.strictEqual(result, blogsOne[0].likes)
  })
})

describe('favourite blog', () => { 
  test('of a list is calculated correctly', () => { 
    const favorite =  blogsMany[0]
    const result = listHelper.favoriteBlog(blogsMany)
    assert.deepStrictEqual(result, favorite)
  })

  test('of empty list returns null', () => { 
    const result = listHelper.favoriteBlog(blogsEmpty)
    assert.strictEqual(result, null)
  })

  test('of a single blog returns that blog', () => {
    const result = listHelper.favoriteBlog(blogsOne)
    assert.deepStrictEqual(result, blogsOne[0])
  })
})

describe('most blogs', () => { 
  test('of a list returns the correct author and number of blogs', () => { 
    const result = listHelper.mostBlogs(blogsMany)
    assert.deepStrictEqual(result, { author: 'Michael Reyes', blogs: 2 })
  })

  test('empty list of blogs returns an empty object', () => { 
    const result = listHelper.mostBlogs(blogsEmpty)
    assert.deepStrictEqual(result, {})  
  })

  test('list of one blog returns that author', () => {
    const result = listHelper.mostBlogs(blogsOne)
    assert.deepStrictEqual(result, { author: "Tina Bruce", blogs: 1 })
  })
})

describe('most likes', () => { 
  test('of a list returns the correct author and number of likes', () => {
    const result = listHelper.mostLikes(blogsMany)
    assert.deepStrictEqual(result, { author: "Michael Reyes", likes: 38 })
  })

  test('empty list of blogs returns an empty object', () => { 
    const result = listHelper.mostLikes(blogsEmpty)
    assert.deepStrictEqual(result, {})  
  })

  test('list of one blog returns that author', () => {
    const result = listHelper.mostLikes(blogsOne)
    assert.deepStrictEqual(result, { author: "Tina Bruce", likes: 50 })
  })
})
