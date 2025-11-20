import { useState } from 'react'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const addPerson = (e) => {
    e.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    const isAlreadyAdded = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
    
    if (isAlreadyAdded) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons([...persons, personObject])
      setNewName('')
      setNewNumber('')
    }
  }

  const formatPhoneNumber = (input) => {
    return input.replace(/[^0-9+()\s-]/g, "");
  }

  const namesToShow = persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
      <div>
        <h2>Phonebook</h2>
        <div>
          search names with<input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <h2>Add a new person</h2>
        <form onSubmit={addPerson}>
          <div>
            name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
          </div>
          <div>
            number: <input type="tel" value={newNumber} onChange={(e) => setNewNumber(formatPhoneNumber(e.target.value))} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        <div>
          {namesToShow.map(person => 
            <p key={person.name}>{person.name} {person.number}</p>
          )}
        </div>
      </div>
  );
}

export default App;
