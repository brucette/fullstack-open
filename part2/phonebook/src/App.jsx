import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

function App() {
  const [persons, setPersons] = useState([])
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    personService.getAll()
    .then(allPersons => {
      setPersons(allPersons)
    })
  }, [])
  
  const addPerson = (e) => {
    e.preventDefault()

    const personObject = {
      name,
      number
    }

    const existing = persons.find(person => 
      person.name.toLowerCase() === name.toLowerCase()
    )

    if (existing && existing.number === number) {
      alert(`${name} is already added to phonebook`)
      return
    }

    if (existing) {
      if (window.confirm(`${name} is already added to phonebook, replace the old number with a new one?`)) {
        personService.update(existing.id, personObject)
        .then(updatedPerson => {
          setPersons(persons.map(person => 
            person.id === existing.id ? updatedPerson : person
          ))
          setName('')
          setNumber('')
        })
      }
      return
    } 

    personService.create(personObject)
    .then(createdPerson => {
      setPersons([...persons, createdPerson])
      setName('')
      setNumber('')
    })
    .catch(error => {
      alert('something went wrong adding person')
      console.error(error)
    })
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id)
      .then(
        setPersons(persons.filter(person => person.id !== id))
      )
      .catch(error => {
        alert('something went wrong removing person')
        console.error(error)
      })
    }
  }

  const formatPhoneNumber = (input) => {
    return input.replace(/[^0-9+()\s-]/g, "")
  }

  const namesToShow = persons.filter(
    person => person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
        formatPhoneNumber={formatPhoneNumber} />
      <h3>Numbers</h3>
      <Persons namesToShow={namesToShow} handleDelete={deletePerson} />
    </div>
  )
}

export default App
