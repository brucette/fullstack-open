const PersonForm = ({ 
  onSubmit, 
  name, 
  onNameChange, 
  number, 
  onNumberChange, 
  formatPhoneNumber 
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name:{" "}
        <input 
          value={name} 
          onChange={(e) => onNameChange(e.target.value)} />
      </div>
      <div>
        number:{" "}
        <input
          type="tel"
          value={number}
          onChange={(e) => onNumberChange(formatPhoneNumber(e.target.value))}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
