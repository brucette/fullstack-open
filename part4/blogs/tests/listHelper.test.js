const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const blogsMany = [
  {
    title: 'Node Streams',
    author: 'Michael Reyes',
    url: 'https://example.com/blog/nodejs-streams',
    likes: 20,
  },
  {
    title: 'Tailwind CSS',
    author: 'Emily Carter',
    url: 'https://example.com/blog/tailwind-styling',
    likes: 20,
  },
  {
    title: 'REST APIs',
    author: 'Daniel Kim',
    url: 'https://example.com/blog/express-mongo-api',
    likes: 15,
  },
  {
    title: 'SQL basics',
    author: 'Michael Reyes',
    url: 'https://example.com/blog/sql',
    likes: 18,
  },
]

const blogsOne = [
  {
    title: 'Node Testing',
    author: 'Tina Bruce',
    url: 'https://example.com/blog/node-testing',
    likes: 50,
  },
]

const blogsEmpty = []

test('dummy returns one', () => {
  const result = listHelper.dummy(blogsEmpty)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const totalLikesCases = [
    {
      name: 'of a bigger list is calculated right',
      blogs: blogsMany,
      expected: 73,
    },
    { name: 'of empty list of blogs is zero',
      blogs: blogsEmpty,
      expected: 0 
    },
    {
      name: 'when list has only one blog equals the likes of that',
      blogs: blogsOne,
      expected: blogsOne[0].likes,
    },
  ]

  totalLikesCases.forEach(({ name, blogs, expected }) => {
    test(name, () => {
      const result = listHelper.totalLikes(blogs)
      assert.strictEqual(result, expected)
    })
  })
})

describe('favourite blog', () => {
  const favouriteBlogCases = [
    {
      name: 'of a list is calculated correctly',
      blogs: blogsMany,
      expected: blogsMany[0],
    },
    {
      name: 'of a single blog returns that blog',
      blogs: blogsOne,
      expected: blogsOne[0],
    },
  ]

  favouriteBlogCases.forEach(({ name, blogs, expected }) => {
    test(name, () => {
      const result = listHelper.favoriteBlog(blogs)
      assert.deepStrictEqual(result, expected)
    })
  })

  test('of empty list returns null', () => {
    const result = listHelper.favoriteBlog(blogsEmpty)
    assert.strictEqual(result, null)
  })
})

describe('most blogs', () => {
  const mostBlogsCases = [
    {
      name: 'of a list returns the correct author and number of blogs',
      blogs: blogsMany,
      expected: { author: 'Michael Reyes', blogs: 2 },
    },
    {
      name: 'empty list of blogs returns an empty object',
      blogs: blogsEmpty,
      expected: {},
    },
    {
      name: 'list of one blog returns that author',
      blogs: blogsOne,
      expected: { author: 'Tina Bruce', blogs: 1 },
    },
  ]

  mostBlogsCases.forEach(({ name, blogs, expected }) => {
    test(name, () => {
      const result = listHelper.mostBlogs(blogs)
      assert.deepStrictEqual(result, expected)
    })
  })
})

describe('most likes', () => {
  const mostLikesCases = [
    {
      name: 'of a list returns the correct author and number of likes',
      blogs: blogsMany,
      expected: { author: 'Michael Reyes', likes: 38 },
    },
    {
      name: 'empty list of blogs returns an empty object',
      blogs: blogsEmpty,
      expected: {},
    },
    {
      name: 'list of one blog returns that author',
      blogs: blogsOne,
      expected: { author: 'Tina Bruce', likes: 50 },
    },
  ]

  mostLikesCases.forEach(({ name, blogs, expected }) => {
    test(name, () => {
      const result = listHelper.mostLikes(blogs)
      assert.deepStrictEqual(result, expected)
    })
  })
})
