const Persons = ({ namesToShow, handleDelete }) => {
  return (
    <div>
      {namesToShow.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
          <button style={{ marginLeft: "8px" }} onClick={() => handleDelete(person.id, person.name)}>
            delete
          </button>
        </p>
      ))}
    </div>
  )
}

export default Persons
