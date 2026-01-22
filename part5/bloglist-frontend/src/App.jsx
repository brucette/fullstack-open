import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('Login failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const createBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.create(blogObject)
      setBlogs([...blogs, blog])
      setSuccessMessage(`Blog ${blog.title} by ${blog.author} created`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch {
      setErrorMessage('Failed to create new blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  return (
    <>
      {errorMessage && (
        <Notification type='error' message={errorMessage} />
      )}
      {successMessage && (
        <Notification type='success' message={successMessage} />
      )}
      {!user && (
        <>
          <h2>Log in to application</h2>
          <LoginForm
            handleLogin={handleLogin}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        </>
      )}
      {user && (
        <>
          <span style={{ color: 'darkblue' }}>
            <span> {user.name} logged in </span>
            <button style={{ color: 'darkblue', borderRadius: '80px', padding: '0.5rem' }} onClick={logout}>
              Logout
            </button>
          </span>
          <div>
            <h2>blogs</h2>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
            <br />
            <Togglable buttonLabel='create new blog' ref={blogFormRef}>
              <BlogForm createBlog={createBlog} />
            </Togglable>
          </div>
        </>
      )}
    </>
  )
}

export default App
