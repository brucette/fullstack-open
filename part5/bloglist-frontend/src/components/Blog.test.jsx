import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author, but not URL or likes by default', () => {
  const blog = {
    title: 'Find the promise land3',
    author: 'Holy Landis',
    url: 'https://example.com/blog/promise-land3',
    likes: 0
  }

  render(<Blog blog={blog} />)

  const title = screen.getByText('Find the promise land3', { exact : false})
  const author = screen.getByText('Holy Landis')
  const url = screen.getByText('https://example.com/blog/promise-land3')
  const likes = screen.getByText('likes', { exact : false})
  
  expect(title).toBeVisible()
  expect(author).toBeVisible()
  expect(url).not.toBeVisible()
  expect(likes).not.toBeVisible()
})
