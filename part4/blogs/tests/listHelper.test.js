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
    const listWithManyBlogs = [
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
    const result = listHelper.totalLikes(listWithManyBlogs)
    assert.strictEqual(result, 35)
  })

  test('of empty list of blogs is zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
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
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 12)
  })
})

describe('favourite blog', () => { 
  test('of a list is calculated correctly', () => { 
    const listWithManyBlogs = [
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
      }
    ]
    const favorite =  {
      title: "Node Streams",
      author: "Michael Reyes",
      url: "https://example.com/blog/nodejs-streams",
      likes: 20
    }
    const result = listHelper.favoriteBlog(listWithManyBlogs)
    assert.deepStrictEqual(result, favorite)
  })

  test('of empty list returns null', () => { 
    const result = listHelper.favoriteBlog([])
    assert.strictEqual(result, null)
  })

  test('of a single blog returns that blog', () => {
    const blogs = [
      { 
        title: "Node Streams",
        author: "Michael Reyes",
        url: "https://example.com/blog/nodejs-streams",
        likes: 20
      }
    ]
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, blogs[0])
  })
})

describe('most blogs', () => { 
  test('of a list returns the correct author and number of blogs', () => {
    const listWithManyBlogs = [
      {
        title: "Node Streams",
        author: "Michael Reyes",
        url: "https://example.com/blog/nodejs-streams",
        likes: 20
      },
      {
        title: "Tailwind CSS",
        author: "Michael Reyes",
        url: "https://example.com/blog/tailwind-styling",
        likes: 20
      },
      {
        title: "REST APIs",
        author: "Daniel Kim",
        url: "https://example.com/blog/express-mongo-api",
        likes: 15
      }
    ] 
    const result = listHelper.mostBlogs(listWithManyBlogs)
    assert.deepStrictEqual(result, { author: 'Michael Reyes', blogs: 2 })
  })

  test('empty list of blogs returns an empty object', () => { 
    const result = listHelper.mostBlogs([])
    assert.deepStrictEqual(result, {})  
  })

  test('list of one blog returns that author', () => {
    const result = listHelper.mostBlogs([{
      title: "Node Streams",
      author: "Michael Reyes",
      url: "https://example.com/blog/nodejs-streams",
      likes: 20
    }])

    assert.deepStrictEqual(result, { author: "Michael Reyes", blogs: 1 })
  })
})

describe('most likes', () => { 
  test('of a list returns the correct author and number of likes', () => {
    const listWithManyBlogs = [
      {
        title: "Node Streams",
        author: "Michael Reyes",
        url: "https://example.com/blog/nodejs-streams",
        likes: 20
      },
      {
        title: "Tailwind CSS",
        author: "Michael Reyes",
        url: "https://example.com/blog/tailwind-styling",
        likes: 20
      },
      {
        title: "REST APIs",
        author: "Daniel Kim",
        url: "https://example.com/blog/express-mongo-api",
        likes: 15
      }
    ]
    const result = listHelper.mostLikes(listWithManyBlogs)
    assert.deepStrictEqual(result, { author: "Michael Reyes", likes: 40 })
  })

  test('empty list of blogs returns an empty object', () => { 
    const result = listHelper.mostLikes([])
    assert.deepStrictEqual(result, {})  
  })

  test('list of one blog returns that author', () => {
    const result = listHelper.mostLikes([{
      title: "Node Streams",
      author: "Michael Reyes",
      url: "https://example.com/blog/nodejs-streams",
      likes: 20
    }])

    assert.deepStrictEqual(result, { author: "Michael Reyes", likes: 20 })
  })
})
