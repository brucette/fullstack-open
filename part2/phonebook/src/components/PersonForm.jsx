const PersonForm = ({ 
  onSubmit, 
  name, 
  onNameChange, 
  number, 
  onNumberChange, 
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name:{" "}
        <input 
          style={{ width: "30%" }}
          value={name} 
          onChange={(e) => onNameChange(e.target.value)} />
      </div>
      <div>
        number:{" "}
        <input
          style={{ width: "30%" }}
          type="tel"
          value={number}
          placeholder="e.g. 09-1234556 or 040-22334455"
          onChange={(e) => onNumberChange(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
