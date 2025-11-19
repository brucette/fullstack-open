import { useState } from 'react'

function App() {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const addPerson = (e) => {
    e.preventDefault()
    const personObject = {
      name: newName
    }

    const isAlreadyAdded = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
    
    if (isAlreadyAdded) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons([...persons, personObject])
      setNewName('')
    }
  }

  return (
      <div>
        <h2>Phonebook</h2>
        <form onSubmit={addPerson}>
          <div>
            name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        <div>
          {persons.map(person => 
            <p key={person.name}>{person.name}</p>
          )}
        </div>
      </div>
  );
}

export default App;
