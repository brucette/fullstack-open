import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const addPerson = (e) => {
    e.preventDefault()

    const personObject = {
      name,
      number,
      id: persons.length + 1
    }

    const isAlreadyAdded = persons.some(person => person.name.toLowerCase() === name.toLowerCase())
    
    if (isAlreadyAdded) {
      alert(`${name} is already added to phonebook`)
    } else {
      setPersons([...persons, personObject])
      setName('')
      setNumber('')
    }
  }

  const formatPhoneNumber = (input) => {
    return input.replace(/[^0-9+()\s-]/g, "");
  }

  const namesToShow = persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
      <div>
        <h2>Phonebook</h2>
        <Filter value={searchTerm} onChange={setSearchTerm} />
        <h3>Add a new person</h3>
        <PersonForm 
          onSubmit={addPerson} 
          name={name}
          number={number} 
          onNumberChange={setNumber}
          formatPhoneNumber={formatPhoneNumber}
           />
        <h3>Numbers</h3>
        <Persons namesToShow={namesToShow} />
      </div>
  );
}

export default App
