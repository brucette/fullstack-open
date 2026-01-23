const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

const userExtractor = middleware.userExtractor


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body
  const user = request.user

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = [...user.blogs, savedBlog]
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  if (blog.user.toString !== user._id.toString) {
    return response.status(403).json({ error: 'unauthorized' })
  }

  await Blog.findByIdAndDelete(blog._id)
  user.blogs = user.blogs.filter(b => b.toString() !== blog._id.toString())
  await user.save()

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes, user } = request.body

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).end()
  }

  blog.title = title
  blog.author = author
  blog.url = url
  blog.likes = likes
  blog.user = user

  const updatedBlog = await blog.save()
  const populatedBlog = await updatedBlog.populate('user', { username: 1, name: 1 })
  response.json(populatedBlog)
})

module.exports = blogsRouter
