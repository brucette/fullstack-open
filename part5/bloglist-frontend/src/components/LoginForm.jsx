
const LoginForm = ({ handleLogin, setUsername, setPassword }) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type='text'
              onChange={({ target }) => setUsername(target.value)}
              />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type='text'
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm
