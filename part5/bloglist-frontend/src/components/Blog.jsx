import { useState } from 'react'

const Blog = ({ blog }) => {
  const [details, setDetails] = useState(false)
  const [label, setLabel] = useState('view')

  const blogStyle = {
    padding: 8,
    paddingLeft: 5,
    border: '1px solid #c0c0c0', 
    borderRadius: '6px',            
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    marginBottom: 5,
  }

  const displayDetails = {
    display: details ? 'flex' : 'none',
    flexDirection: 'column',
    backgroundColor: '#e0f7ff',
    border: '1px solid transparent',
    borderRadius: '8px',
    padding: 5,
    marginTop: 5,
  }

  const toggleView = () => {
    setLabel(label === 'view' ? 'hide' : 'view')
    setDetails((prev) => !prev)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}, <i>{blog.author}</i>
        <span>
          {' '}
          <button onClick={toggleView}>{label}</button>
        </span>
      </div>
      <div style={displayDetails}>
        <a href={blog.url}>{blog.url}</a>
        <p>
          likes {blog.likes} <button onClick={{}}>like</button>
        </p>
        <span>{blog.user.name}</span>
      </div>
    </div>
  )
}

export default Blog
