const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://happyCloud:${password}@cluster0.6egi0ao.mongodb.net/phonebook?appName=Cluster0`
mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name,
  number
})

const promise = name && number
  ? person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
  })
  : Person.find({}).then(result => {
    if (result.length > 0) result.forEach(p => console.log(`${p.name} ${p.number}`))
    else (console.log('no entries currently in the phonebook'))
  })

promise.finally(() => mongoose.connection.close())
