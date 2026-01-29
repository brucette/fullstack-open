import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Find the promise land3',
  author: 'Holy Landis',
  url: 'https://example.com/blog/promise-land3',
  likes: 0,
}

describe('<Blog />', () => {
  beforeEach(() => {
    render(<Blog blog={blog} />)
  })

  test('renders title and author, but not URL or likes by default', () => {
    const title = screen.getByText('Find the promise land3', { exact: false })
    const author = screen.getByText('Holy Landis')
    const url = screen.getByText('https://example.com/blog/promise-land3')
    const likes = screen.getByText('likes', { exact: false })

    expect(title).toBeVisible()
    expect(author).toBeVisible()
    expect(url).not.toBeVisible()
    expect(likes).not.toBeVisible()
  })

  test('URL and likes rendered when view button clicked', async () => {
    const viewButton = screen.getByText('view')
    const user = userEvent.setup()
    await user.click(viewButton)

    const url = screen.getByText('https://example.com/blog/promise-land3')
    const likes = screen.getByText('likes', { exact: false })

    expect(url).toBeVisible()
    expect(likes).toBeVisible()
  })
})
