const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? null
    : blogs.reduce((max, blog) => {
      return blog.likes > max.likes ? blog : max
    }, blogs[0])
}
const countByAuthor = (blogs, getIncrementValue = () => 1) => {
  return blogs.reduce((counts, blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + getIncrementValue(blog)
    return counts
  }, {})
}

const maxEntry = (countsObj) => {
  return Object.entries(countsObj).reduce((max, entry) => {
    return entry[1] > max[1] ? entry : max
  })
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {}
  const counts = countByAuthor(blogs)
  const [author, blogsCount] = maxEntry(counts)
  return { author, blogs: blogsCount }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {}
  const counts = countByAuthor(blogs, b => b.likes)
  const [author, likes] = maxEntry(counts)
  return { author, likes }
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}