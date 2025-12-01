require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const app = express()

app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  }
  return '';
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/info', (request, response) => {
  const now = new Date()

  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${now.toString()}</p>
  `)
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.put('/api/persons/:id', (request, response) => {

})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(person => {
      response.status(204).end()
    })
    .catch(error => {
      console.log(error)
      response.status(500).end()
    })
})

app.post('/api/persons', (request, response) => {
  const { name, number } = request.body
  const errors =[]

  if (!name) {
    errors.push('name missing')
  } 
  // else if (persons.some(p => p.name.toLowerCase() === name.toLowerCase())) {
  //   errors.push('name already exists, it must be unique')
  // }
  
  if (!number) {
    errors.push('number is missing')
  }

  if (errors.length > 0) {
    return response.status(400).json({
      errors
    })
  }

  const person = new Person({
    name, 
    number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})