import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

function App() {
  const [persons, setPersons] = useState([])
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])
  
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
          onNameChange={setName}
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
