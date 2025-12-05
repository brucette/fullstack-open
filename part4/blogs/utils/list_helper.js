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

const mostBlogs = (blogs) => { 
  if (blogs.length === 0) return {}

  const counts = blogs.reduce((counts, blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + 1
    return counts
  }, {})

  const [author, blogsCount] = Object.entries(counts).reduce((max, entry) => {
    return entry[1] > max[1] ? entry : max
  })

  return { author, blogs: blogsCount }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {}

  const counts = blogs.reduce((counts, blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + blog.likes
    return counts
  }, {})
  
  const [author, likes] = Object.entries(counts).reduce((max, entry) => {
    return entry[1] > max[1] ? entry : max
  })

  return { author, likes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}