require('dotenv').config()
const Contact = require('./models/contact')
const express = require('express')
const cors = require('cors')
const app = express()
const morgan = require('morgan')
const PORT = process.env.PORT

function unknownEndpoint(req, res, next) {
  res.status(404).json({ error: 'unknown endpoint' }).end()
  next()
}
function errorHandler(error, req, res, next) {
  if (error.name === 'CastError') {
    res.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    res.status(400).json({ error: error.message })
  }
  next(error)
}

morgan.token('body', req => {
  JSON.stringify(req.body)
})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms | reqBody :body'))

// info
app.get('/info', (req, res) => {
  let date = new Date().toString()
  Contact.countDocuments({})
    .then(result => {
      res.send(`
            <p>There are ${result} contacts in the phonebook.</p>
            <p>${date}</p>
            `).end()
    })
    .catch(error => console.log(error.message))
})

// all contacts
app.get('/api/contacts', (req, res) => {
  Contact.find({})
    .then(contacts => res.json(contacts))
    .catch(error => console.log('error could not fetch notes from db: ', error.message))
})

// single contact
app.get('/api/contacts/:id', (req, res, next) => {
  Contact.findById(req.params.id)
    .then(contact => {
      if (contact) {
        res.json(contact)
      } else {
        res.status(404).json({ error: 'invalid resource id' }).end()
      }
    })
    .catch(error => next(error))
})

// delete a contact
app.delete('/api/contacts/:id', (req, res, next) => {
  Contact.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch(error => next(error))
})


// create a contact
app.post('/api/contacts', (req, res, next) => {
  const body = req.body
  if (!body.name || !body.number) {
    res.status(400).json({ error: 'invalid resource format' })
  }
  const contact = new Contact({
    name: body.name,
    number: body.number,
    date: new Date()
  })
  contact.save()
    .then(savedContact => {
      res.json(savedContact)
    })
    .catch(error => next(error))
})

app.put('/api/contacts/:id', (req, res, next) => {
  const body = req.body
  if (!body.number || !body.name) {
    res.status(400).json({ error: 'name/number cannot be blank' }).end()
  }
  let contact = {
    name: body.name,
    number: body.number
  }
  Contact.findByIdAndUpdate(req.params.id, contact, { new: true, runValidators: true })
    .then(updatedContact => {
      res.json(updatedContact)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})