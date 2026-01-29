import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Find the promise land3',
  author: 'Holy Landis',
  url: 'https://example.com/blog/promise-land3',
  likes: 0,
}

let user

describe('<Blog />', () => {
  beforeEach(() => {
    user = userEvent.setup()
  })

  test('renders title and author, but not URL or likes by default', () => {
    render(<Blog blog={blog} />)

    const title = screen.getByText('Find the promise land3', { exact: false })
    const author = screen.getByText('Holy Landis')
    const url = screen.queryByText('https://example.com/blog/promise-land3')
    const likes = screen.queryByText('likes', { exact: false })

    expect(title).toBeVisible()
    expect(author).toBeVisible()
    expect(url).not.toBeVisible()
    expect(likes).not.toBeVisible()
  })

  test('URL and likes rendered when view button clicked', async () => {
    render(<Blog blog={blog} />)

    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const url = screen.getByText('https://example.com/blog/promise-land3')
    const likes = screen.getByText('likes', { exact: false })

    expect(url).toBeVisible()
    expect(likes).toBeVisible()
  })

  test('clicking like twice calls event handler twice', async () => {
    const likeBlog = vi.fn()
    render(<Blog blog={blog} likeBlog={likeBlog}/>)

    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(likeBlog.mock.calls).toHaveLength(2)
  })
})
