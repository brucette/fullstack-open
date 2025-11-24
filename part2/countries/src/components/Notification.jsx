
const Notification = ({ message }) => {
  if (message === null) return null

  return (
    <h2 style={{ color: "red"}}>{message}</h2>
  )
}

export default Notification