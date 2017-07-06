const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const notes = []
let indexId = 0

app.use(bodyParser.json())

app.get('/notes', (req, res) => {
  res.json(notes)
})

app.post('/notes', (req, res) => {
  const createNote = req.body
  createNote.id = indexId + 1
  notes.push(req.body)
  res.sendStatus(201)
  indexId++
})

app.put('/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id, 10)
  const note = notes.find(note => {
    return note.id === noteId
  })
  if (!note) {
    return res.sendStatus(404)
  }
  Object.assign(note, req.body)
  res.sendStatus(200)
})

app.delete('/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id, 10)
  const note = notes.find(note => {
    return note.id === noteId
  })
  if (!note) {
    return res.sendStatus(404)
  }
  notes.splice(itemIndex, 1)
  res.sendStatus(204)
})

app.listen(3000, () => {
  console.log('Listening on 3000')
})
