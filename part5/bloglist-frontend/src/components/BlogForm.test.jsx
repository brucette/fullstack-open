import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> calls event handler it receives with the right details', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const newBlog = {
    title: 'Find the promise land3',
    author: 'Holy Landis',
    url: 'https://example.com/blog/promise-land3',
  }
    
  await user.type(screen.getByLabelText('title:'), newBlog.title)
  await user.type(screen.getByLabelText('author:'), newBlog.author)
  await user.type(screen.getByLabelText('url:'), newBlog.url)
  
  const createButton = screen.getByText('create')
  await user.click(createButton)

  expect(createBlog.mock.calls[0][0]).toEqual(newBlog)
})
