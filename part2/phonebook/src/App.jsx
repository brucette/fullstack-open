import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

function hideNotification(setter, time) {
  setTimeout(() => setter(null), time);
}

function App() {
  const [persons, setPersons] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    personService.getAll().then((allPersons) => {
      setPersons(allPersons);
    });
  }, []);

  const addPerson = (e) => {
    e.preventDefault();

    const personObject = {
      name,
      number,
    };

    const existing = persons.find(
      (person) => person.name.toLowerCase() === name.toLowerCase()
    );

    if (existing && existing.number === number) {
      alert(`${name} is already added to phonebook`);
      return;
    }

    if (existing) {
      if (
        window.confirm(
          `${name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(existing.id, personObject)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === existing.id ? updatedPerson : person
              )
            );
            setName("");
            setNumber("");
            setSuccessMessage(`${updatedPerson.name} updated in phonebook`);
            hideNotification(setSuccessMessage, 3000);
          })
          .catch((error) => {
            setErrorMessage(`something went wrong updating ${name}`);
            hideNotification(setErrorMessage, 3000);
            console.error(error);
          });
      }
      return;
    }

    personService
      .create(personObject)
      .then((createdPerson) => {
        setPersons([...persons, createdPerson]);
        setName("");
        setNumber("");
        setSuccessMessage(`${createdPerson.name} added to phonebook`);
        hideNotification(setSuccessMessage, 3000);
      })
      .catch((error) => {
        setErrorMessage(`something went wrong adding person to phonebook`);
        hideNotification(setErrorMessage, 3000);
        console.error(error);
      });
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setSuccessMessage(`${name} deleted from phonebook`);
          hideNotification(setSuccessMessage, 3000);
        })
        .catch((error) => {
          setErrorMessage(`${name} has already been removed from the system`);
          hideNotification(setErrorMessage, 3000);
          console.error(error);
        });
    }
  };

  const formatPhoneNumber = (input) => {
    return input.replace(/[^0-9+()\s-]/g, "");
  };

  const namesToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      {errorMessage && <Notification message={errorMessage} type="error" />}
      {successMessage && <Notification message={successMessage} type="success" />}
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
      <Persons namesToShow={namesToShow} handleDelete={deletePerson} />
    </div>
  );
}

export default App;
